import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { hotelActions } from "@app/store/slices/hotels";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import BaseModalFullFill, {
	BaseModalFullFillProps,
} from "@app/components/molecules/modals/BaseModalFullFill";
import TextComponent from "@app/components/atoms/text/TextComponent";
import SectionItems from "@app/components/molecules/SectionItems";
import PeopleFeeCounter from "./PeopleFeeCounter";
import LabelWithIcon from "@app/components/molecules/LabelWithIcon";
import BottomContainer from "@app/components/atoms/containers/BottomContainer";
import ButtonComponent from "@app/components/molecules/buttons/ButtonComponent";

import { x_close_icon } from "@app/utils/images";
import { normalizePixelSize } from "@app/utils/normalize";
import { formatDate, parseDateStringToDate } from "@app/utils/dates.util";
import { servicesIconsIndex } from "@app/utils/icons.util";

import { formatToCurrency } from "@app/utils/number.util";
import { colors } from "@app/theme";
import { IPurchaseTicketDetail } from "@app/types";
import { generatePriceFormatted } from "@app/utils/currency.util";
import { addDays } from "date-fns";

type PeopleFeeCounterType = {
	fee: number;
	initialCount: number;
};

type DaypassDetailModalProps = BaseModalFullFillProps & {
	onSubmit?: () => void;
	younger?: PeopleFeeCounterType;
	older?: PeopleFeeCounterType;
	ticketLeft?: number;
	onChangeYounger?: (younger: PeopleFeeCounterType) => void;
	onChangeOlder?: (older: PeopleFeeCounterType) => void;
};

