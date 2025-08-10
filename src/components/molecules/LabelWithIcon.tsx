import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";

import TextComponent from "@app/components/atoms/text/TextComponent";

import { normalizePixelSize } from "@app/utils/normalize";
import { colors } from "@app/theme";

type Props = {
	label: string;
	iconSource?: ImageSourcePropType;
	iconComponent?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	theme?: "dark" | "muted";
	size?: "normal" | "small";
};

const LabelWithIcon = (props: Props) => {
	return (
		<View
			style={[
				styles.container,
				props.size === "small" && styles.containerSmall,
				props.style,
			]}>
			{props.iconSource && (
				<Image
					source={props.iconSource}
					style={[
						styles.icon,
						props.size === "small" && styles.iconSmall,
						props.theme === "muted" && styles.iconMuted,
					]}
				/>
			)}

			{props.iconComponent && props.iconComponent}

			<TextComponent
				lineBreakMode="middle"
				size={props.size === "small" ? "12" : "14"}
				color={props.theme === "muted" ? "muted" : "dark"}>
				{props.label}
			</TextComponent>
		</View>
	);
};

export default LabelWithIcon;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 12,
	},
	containerSmall: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 4,
	},
	icon: {
		width: normalizePixelSize(24, "height"),
		height: normalizePixelSize(24, "height"),
		resizeMode: "contain",
	},
	iconSmall: {
		width: normalizePixelSize(12, "height"),
		height: normalizePixelSize(12, "height"),
		resizeMode: "contain",
	},
	iconMuted: {
		tintColor: colors.muted,
	},
});
