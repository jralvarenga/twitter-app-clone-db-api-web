import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Controlls all api endpoints
  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log('API endpoints');
  }
}