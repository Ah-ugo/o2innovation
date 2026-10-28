export const API = process.env.NEXT_PUBLIC_API || 'http://localhost:8000';

export async function api(path: string, opts: RequestInit = {}) {
  const t = typeof window !== 'undefined' ? localStorage.getItem('o2t') : null;
  const r = await fetch(API + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
      ...(opts.headers || {}),
    },
  });
  if (r.status === 401) {
    localStorage.removeItem('o2t');
    location.href = '/learn/login';
  }
  if (!r.ok)
    throw new Error(
      (await r.json().catch(() => ({}))).detail ||
        'Something went wrong. Try again.',
    );
  return r.json();
}
export async function upload(file: File): Promise<string> {
  // signed Cloudinary upload (admin only)
  const g = await api('/admin/upload-signature');
  const f = new FormData();
  f.append('file', file);
  f.append('api_key', g.api_key);
  f.append('timestamp', g.timestamp);
  f.append('signature', g.signature);
  const r = await fetch(
    `https://api.cloudinary.com/v1_1/${g.cloud_name}/auto/upload`,
    { method: 'POST', body: f },
  );
  return (await r.json()).secure_url;
}
export function embed(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m
    ? { kind: 'iframe', src: `https://www.youtube.com/embed/${m[1]}` }
    : { kind: 'video', src: url };
}
