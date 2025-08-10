import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";

import AmountBtnsComponent from "@app/components/organisms/selects/AmountBtnsComponent";
import TextComponent from "@app/components/atoms/text/TextComponent";

import { formatToCurrency } from "@app/utils/number.util";
import { normalizePixelSize } from "@app/utils/normalize";

import { colors } from "@app/theme";
import { useAppSelector } from "@app/hooks/redux.hook";
import { generatePriceFormatted } from "@app/utils/currency.util";

type Props = {
	title: string;
	detail: string;
	fee: number;
	initialCount: number;
	onChangeCount?: (count: number) => void;
	disabled?: boolean;
	disabledAdd?: boolean;
};

const PeopleFeeCounter = (props: Props) => {
	const [count, setCount] = useState(props.initialCount || 0);
	const { currencySelected } = useAppSelector(state => state.general);

	function getTotalFee() {
		if (count === 0) {
			return props.fee;
		}
		return props.fee * count;
	}

	function handleCountChange(newCount: number) {
		setCount(newCount);
		props.onChangeCount && props.onChangeCount(newCount);
	}

	const totalFee = useMemo(() => {
		const decimals = +getTotalFee().toFixed(2);
		return formatToCurrency(decimals);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<TextComponent size="16" color={props.disabled ? "muted" : "dark"}>
					{props.title}
				</TextComponent>
				<TextComponent size="12" color="muted">
					{props.detail}
				</TextComponent>
			</View>

			<View style={styles.leftContent}>
				<TextComponent size="16" color={props.disabled ? "muted" : "dark"}>
					{/* {`${currencySelected.symbol}${totalFee}`} */}
					{`${generatePriceFormatted(+totalFee, currencySelected.iso)}`}
				</TextComponent>
				<AmountBtnsComponent
					value={props.initialCount || 0}
					onChange={handleCountChange}
					disableSubtract={count < 1 || props.disabled}
					disableAdd={props.disabled || props.disabledAdd}
				/>
			</View>
		</View>
	);
};

export default PeopleFeeCounter;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: normalizePixelSize(24, "width"),
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.lowlight,
		height: normalizePixelSize(70, "height"),
	},
	textContainer: {
		gap: normalizePixelSize(4, "height"),
	},
	leftContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: normalizePixelSize(24, "width"),
		alignItems: "center",
	},
});
