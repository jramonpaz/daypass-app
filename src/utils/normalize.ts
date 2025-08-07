import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH , height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define a base width and height, e.g., iPhone 11
const BASE_WIDTH = 375;  // iPhone 11 width
const BASE_HEIGHT = 812; // iPhone 11 height

/**
 * Normalize font size based on screen width.
 * @param {number} size - Font size designed for the BASE_WIDTH.
 * @returns {number} - Adjusted font size for the current device.
 */
export const normalizeFontSize = (size: number) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Normalize pixel size based on the screen dimensions.
 *
 * @param size - The original pixel size for the base screen.
 * @param axis - The axis to scale by: 'width' or 'height'. Defaults to 'width'.
 * @returns The adjusted pixel size for the current device.
 */
export const normalizePixelSize = (
  size: number,
  axis: 'width' | 'height' = 'width'
): number => {
  const scale = axis === 'width'
    ? SCREEN_WIDTH / BASE_WIDTH
    : SCREEN_HEIGHT / BASE_HEIGHT;

  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

