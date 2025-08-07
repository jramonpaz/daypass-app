import { StringServiceVibesApiDataType, StringTicketAPIData } from '@app/types/explore/hotel.type';

/**
 * The function `parseFcknJvsServicesOrVibesAPIData` takes a string of data separated by '#' and parses
 * it into an array of objects with id, es, and en properties.
 * @param {string} data - The `parseFcknJvsServicesOrVibesAPIData` function takes a string of data as
 * input and parses it into an array of objects with `id`, `es`, and `en` properties. The input data
 * should be formatted with each entry separated by `#` and
 * @returns The function `parseFcknJvsServicesOrVibesAPIData` is returning an array of objects of type
 * `StringServiceVibesApiDataType`, where each object has properties `id`, `es`, and `en`.
 */
export const parseFcknJvsServicesOrVibesAPIData = (data: string): StringServiceVibesApiDataType[] => {
  const dataRaw = data.split('#');

  const dataParset = dataRaw.map(raw => {
    const [id, es, en] = raw.split('|');
    return {id, es, en};
  });

  return dataParset;
};

/**
 * The function `parseFcknJvsSearchGeneralTickesAPIData` parses a string of ticket data separated by
 * '#' and '|' delimiters into an array of objects with specific properties.
 * @param {string} data - The `parseFcknJvsSearchGeneralTickesAPIData` function takes a string of data
 * as input and parses it into an array of objects representing ticket data. The input data is expected
 * to be formatted with each ticket entry separated by a `#` symbol, and each ticket's properties
 * @returns The function `parseFcknJvsSearchGeneralTickesAPIData` is returning an array of objects with
 * properties `name`, `pvp`, `isIncluded`, and `remainingTickets`. Each object represents a ticket with
 * its corresponding data parsed from the input string.
 */
export const parseFcknJvsSearchGeneralTickesAPIData = (data: string): StringTicketAPIData[] => {
  const dataRaw = data.split('#');

  const dataParset = dataRaw.map(raw => {
    const [name, pvp, isIncluded, remainingTickets] = raw.split('|');
    return {
      name,
      pvp,
      isIncluded: Boolean(+isIncluded),
      remainingTickets: +remainingTickets,
    };
  });

  return dataParset;
};

/**
 * Generate an array of image URLs with consecutive numbers.
 * @param {string} baseUrl - The base URL of the image.
 * @param {number} maxRange - The maximum range for the numbers in the URLs.
 * @returns {string[]} - An array of generated image URLs.
 */
export function generateImageUrls(baseUrl: string, maxRange: number) {
  const urlParts = baseUrl.split('/'); // Split the URL into parts
  const fileName = urlParts.pop(); // Get the filename, e.g., "1.jpeg"

  if (!fileName) {
    return [];
  }
  // Extract the file extension and the numeric part
  const [_number, extension] = fileName.split('.');

  // Generate new URLs
  const urls = [];
  for (let i = 1; i <= maxRange; i++) {
    const newFileName = `${i}.${extension}`; // Construct the new filename
    const newUrl = [...urlParts, newFileName].join('/'); // Reconstruct the full URL
    urls.push(newUrl);
  }

  return urls;
}
