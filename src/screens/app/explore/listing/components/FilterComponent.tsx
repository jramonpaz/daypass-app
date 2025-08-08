import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";

import TextComponent from "@app/components/atoms/text/TextComponent";

import { options_icon } from "@app/utils/images";
import { normalizePixelSize } from "@app/utils/normalize";
import { colors } from "@app/theme";
import { useTranslation } from "react-i18next";

type Props = {
	onPressFilter?: () => void;
	style?: StyleProp<ViewStyle>;
	title: string;
	date: string;
	people: number;
	filtersCount?: number;
};

const FilterComponent = (props: Props) => {
	const { t } = useTranslation();

	const hasFilter = !!(props.filtersCount && props.filtersCount > 0);

	return (
		<View style={[styles.container, props.style]}>
			<View>
				<TextComponent size="14" color="dark" weight="bold">
					{props.title}
				</TextComponent>
				{/* <TextComponent size="12" color="muted">
					{`${props.date} • ${props.people} ${t("people")}`}
				</TextComponent> */}
				<TextComponent size="12" color="muted">
					{`${props.date}`}
				</TextComponent>
			</View>
			<Pressable
				style={[styles.iconContainer, hasFilter && styles.iconContainerWithFilter]}
				onPress={props.onPressFilter}>
				{hasFilter && (
					<View style={styles.filterCountContainer}>
						<TextComponent size="11" color="white" weight="bold">
							{props.filtersCount}
						</TextComponent>
					</View>
				)}
				<Image source={options_icon} style={styles.icon} />
			</Pressable>
		</View>
	);
};

export default FilterComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: normalizePixelSize(16, "width"),
		paddingVertical: normalizePixelSize(8, "height"),
		backgroundColor: colors.light,
		borderWidth: 0.5,
		borderColor: colors.medium,
		borderRadius: 40,
	},
	iconContainer: {
		width: normalizePixelSize(32, "height"),
		height: normalizePixelSize(32, "height"),
		borderRadius: 16,
		borderColor: colors.lowlight,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		width: normalizePixelSize(16, "height"),
		height: normalizePixelSize(16, "height"),
		tintColor: colors.dark,
		resizeMode: "cover",
	},
	iconContainerWithFilter: {
		borderColor: colors.primary,
		borderWidth: 1,
	},
	filterCountContainer: {
		width: normalizePixelSize(16, "height"),
		height: normalizePixelSize(16, "height"),
		borderRadius: 16,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: -normalizePixelSize(4, "width"),
		top: -normalizePixelSize(4, "height"),
	},
});
