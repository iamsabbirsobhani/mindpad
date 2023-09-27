// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
export default function supabaseLoader({ src, width, quality }: any) {
  return `${src}?width=${width}&quality=${quality || 75}`;
}
