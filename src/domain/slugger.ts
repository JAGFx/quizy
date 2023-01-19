/**
 * Transform a string to another sting safe. (Without special characters or space)
 * @param input
 */
export const slugify = (input: string): string =>
  input
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/&/, 'and')
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '_');
