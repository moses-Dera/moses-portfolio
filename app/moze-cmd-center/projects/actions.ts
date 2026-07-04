'use server';

import { writeFile } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImage(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const file = formData.get('file') as File;
  if (!file) return { error: "No file provided" };
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  // If R2 environment variables are configured, upload to Cloudflare R2
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

      // @ts-ignore - Bypass IDE type caching issue where .send is sometimes not recognized on S3Client
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      }));

      // You can define R2_PUBLIC_URL in .env if you connected a custom domain
      // e.g. R2_PUBLIC_URL="https://cdn.myportfolio.com"
      const publicDomain = process.env.R2_PUBLIC_URL || `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com`;
      return { url: `${publicDomain}/${filename}` };
    } catch (error: unknown) {
      console.error("R2 Upload Error:", error);
      return { error: "Failed to upload to Cloudflare R2: " + (error as Error).message };
    }
  } 
  // Fallback to local upload for development if R2 isn't configured
  else {
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);
    return { url: `/uploads/${filename}` };
  }
}

export async function saveProject(data: {
  id?: string;
  title: string;
  description: string;
  coverImage?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  techStack: string;
  content: string;
}) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    if (data.id) {
      await prisma.project.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          coverImage: data.coverImage,
          repoUrl: data.repoUrl,
          liveUrl: data.liveUrl,
          techStack: data.techStack,
          content: data.content,
        }
      });
    } else {
      await prisma.project.create({
        data: {
          title: data.title,
          description: data.description,
          coverImage: data.coverImage,
          repoUrl: data.repoUrl,
          liveUrl: data.liveUrl,
          techStack: data.techStack,
          content: data.content,
        }
      });
    }
    
    revalidatePath('/project');
    revalidatePath('/moze-cmd-center/projects');
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}

export async function deleteProject(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/project');
    revalidatePath('/moze-cmd-center/projects');
    return { success: true };
  } catch (error: unknown) {
    return { error: (error as Error).message };
  }
}
