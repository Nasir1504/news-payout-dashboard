import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = process.env.NEXT_PUBLIC_NEWS_API_URL;

  try {
    const apiUrl = `${url}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey || '',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
} 