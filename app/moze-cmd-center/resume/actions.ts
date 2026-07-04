'use server';

import { writeFile } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadResume(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const file = formData.get('file') as File;
  const title = formData.get('title') as string || 'Resume';

  if (!file) return { error: "No file provided" };
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = `resume-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  let finalUrl = '';

  if (
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  ) {
    try {
      const s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });

      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type || 'application/pdf',
      }));

      const publicDomain = process.env.R2_PUBLIC_URL || `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com`;
      finalUrl = `${publicDomain}/${filename}`;
    } catch (error: unknown) {
      console.error("R2 Upload Error:", error);
      return { error: "Failed to upload to Cloudflare R2: " + (error as Error).message };
    }
  } else {
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);
    finalUrl = `/uploads/${filename}`;
  }

  try {
    // If this is the first resume, make it active
    const existingCount = await prisma.resume.count();
    const isActive = existingCount === 0;

    await prisma.resume.create({
      data: {
        title,
        url: finalUrl,
        isActive
      }
    });
    
    revalidatePath('/');
    revalidatePath('/moze-cmd-center/resume');
    return { success: true, url: finalUrl };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function setActiveResume(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    // Deactivate all
    await prisma.resume.updateMany({
      data: { isActive: false }
    });

    // Activate selected
    await prisma.resume.update({
      where: { id },
      data: { isActive: true }
    });

    revalidatePath('/');
    revalidatePath('/moze-cmd-center/resume');
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function deleteResume(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.resume.delete({
      where: { id }
    });
    
    revalidatePath('/');
    revalidatePath('/moze-cmd-center/resume');
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}
