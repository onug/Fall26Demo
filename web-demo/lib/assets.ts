// Static assets under public/ need the same prefix the portal build uses for
// audio (lib/audio.ts): NEXT_PUBLIC_BASE_PATH is inlined at build time.
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
