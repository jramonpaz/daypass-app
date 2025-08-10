import { formatToCurrency } from "./number.util";

export const generatePriceFormatted = (amount: number = 0, currency: string = "USD") => {
	return `${formatToCurrency(amount)} ${currency}`;
};