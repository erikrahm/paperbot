const vowels = "aeiou";
const consonents = "bcdfghjklmnpqrstvwxys";
let vowelRegex = new RegExp(`[${vowels}]`, "gi");
let consonetRegex = new RegExp(`(?![${vowels}])[a-z]`, "gi");
let sylableRegex = new RegExp(`[${vowels}][${consonents}]`, "gi");
let subtractionRegex = new RegExp(`[${consonents}]e`, "gi");
let additionalSubtractionRegex = new RegExp(
  `[${vowels}][${consonents}]e`,
  "gi"
);

export const parseWord = (word: string) => {
  let syllables = [...word.matchAll(sylableRegex)].length;
  const lastLetter: string = word[word.length - 1];
  const additionalSyllable = lastLetter.match(vowelRegex);
  const addAdditional =
    (!!additionalSyllable?.length && lastLetter !== "e") ||
    word.endsWith("ee") ||
    word.endsWith("ses") ||
    word.endsWith("y") ||
    (word.endsWith("le") &&
      word.length > 3 &&
      [...(word[word.length - 3].match(consonetRegex) || [])].length);
  const subtractions = [...word.matchAll(additionalSubtractionRegex)];
  const subtractSyllable =
    subtractions.length &&
    !(
      subtractions.length === 1 &&
      [
        ...(`${word[word.length - 2]}${
          word[word.length - 2]
        }${lastLetter}`.match(subtractionRegex) || []),
      ].length
    );
  if (subtractSyllable) {
    syllables--;
  }
  if (addAdditional) syllables++;

  return syllables;
};

export const parseHaiku = (haiku: string) => {
  let syllables = 0;
  haiku.split(" ").forEach((word: string) => {
    if (!word.length) return;
    const result = parseWord(word);
    if (word.length && result === 0) {
      syllables++;
      return;
    }
    syllables = syllables + result;
  });
  return syllables;
};
