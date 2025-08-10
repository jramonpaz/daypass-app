import { ICurrency } from "@app/types";
import { currency_dollar_icon, currency_euro_icon, currency_mexico_icon } from "@app/utils/images";

export const currencies_mock: ICurrency[] = [
	{
		id: "1",
		title: "Dólares estadounidenses", //'app-title-currency-dollar-us',
		subtitle: "US",
		country: "USD",
		iso: "USD",
		symbol: "$",
		icon: currency_dollar_icon,
	},
	{
		id: "2",
		title: "Euros",
		subtitle: "ES",
		country: "ESP",
		iso: "EUR",
		symbol: "€",
		icon: currency_euro_icon,
	},
	{
		id: "3",
		title: "Pesos mexicanos",
		subtitle: "MXN",
		country: "MXN",
		iso: "MXN",
		symbol: "₱",
		icon: currency_mexico_icon,
	},
	{
		id: "4",
		title: "Pesos colombianos",
		subtitle: "COP",
		country: "COP",
		iso: "COP",
		symbol: "₱",
		icon: currency_mexico_icon,
	},
	{
		id: "5",
		title: "Pesos dominicanos",
		subtitle: "DOP",
		country: "DOP",
		iso: "DOP",
		symbol: "₱",
		icon: currency_mexico_icon,
	},
];
