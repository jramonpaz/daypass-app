import moment from "moment";

export type DateFormat = "D MMM" | "YYYYMMDD" | "D MMM YYYY";

/**
 * The `formatDate` function in TypeScript takes a date object and a format string as input, and
 * returns the date formatted according to the specified format.
 * @param {Date} date - The `date` parameter is a `Date` object representing a specific date and time.
 * It is the input parameter for the `formatDate` function, which is used to format this date according
 * to a specified format.
 * @param {DateFormat} [format=D MMM] - The `format` parameter in the `formatDate` function is a string
 * that specifies the desired date format for the output. It can take one of the following values: 'D
 * MMM', 'YYYYMMDD', or 'D MMM YYYY'. These values represent different date formats that can be applied
 * to
 * @returns The `formatDate` function is returning a formatted date string based on the input `date`
 * and `format` provided. The date is being formatted using the `moment` library according to the
 * specified `format` (which defaults to 'D MMM' if not provided).
 */
export const formatDate = (date: Date, format: DateFormat = "D MMM"): string => {
	return moment.utc(new Date(date)).format(format);
};

/**
 * Converts a date string in YYYYMMDD format to a JavaScript Date object.
 * @param dateString - The date string in YYYYMMDD format.
 * @returns A JavaScript Date object.
 */
export const parseDateStringToDate = (dateString: string): Date => {
	if (!/^\d{8}$/.test(dateString)) {
		throw new Error("Invalid date format. Expected YYYYMMDD.");
	}

	const date = moment(dateString, "YYYYMMDD").toDate();

	if (isNaN(date.getTime())) {
		throw new Error("Invalid date.");
	}

	return date;
};

/**
 * Calculates a future date by adding a specific number of days or months to the current date.
 *
 * @param amount - The number of days or months to add.
 * @param unit - The time unit to add: 'days' or 'months'.
 * @returns A `Moment` instance representing the calculated future date.
 *
 * @throws Will throw an error if `amount` is not a positive number or if `unit` is invalid.
 *
 * @example
 * // Calculate one month after the current date
 * const nextMonth = calculateFutureDate(1, 'months');
 * console.log(nextMonth.format('YYYY-MM-DD'));
 *
 * @example
 * // Calculate 10 days after the current date
 * const nextDays = calculateFutureDate(10, 'days');
 * console.log(nextDays.format('YYYY-MM-DD'));
 */
export function calculateFutureDate(amount: number, unit: "days" | "months"): Date {
	if (amount <= 0) {
		throw new Error('The "amount" must be a positive number.');
	}

	if (unit !== "days" && unit !== "months") {
		throw new Error('The unit must be either "days" or "months".');
	}

	const futureDate = moment().add(amount, unit);

	return futureDate.toDate();
}

/**
 * Calculates a past date by subtracting a specific number of days or months from the current date.
 *
 * @param amount - The number of days or months to subtract.
 * @param unit - The time unit to subtract: 'days' or 'months'.
 * @returns A `Date` instance representing the calculated past date.
 *
 * @throws Will throw an error if `amount` is not a positive number or if `unit` is invalid.
 *
 * @example
 * // Calculate one month before the current date
 * const previousMonth = calculatePastDate(1, 'months');
 * console.log(previousMonth.toISOString());
 *
 * @example
 * // Calculate 10 days before the current date
 * const previousDays = calculatePastDate(10, 'days');
 * console.log(previousDays.toISOString());
 */
export function calculatePastDate(amount: number, unit: "days" | "months"): Date {
	if (amount <= 0) {
		throw new Error('The "amount" must be a positive number.');
	}

	if (unit !== "days" && unit !== "months") {
		throw new Error('The unit must be either "days" or "months".');
	}

	const pastDate = moment().subtract(amount, unit);

	return pastDate.toDate();
}
