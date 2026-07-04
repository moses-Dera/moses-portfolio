import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch resume');

    const buffer = await response.arrayBuffer();

    const headers = new Headers();
    headers.set('Content-Disposition', 'attachment; filename="Moses_Okonkwo_Resume.pdf"');
    headers.set('Content-Type', 'application/pdf');

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Error downloading file', { status: 500 });
  }
}
