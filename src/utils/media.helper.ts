export function getFileExtension(mimeType: string): string {
  const regex = /\/([a-z0-9]+)/i;
  const match = mimeType.match(regex);

  if (match && match[1]) {
    return match[1].toLowerCase();
  }

  return "";
}
