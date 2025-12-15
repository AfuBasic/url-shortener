export const isValidUrl = (input: string): boolean => {
  try {
    const trimmed = input.trim();
    if (/^https?:\.\./i.test(trimmed)) return false;
    const withProtocol = normalizeUrl(input);
    const url = new URL(withProtocol);

    if (url.protocol !== "http:" && url.protocol !== "https:") return false;

    if (!url.hostname || !url.hostname.includes(".")) return false;

    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (input: string): string => {
  const trimmed = input.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
};
