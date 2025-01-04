export function joinPaths(...params: string[]): string {
  // Filter and clean up the path segments
  const cleanedSegments = params.map((segment) =>
    segment.replace(/^\/+|\/+$/g, "")
  );

  // Join the cleaned segments with a single slash between them
  return cleanedSegments.join("/");
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}
