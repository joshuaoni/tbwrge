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

export function excludeKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key as K)) {
      acc[key as keyof Omit<T, K>] = obj[key];
    }
    return acc;
  }, {} as Omit<T, K>);
}

export function includeKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
}
