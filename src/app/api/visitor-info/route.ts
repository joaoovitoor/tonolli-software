import { NextResponse } from 'next/server';

function isPrivateIP(ip: string): boolean {
  return (
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.2') ||
    ip.startsWith('172.30.') ||
    ip.startsWith('172.31.') ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip === '::ffff:127.0.0.1'
  );
}

export async function GET(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;

  if (!ip || isPrivateIP(ip)) {
    return NextResponse.json({
      org: null,
      city: 'São Paulo',
      country: 'Brazil',
      region: 'SP',
      isLocal: true,
    });
  }

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'tonollisoftware/1.0' },
    });
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ org: null, city: null, country: null, region: null });
    }

    return NextResponse.json({
      org: data.org || null,
      city: data.city || null,
      country: data.country_name || null,
      region: data.region || null,
    });
  } catch {
    return NextResponse.json({ org: null, city: null, country: null, region: null });
  }
}
