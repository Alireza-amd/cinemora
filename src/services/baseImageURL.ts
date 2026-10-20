export function getImageURL(path: string | null) {
  return path != null
    ? `https://image.tmdb.org/t/p/original${path}`
    : undefined;
}
