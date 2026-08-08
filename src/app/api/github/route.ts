import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const token = process.env.GITHUB_TOKEN?.trim();

    if (!query) {
      return NextResponse.json({
        error: "A GraphQL query is required",
      }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({
        error: "Missing GITHUB_TOKEN credential",
        message: "Bad credentials",
        status: 401,
      }, { status: 401 });
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "kumar-saurabh-portfolio",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    if (!response.ok || data.errors) {
      return NextResponse.json({
        error: "GitHub GraphQL request failed",
        details: data.errors ?? data.message ?? "Unknown GitHub API error",
      }, { status: response.ok ? 502 : response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GitHub API Proxy Error:", error);
    return NextResponse.json({ error: "Invalid GitHub API request" }, { status: 400 });
  }
}