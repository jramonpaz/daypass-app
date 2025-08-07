/**
 * The function calculates the height based on a given width to maintain a 4:3 aspect ratio.
 * @param {number} width - The `calculateAspectRatio` function takes a `width` parameter of type number
 * as input.
 * @returns The function `calculateAspectRatio` returns an object with two properties: `width` and
 * `height`. The `width` property is the input parameter `width` that was passed to the function, and
 * the `height` property is calculated as `(width * 3) / 4`.
 */
export const calculateAspectRatio = (width: number) => {
  const height = (width * 3) / 4;

  return { width, height };
};
