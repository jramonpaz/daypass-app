import { StyleSheet, View } from "react-native";
import React from "react";

import TextComponent from "@app/components/atoms/text/TextComponent";

import { normalizePixelSize } from "@app/utils/normalize";
//import { formatToCurrency } from "@app/utils/number.util";

import { colors } from "@app/theme";
import { generatePriceFormatted } from "@app/utils/currency.util";
//import { useAppSelector } from "@app/hooks/redux.hook";

type Props = {
	title: string;
	fee: string;
	currency: string;
	alertLabel?: string;
	alertType?: "yellow" | "blue";
	showRightBorder?: boolean;
};

const DaypassContractableProduct = (props: Props) => {
	//const { currencySelected } = useAppSelector(state => state.general);

	return (
		<View style={[styles.container, props.showRightBorder && styles.borderRight]}>
			<TextComponent size="12" textAlign="center">
				{props.title}
			</TextComponent>
			<TextComponent size="16" weight="bold" textAlign="center">
				{/* {`${currencySelected.symbol}${formatToCurrency(+props.fee)} ${props.currency}`} */}
				{`${generatePriceFormatted(+props.fee, props.currency)}`}
			</TextComponent>

			<View
				style={[
					props.alertType === "blue" && styles.alertContainer_blue,
					props.alertType === "yellow" && styles.alertContainer_yellow,
				]}>
				{props.alertLabel && (
					<TextComponent
						size="12"
						color={props.alertType === "blue" ? "primary" : "yellow"}>
						{props.alertLabel}
					</TextComponent>
				)}
			</View>
		</View>
	);
};

export default DaypassContractableProduct;

const styles = StyleSheet.create({
	container: {
		gap: normalizePixelSize(2, "height"),
		height: normalizePixelSize(61, "height"),
		paddingHorizontal: normalizePixelSize(12, "width"),
		alignItems: "center",
		justifyContent: "center",
		// paddingVertical: normalizePixelSize(16, 'width'),
	},
	borderRight: {
		borderRightWidth: 1,
		borderColor: colors.lowlight,
	},
	alertContainer_yellow: {
		backgroundColor: colors.white,
		borderRadius: 4,
		paddingHorizontal: 6,
		// paddingVertical: 4,
		height: normalizePixelSize(20, "height"),
		alignItems: "center",
		justifyContent: "center",
	},
	alertContainer_blue: {
		backgroundColor: colors.blueSecondary,
		borderRadius: 4,
		paddingHorizontal: 4,
		// paddingVertical: 6,
		height: normalizePixelSize(20, "height"),
		alignItems: "center",
		justifyContent: "center",
	},
});
