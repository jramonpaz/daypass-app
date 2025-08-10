import { Alert, Image, Linking, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";

import { logoutService } from "@app/store/slices/auth/auth.service";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import TextComponent from "@app/components/atoms/text/TextComponent";

import {
	app_com_logo,
	call_outline_icon,
	chevron_right,
	dual_screen_outline_icon,
	heart_outline_icon,
	logout_outline_icon,
	mail_outline_icon,
	profile_outline_icon,
	question_outline_circle,
	search_icon,
	suitcase_outline_icon,
	x_close_icon,
} from "@app/utils/images";
import { APP_MAIL_CONTACT, APP_NUMBER_CONTACT } from "@app/config/constants";
import { normalizePixelSize } from "@app/utils/normalize";
import { colors } from "@app/theme/colors";
import { useTranslation } from "react-i18next";

type Props = DrawerContentComponentProps & {};

const DrawerMenu = (props: Props) => {
	const dispatch = useAppDispatch();
	const { isAuth, userDetail } = useAppSelector(state => state.auth);
	const { languageSelected, currencySelected } = useAppSelector(state => state.general);

	const { t } = useTranslation();

	const isLoggedIn = useMemo(() => isAuth && userDetail, [isAuth, userDetail]);

	function handleLogout() {
		props.navigation.closeDrawer();
		dispatch(logoutService());
	}

	function handleGoToExplorer() {
		props.navigation.navigate("EXPLORE_TAB_STACK");
	}

	function handleGoToBookings() {
		props.navigation.navigate("BOOKINGS_TAB_STACK");
	}

	function handleGoToFavorites() {
		props.navigation.navigate("FAVORITIES_TAB_STACK");
	}

	function handleGoToAccount() {
		props.navigation.navigate("ACCOUNT_TAB_STACK");
	}

	function handleGoToCurrenciesSettings() {
		props.navigation.navigate("CURRENCY_SETTING_SCREEN");
	}

	function handleGoToLanguagesSettings() {
		props.navigation.navigate("LANGUAGES_SETTING_SCREEN");
	}

	function handleOpenEmailContact() {
		const emailUrl = `mailto:${APP_MAIL_CONTACT}`;

		Linking.canOpenURL(emailUrl)
			.then(supported => {
				if (!supported) {
					console.error("El dispositivo no puede manejar el enlace:", emailUrl);
					Alert.alert(
						"Error",
						"No se puede abrir la aplicación de correo en este dispositivo.",
					);
				} else {
					return Linking.openURL(emailUrl);
				}
			})
			.catch(error => {
				console.error(`Error al intentar abrir el enlace: ${emailUrl}`, error);
				Alert.alert(
					"Error",
					"Ocurrió un problema al intentar abrir la aplicación de correo.",
				);
			});
	}

	const openWhatsApp = () => {
		const url = `whatsapp://send?phone=${APP_NUMBER_CONTACT}`;
		Linking.canOpenURL(url)
			.then(supported => {
				if (!supported) {
					Alert.alert("Error", "WhatsApp no está instalado en este dispositivo");
				} else {
					return Linking.openURL(url);
				}
			})
			.catch(err => console.error("Error al abrir WhatsApp: ", err));
	};

	function goToPrivacyPolices() {
		props.navigation.navigate("PRIVACY_POLICY_SCREEN");
	}

	function goToFQAScreen() {
		props.navigation.navigate("FAQS_SCREEN");
	}

	function goToTermsAndConditionsScreen() {
		props.navigation.navigate("TERMS_CONDITIONS_SCREEN");
	}

	return (
		<DrawerContentScrollView
			style={styles.drawerMain}
			contentContainerStyle={styles.scrollContent}>
			<SafeAreaView style={styles.main}>
				<View style={styles.header}>
					<Pressable onPress={() => props.navigation.closeDrawer()}>
						<Image style={styles.headerIcon} source={x_close_icon} />
					</Pressable>
					<Image
						style={styles.headerAppIcon}
						source={app_com_logo}
						resizeMethod="resize"
					/>
					<Image style={styles.headerRightIcon} source={x_close_icon} />
				</View>

				<View style={styles.rowButtonsContainer}>
					<Pressable
						style={styles.buttonContainer}
						onPress={handleGoToLanguagesSettings}>
						<Image style={styles.flagIcon} source={languageSelected.icon} />
						<TextComponent
							size="16"
							color="muted"
							weight="light"
							transform2="uppercase">
							{`${languageSelected.country}`}
						</TextComponent>
						<Image style={styles.rightIcon} source={chevron_right} />
					</Pressable>

					<Pressable
						style={styles.buttonContainer}
						onPress={handleGoToCurrenciesSettings}>
						{/* <Image style={styles.moneyIcon} source={currencySelected.icon} /> */}
						<TextComponent
							size="16"
							color="muted"
							weight="light"
							transform2="uppercase">
							{currencySelected.iso}
						</TextComponent>
						<Image style={styles.rightIcon} source={chevron_right} />
					</Pressable>
				</View>

				<View style={styles.contentList}>
					<Pressable style={styles.manuItem} onPress={handleGoToExplorer}>
						<Image source={search_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-explore")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={handleGoToBookings}>
						<Image source={suitcase_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-bookings")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={handleGoToFavorites}>
						<Image source={heart_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-favorites")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={handleGoToAccount}>
						<Image source={profile_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-profile")}
						</TextComponent>
					</Pressable>
				</View>

				<View style={styles.contentList}>
					<TextComponent size="18" color="primary" weight="bold">
						{t("drawer-contact")}
					</TextComponent>

					<Pressable style={styles.manuItem} onPress={handleOpenEmailContact}>
						<Image source={mail_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-email")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={openWhatsApp}>
						<Image source={call_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-phone")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={goToFQAScreen}>
						<Image source={question_outline_circle} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-faqs")}
						</TextComponent>
					</Pressable>
				</View>

				<View style={styles.contentList}>
					<TextComponent size="18" color="primary" weight="bold">
						{t("drawer-legal")}
					</TextComponent>

					<Pressable style={styles.manuItem} onPress={goToTermsAndConditionsScreen}>
						<Image source={dual_screen_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-terms")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem} onPress={goToPrivacyPolices}>
						<Image source={dual_screen_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-privacy")}
						</TextComponent>
					</Pressable>

					<Pressable style={styles.manuItem}>
						<Image source={dual_screen_outline_icon} style={styles.contentIcon} />
						<TextComponent size="16" color="dark">
							{t("drawer-legal")}
						</TextComponent>
					</Pressable>
				</View>

				{isLoggedIn && (
					<View style={styles.contentList}>
						<Pressable style={styles.manuItem} onPress={handleLogout}>
							<Image source={logout_outline_icon} style={styles.contentIcon} />
							<TextComponent size="16" color="dark">
								{t("drawer-logout")}
							</TextComponent>
						</Pressable>
					</View>
				)}
			</SafeAreaView>
		</DrawerContentScrollView>
	);
};

export default DrawerMenu;

// const ICON_HEIGHT = 24;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? ICON_HEIGHT * 2 : ICON_HEIGHT;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.white,
		// paddingHorizontal: 20,
		// paddingBottom: Platform.OS === 'ios' ? 0 : 10,
		gap: 36,
	},
	drawerMain: {
		flex: 1,
	},
	scrollContent: {
		gap: 36,
		// paddingBottom: 20,
		paddingBottom: 40,
		backgroundColor: colors.white,
	},
	header: {
		paddingTop: 20,
		// top: Platform.OS === 'ios' ? -HEADER_HEIGHT * 2 : 0,
		// height: 10,
		// backgroundColor: 'orange',
		paddingHorizontal: 20,
		// paddingBottom: 40,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerIcon: {
		width: 24,
		height: 24,
	},
	headerAppIcon: {
		height: 24,
		width: 120,
		tintColor: colors.primary,
		resizeMode: "contain",
	},
	headerRightIcon: {
		width: 24,
		height: 24,
		tintColor: colors.white,
	},
	contentList: {
		paddingHorizontal: 20,
		gap: 24,
		// backgroundColor: 'orange',
		// top: Platform.OS === 'ios' ? -normalizePixelSize( 20, 'height') : 0,
	},
	contentIcon: {
		width: 20,
		height: 20,
		tintColor: colors.dark,
	},
	manuItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	// buttons
	rowButtonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingHorizontal: 20,
	},
	buttonContainer: {
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 12,
		backgroundColor: colors.light,
		// marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 1,
		gap: 4,
		height: normalizePixelSize(44, "height"),
	},
	rightIcon: {
		width: normalizePixelSize(20),
		height: normalizePixelSize(20),
		tintColor: colors.dark,
	},
	moneyIcon: {
		width: normalizePixelSize(20),
		height: normalizePixelSize(20),
		tintColor: colors.muted,
	},
	flagIcon: {
		width: normalizePixelSize(20),
		height: normalizePixelSize(20),
	},
});