const DaypassDetailModal = (props: DaypassDetailModalProps) => {
	const { t } = useTranslation();
	const [adultsCount, setAdultsCount] = useState(0);
	const [childrenCount, setChildrenCount] = useState(0);

	const dispatch = useAppDispatch();
	const { hotelVenueSelectedTicket } = useAppSelector(state => state.hotels);
	const { searchFilterData } = useAppSelector(state => state.search);

	const hasNoLeft = useMemo(() => {
		if (!hotelVenueSelectedTicket) {
			return false;
		}
		const maxLeft = hotelVenueSelectedTicket.ticket_left;
		return adultsCount + childrenCount >= maxLeft;
	}, [adultsCount, childrenCount, hotelVenueSelectedTicket]);

	if (!hotelVenueSelectedTicket) {
		return (
			<BaseModalFullFill {...props}>
				<View style={styles.header}>
					<Pressable onPress={() => props.setIsVisible(false)}>
						<Image source={x_close_icon} style={styles.closeIcon} />
					</Pressable>
				</View>

				<View style={styles.titleContainer}>
					<TextComponent size="18" weight="bold" color="dark" textAlign="center">
						{t("no_ticket_data")}
					</TextComponent>
				</View>
			</BaseModalFullFill>
		);
	}

	function handleChangeAdults(count: number) {
		setAdultsCount(count);
	}

	function handleChangeChildren(count: number) {
		setChildrenCount(count);
	}

	function calculateTotalAmount() {
		const adults = (hotelVenueSelectedTicket?.adult_fare ?? 0) * adultsCount;
		const children = (hotelVenueSelectedTicket?.child_fare ?? 0) * childrenCount;
		const total = adults + children;

		return total;
	}

	function handleSubmint() {
		if (hotelVenueSelectedTicket) {
			const purchase: IPurchaseTicketDetail = {
				id_venue_ticket: hotelVenueSelectedTicket.id_venue_ticket,
				id_slot: hotelVenueSelectedTicket.id_slot,
				adult_number: adultsCount,
				adult_unity_price: hotelVenueSelectedTicket.adult_fare ?? 0,
				child_number: childrenCount,
				child_unity_price: hotelVenueSelectedTicket.child_fare ?? 0,
				ticketName: hotelVenueSelectedTicket.name,
				fare: calculateTotalAmount(),
				isChild: false,
			};
			dispatch(hotelActions.addPurchaseTickets(purchase));
			props.setIsVisible(false);
		}
	}

	const bullets = hotelVenueSelectedTicket.bullet.split("#");

	return (
		<BaseModalFullFill {...props}>
			<View style={styles.header}>
				<Pressable onPress={() => props.setIsVisible(false)}>
					<Image source={x_close_icon} style={styles.closeIcon} />
				</Pressable>
				<View style={styles.titleContainer}>
					<TextComponent size="18" weight="bold" color="dark" textAlign="center">
						{t("day_pass")}
					</TextComponent>
					{searchFilterData?.date_search && (
						<TextComponent
							size="14"
							weight="semibold"
							color="muted"
							textAlign="center">
							{formatDate(
								addDays(parseDateStringToDate(searchFilterData.date_search), 1),
								"D MMM YYYY",
							)}
						</TextComponent>
					)}
				</View>
				<View />
			</View>

			<ScrollView style={styles.scrollMain} contentContainerStyle={styles.scrollContent}>
				<SectionItems title={t("who_is_coming")} style={styles.section}>
					<PeopleFeeCounter
						title={t("adults")}
						detail={t("adults_detail")}
						fee={hotelVenueSelectedTicket.adult_fare}
						initialCount={adultsCount}
						disabledAdd={hasNoLeft}
						onChangeCount={handleChangeAdults}
					/>

					<PeopleFeeCounter
						title={t("children")}
						detail={t("children_detail")}
						fee={hotelVenueSelectedTicket.child_fare}
						initialCount={childrenCount}
						disabledAdd={hasNoLeft}
						disabled={!hotelVenueSelectedTicket.child_allow}
						onChangeCount={handleChangeChildren}
					/>
				</SectionItems>

				<SectionItems title={t("features_and_amenities")}>
					{hotelVenueSelectedTicket.ticket_general_services.map((ticket, index) => {
						const ServiceIcon =
							servicesIconsIndex[ticket.id_genserv] ?? servicesIconsIndex["1"];
						return (
							<LabelWithIcon
								key={`${index}/${ticket.id_genserv}`}
								label={ticket.name}
								iconComponent={<ServiceIcon />}
							/>
						);
					})}
				</SectionItems>

				<SectionItems title={t("entry_details")}>
					{bullets.map((item, idx) => (
						<LabelWithIcon
							key={`${idx}/${item}`}
							iconComponent={<TextComponent>•</TextComponent>}
							label={item}
						/>
					))}
				</SectionItems>

				{hotelVenueSelectedTicket.obs && (
					<TextComponent size="14" color="dark" font="italic">
						{hotelVenueSelectedTicket.obs}
					</TextComponent>
				)}
			</ScrollView>

			<BottomContainer showMargin style={styles.bottomContainer}>
				<View>
					<TextComponent color="primary" size="16" weight="bold">
						{/* {`${searchFilterData?.currency ?? "USD"} $${formatToCurrency(
							calculateTotalAmount(),
						)}`}						 */}
						{`${generatePriceFormatted(calculateTotalAmount(), searchFilterData?.currency ?? "USD")}`}
					</TextComponent>
				</View>
				<ButtonComponent
					title={t("add")}
					style={styles.checkoutButton}
					onPress={handleSubmint}
					disabled={calculateTotalAmount() < 1}
				/>
			</BottomContainer>
		</BaseModalFullFill>
	);
};

export default DaypassDetailModal;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 14,
		gap: 10,
		width: "100%",
	},
	closeIcon: {
		width: 20,
		height: 20,
		tintColor: colors.dark,
	},
	titleContainer: {
		justifyContent: "center",
		left: -normalizePixelSize(10),
	},
	scrollMain: {
		flex: 1,
	},
	scrollContent: {
		// flex: 1,
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingVertical: normalizePixelSize(40, "width"),
		gap: normalizePixelSize(40, "height"),
		// backgroundColor: 'red',
	},
	section: {
		gap: normalizePixelSize(8, "height"),
	},
	checkoutButton: {
		flex: 1,
	},
	bottomContainer: {
		paddingBottom: normalizePixelSize(12, "height"),
		// backgroundColor: 'red',
	},
});
