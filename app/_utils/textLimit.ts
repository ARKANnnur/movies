export default function textLimit(text: string, limit: number = 300): string {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}
