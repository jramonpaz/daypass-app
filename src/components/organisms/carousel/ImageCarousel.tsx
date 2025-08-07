import React, { useRef, useState } from "react";
import {
	View,
	ScrollView,
	Dimensions,
	StyleSheet,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ImageSourcePropType,
	StyleProp,
	ImageStyle,
} from "react-native";

import TextComponent from "@app/components/atoms/text/TextComponent";
import ImageComponent from "@app/components/atoms/icons/ImageComponent";

import { normalizeFontSize, normalizePixelSize } from "@app/utils/normalize";

import { colors } from "@app/theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CarouselProps {
	images: ImageSourcePropType[];
	paginationType?: "dots" | "counter" | "none";
	imageStyle?: StyleProp<ImageStyle>;
}

const ImageCarousel = (props: CarouselProps) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const scrollViewRef = useRef<ScrollView>(null);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / SCREEN_WIDTH);
		setActiveIndex(index);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				scrollEnabled={props.images.length > 1}
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				nestedScrollEnabled={true}>
				{props.images.map((image, index) => (
					<ImageComponent
						key={index}
						source={image}
						style={[styles.image, props.imageStyle]}
					/>
				))}
			</ScrollView>

			{/* Pagination Indicator */}
			{props.paginationType === "dots" && (
				<View style={styles.pagination}>
					{props.images.map((_, index) => (
						<TextComponent
							key={index}
							style={[
								styles.paginationDot,
								index === activeIndex ? styles.activeDot : undefined,
							]}>
							●
						</TextComponent>
					))}
				</View>
			)}

			{/* Pagination Counter */}
			{props.paginationType === "counter" && (
				<View style={styles.paginationContainer}>
					<TextComponent size="12" color="white" weight="bold">
						{`${activeIndex + 1} / ${props.images.length}`}
					</TextComponent>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		width: SCREEN_WIDTH,
		height: "100%",
		resizeMode: "cover",
	},

	// pagination dots
	pagination: {
		flexDirection: "row",
		position: "absolute",
		bottom: 10,
	},
	paginationDot: {
		fontSize: normalizeFontSize(10),
		color: colors.white_a80,
		margin: 3,
	},
	activeDot: {
		color: colors.white,
	},

	// pagination counter
	paginationContainer: {
		position: "absolute",
		bottom: 15,
		right: 15,
		minHeight: normalizePixelSize(20, "height"),
		minWidth: normalizePixelSize(50, "width"),
		backgroundColor: colors.black_a40,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: normalizePixelSize(4, "height"),
		paddingHorizontal: 10,
	},
});

export default ImageCarousel;
