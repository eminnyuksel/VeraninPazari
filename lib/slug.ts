const turkishMap: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  i: "i",
  ö: "o",
  ş: "s",
  ü: "u",
};

export function slugify(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıiöşü]/g, (character) => turkishMap[character] ?? character)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}
