import { Alert, Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	CommonActions,
	CompositeNavigationProp,
	NavigationProp,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import {
	confirmPlatformPayPayment,
	isPlatformPaySupported,
	PlatformPay,
	useStripe,
} from "@stripe/stripe-react-native";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { NavBarBottomTabParams } from "@app/navigation/NavBarBottom";
import { ExploreTabStackParamList } from "@app/navigation/ExploreTabStack";

import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";
import { logoutService } from "@app/store/slices/auth/auth.service";
import { navigationActions } from "@app/store/slices/navigation/navigation.slice";
import {
	executePurchaseAsAnonymousService,
	executePurchaseUserService,
	getShoppingCartPurchaseAnonymousService,
	getShoppingCartPurchaseService,
	hotelActions,
} from "@app/store/slices/hotels";

import ReservationDetail from "./components/ReservationDetail";
import DivisorComponent from "@app/components/molecules/divisor/DivisorComponent";
import ButtonComponent from "@app/components/molecules/buttons/ButtonComponent";
import FieldPhoneInput from "@app/components/organisms/fields/FieldPhoneInput";
import BottomContainer from "@app/components/atoms/containers/BottomContainer";
import ButtonWithIcon from "@app/components/molecules/buttons/ButtonWithIcon";
import SectionItems from "@app/components/molecules/SectionItems";
import FieldBase from "@app/components/organisms/fields/FieldBase";
import HotelCard from "./components/HotelCard";
import TextComponent from "@app/components/atoms/text/TextComponent";
// import CouponItem from './components/CouponItem';
import CheckboxLabel from "@app/components/molecules/checks/CheckboxLabel";
import CheckboxComponent from "@app/components/molecules/checks/CheckboxComponent";

import { normalizePixelSize } from "@app/utils/normalize";
import { formatToCurrency } from "@app/utils/number.util";
import { apple_pay_icon, payment_icon } from "@app/utils/images";

import { EMAIL_REGEX } from "@app/config/constants";
import { colors } from "@app/theme";
import {
	IExecutePurchaseAnonymousRequest,
	IExecutePurchaseRequest,
	IShoppingCartPurchaseAnonymousRequest,
	IShoppingCartPurchaseRequest,
	ISignInAnonymousFromData,
} from "@app/types";

type NavigationType = CompositeNavigationProp<
	NavigationProp<NavBarBottomTabParams>,
	NavigationProp<ExploreTabStackParamList>
>;

const CheckoutScreen = () => {
	const [isApplePaySupported, setIsApplePaySupported] = useState(false);
	const [aceptAds, setAceptAds] = useState(false);
	const [aceptAllTermsConditions, setAceptAllTermsConditions] = useState(false);

	const { t } = useTranslation();
	const navigation = useNavigation<NavigationType>();
	const dispatch = useAppDispatch();
	const { isAuth, userDetail } = useAppSelector(state => state.auth);
	const [isLogin, setIsLogin] = useState<boolean>(isAuth && !!userDetail);
	const {
		purchaseTickets,
		// hotelVenueDetail,
		hotelSelected,
		hotelVenuePurchaseResponse,
		isLoading,
		shoppingCartPurchase,
		error,
	} = useAppSelector(state => state.hotels);
	const { searchSelectedPrediction } = useAppSelector(state => state.search);
	const { language } = useAppSelector(state => state.general);

	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const {
		control,
		// handleSubmit,
		setValue,
		getValues,
		formState: { errors, isValid },
	} = useForm<ISignInAnonymousFromData>({
		reValidateMode: "onBlur",
		defaultValues: {
			name: "",
			surname: "",
			mail: "",
			phone_code: "+34",
			phone: "",
		},
	});

	useEffect(() => {
		(async function () {
			const isSupported = await isPlatformPaySupported();
			setIsApplePaySupported(isSupported);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlatformPaySupported]);

	useFocusEffect(
		useCallback(() => {
			if (error) {
				Alert.alert(t("checkout-screen-error-alert-title"), error, [
					{
						text: t("checkout-screen-error-alert-ok"),
						onPress: () => {
							dispatch(hotelActions.clean());
							dispatch(hotelActions.clearPurchaseData());
							navigation.goBack();
						},
					},
				]);
			}
		}, [error, dispatch, t, navigation]),
	);

	/**
	 * @summary Stripe payment
	 * Stripe payment process starts here
	 */
	const fetchPaymentSheetParams = useCallback(
		async () => {
			if (!hotelVenuePurchaseResponse || !hotelSelected || !searchSelectedPrediction) {
				// return;
				console.warn("no have necessarily data");
				return null;
			}

			if (!!isAuth && !!userDetail) {
				// user is authenticated
				const payload: IShoppingCartPurchaseRequest = {
					shopping_cart_id: hotelVenuePurchaseResponse.shopping_cart_id,
					id_venue: hotelSelected.id_venue,
					iso_country: searchSelectedPrediction.iso_country,
					lang: language,
				};
				const response = await dispatch(getShoppingCartPurchaseService(payload));

				return response;
			} else {
				// user is not authenticated
				const payload: IShoppingCartPurchaseAnonymousRequest = {
					shopping_cart_id: hotelVenuePurchaseResponse.shopping_cart_id,
					id_venue: hotelSelected.id_venue,
					iso_country: searchSelectedPrediction.iso_country,
					lang: language,
				};
				const response = await dispatch(
					getShoppingCartPurchaseAnonymousService(payload),
				);

				return response;
			}
			// return {
			//   paymentIntent: '',
			//   ephemeralKey: '',
			//   customer: '',
			// };
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[hotelVenuePurchaseResponse, hotelSelected, searchSelectedPrediction],
	);

	// async () => {

	// };

	const initializePaymentSheet = async () => {
		const response = await fetchPaymentSheetParams();
		if (!response) {
			console.warn("response of `fetchPaymentSheetParams` is null");
			return;
		}

		const {
			payment_authorization: paymentIntent, // paymentIntent,
			payment_ephemeralKey: ephemeralKey, // ephemeralKey,
			payment_customer: customer, // customer,
		} = response;

		const { error: errorPayment } = await initPaymentSheet({
			merchantDisplayName: `Daypass - $ ${shoppingCartPurchase?.total_visor} ${shoppingCartPurchase?.currency_payment}`,
			customerId: customer,
			customerEphemeralKeySecret: ephemeralKey,
			paymentIntentClientSecret: paymentIntent,
			// Set `allowsDelayedPaymentMethods` to true if your business can handle payment
			//methods that complete payment after a delay, like SEPA Debit and Sofort.
			allowsDelayedPaymentMethods: true,
			defaultBillingDetails: {
				name: "Jane Doe",
			},
		});

		if (errorPayment) {
			console.error("Error initializing payment");
		}
	};

	useEffect(() => {
		if (hotelVenuePurchaseResponse && hotelSelected && searchSelectedPrediction) {
			initializePaymentSheet();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hotelVenuePurchaseResponse, hotelSelected, searchSelectedPrediction]);

	const openPaymentSheet = async () => {
		const { error: errorPayment } = await presentPaymentSheet();

		if (errorPayment) {
			Alert.alert(
				t("checkout-screen-payment-error-title"),
				t("checkout-screen-payment-error-message", {
					errorCode: errorPayment.code,
					message: errorPayment.message,
				}),
			);
		} else {
			Alert.alert(
				t("checkout-screen-payment-success-title"),
				t("checkout-screen-payment-success-message"),
				[
					{
						style: "default",
						text: t("checkout-screen-payment-success-ok"),
						onPress: () => {
							goToPaymentScreen(getValues());
						},
					},
				],
			);
		}
	};

	const handleOpenApplePay = async () => {
		if (!isApplePaySupported) {
			Alert.alert(
				t("checkout-screen-apple-pay-not-supported-title"),
				t("checkout-screen-apple-pay-not-supported-message"),
			);
			return;
		}
		const response = await fetchPaymentSheetParams();

		if (!response || !hotelSelected || !hotelVenuePurchaseResponse || !shoppingCartPurchase) {
			console.warn("Failed to fetch payment sheet params");
			return;
		}

		const cartItems: PlatformPay.CartSummaryItem[] = [];
		// TODO: load card items
		shoppingCartPurchase.detail_visor.map(item => {
			cartItems.push({
				label: `${item.name} x ${item.number}`,
				amount: formatToCurrency(item.price, true),
				paymentType: PlatformPay.PaymentType.Immediate,
			});
		});

		// put taxes
		// if (shoppingCartPurchase.tax_visor > 0){
		//   cartItems.push({
		//     label: 'Taxes',
		//     amount: formatToCurrency(shoppingCartPurchase.tax_visor, true),
		//     paymentType: PlatformPay.PaymentType.Immediate,
		//   });
		// }

		// Put the total amount purchased
		cartItems.push({
			label: "Total",
			amount: formatToCurrency(shoppingCartPurchase.total_visor, true),
			paymentType: PlatformPay.PaymentType.Immediate,
		});

		const { error: errorApplePay } = await confirmPlatformPayPayment(
			response.payment_authorization,
			{
				applePay: {
					cartItems: cartItems,
					merchantCountryCode: "ES",
					currencyCode: shoppingCartPurchase.currency_payment,
					// requiredShippingAddressFields: [
					//   PlatformPay.ContactField.PostalAddress,
					// ],
					requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
				},
			},
		);
		if (errorApplePay) {
			if (errorApplePay.code !== "Canceled") {
				console.warn("Error processing apple payment", errorApplePay);
				Alert.alert(
					t("checkout-screen-apple-pay-error-title"),
					t("checkout-screen-apple-pay-error-message"),
					[
						{
							text: t("checkout-screen-apple-pay-error-ok"),
							style: "destructive",
							onPress: () => {
								dispatch(hotelActions.clean());
								dispatch(hotelActions.clearPurchaseData());
								navigation.goBack();
							},
						},
					],
				);
			}
		} else {
			Alert.alert(
				t("checkout-screen-apple-pay-success-title"),
				t("checkout-screen-apple-pay-success-message"),
				[
					{
						style: "default",
						text: t("checkout-screen-apple-pay-success-ok"),
						onPress: () => {
							goToPaymentScreen(getValues());
						},
					},
				],
			);
		}
	};

	const isDisabledPayment = useMemo(() => {
		if (isLogin) {
			return false;
		} else {
			return !isValid;
		}
	}, [isLogin, isValid]);

	function handleGoToSigin() {
		// IMPORTANT NOTE: need to save the current navigation state
		const prevState = navigation.getState();
		dispatch(navigationActions.setPreviousNavigation(prevState));
		navigation.navigate("AUTH_TAB_STACK", { screen: "SIGN_IN_SCREEN" });
	}

	function handleLogout() {
		setIsLogin(false);
		dispatch(logoutService());
	}

	async function goToPaymentScreen(formValues: ISignInAnonymousFromData) {
		if (
			!hotelSelected ||
			!hotelVenuePurchaseResponse ||
			!searchSelectedPrediction ||
			!shoppingCartPurchase
		) {
			console.warn("not have necesary payment process");
			return;
		}

		if (isAuth && userDetail) {
			const payloadEcecutePurchace: IExecutePurchaseRequest = {
				shopping_cart_id: hotelVenuePurchaseResponse.shopping_cart_id,
				id_venue: hotelSelected.id_venue,
				iso_country: searchSelectedPrediction.iso_country,
				lang: language,
				payment_token: shoppingCartPurchase.payment_authorization,
				user_phone_code: userDetail.phone_code,
				user_phone: userDetail.phone,
				user_id_country: userDetail.id_country,
				accept_marketing: aceptAds,
			};
			const response = await dispatch(executePurchaseUserService(payloadEcecutePurchace));
			if (response) {
				// navigation.navigate('CHECKOUT_CONFIRM_SCREEN');
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [
							{ name: "EXPLORE_TAB_SCREEN" },
							{ name: "CHECKOUT_CONFIRM_SCREEN" },
						],
					}),
				);
			}
		} else {
			const payloadEcecutePurchace: IExecutePurchaseAnonymousRequest = {
				shopping_cart_id: hotelVenuePurchaseResponse.shopping_cart_id,
				id_venue: hotelSelected.id_venue,
				iso_country: searchSelectedPrediction.iso_country,
				lang: language,
				payment_token: shoppingCartPurchase.payment_authorization,
				user_phone_code: formValues.phone_code.slice(1),
				user_phone: formValues.phone.replaceAll(" ", ""),
				user_id_country: 1,
				accept_marketing: false,
				user_name: formValues.name,
				user_surname: formValues.surname,
				user_mail: formValues.mail,
			};
			dispatch(hotelActions.setExecutePurchaseAnonymousRequest(payloadEcecutePurchace));
			const response = await dispatch(
				executePurchaseAsAnonymousService(payloadEcecutePurchace),
			);
			if (response) {
				//  navigation.navigate('CHECKOUT_CONFIRM_SCREEN');
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [
							{ name: "EXPLORE_TAB_SCREEN" },
							{ name: "CHECKOUT_CONFIRM_SCREEN" },
						],
					}),
				);
			}
		}
	}

	return (
		<View style={styles.main}>
			<ScrollView style={styles.main} contentContainerStyle={styles.content}>
				<StatusBar
					backgroundColor={colors.primary}
					animated={true}
					barStyle={"light-content"}
				/>

				<HotelCard />

				<DivisorComponent />

				{!isLogin && (
					<>
						<ButtonComponent
							title={t("checkout-screen-sign-in-button")}
							theme="outline"
							onPress={handleGoToSigin}
						/>

						<DivisorComponent label={t("or")} />

						<SectionItems title={t("checkout-screen-guest-purchase-title")}>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<FieldBase
										input
										type="default"
										placeholder={t(
											"checkout-screen-first-name-placeholder",
										)}
										onBlur={onBlur}
										value={value}
										onChangeText={onChange}
									/>
								)}
								name="name"
							/>
							{errors.name && (
								<TextComponent color="primary">
									{t("checkout-screen-field-required")}
								</TextComponent>
							)}

							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<FieldBase
										input
										type="default"
										placeholder={t(
											"checkout-screen-last-name-placeholder",
										)}
										onBlur={onBlur}
										value={value}
										onChangeText={onChange}
									/>
								)}
								name="surname"
							/>
							{errors.surname && (
								<TextComponent color="primary">
									{t("checkout-screen-field-required")}
								</TextComponent>
							)}

							<Controller
								control={control}
								rules={{
									required: true,
									pattern: EMAIL_REGEX,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<FieldBase
										input
										type="email"
										autoCapitalize="none"
										placeholder={t(
											"checkout-screen-email-placeholder",
										)}
										onBlur={onBlur}
										value={value}
										onChangeText={onChange}
									/>
								)}
								name="mail"
							/>
							{errors.mail && (
								<TextComponent color="primary">
									{t("checkout-screen-field-required")}
								</TextComponent>
							)}

							<Controller
								control={control}
								name="phone"
								rules={{
									required: t("checkout-screen-phone-number-required"),
								}}
								render={({ field: { onChange, value } }) => (
									<FieldPhoneInput
										value={value}
										onChangeText={onChange}
										onChangeCountry={country => {
											setValue("phone_code", country.callingCode);
										}}
									/>
								)}
							/>
							{errors.phone && (
								<TextComponent color="primary">
									{errors.phone.message}
								</TextComponent>
							)}

							{/* <FieldPhoneInput /> */}
						</SectionItems>
					</>
				)}

				{isLogin && userDetail && (
					<>
						<FieldBase
							input
							type="default"
							label={t("checkout-screen-first-name-label")}
							placeholder={t("checkout-screen-first-name-placeholder")}
							disabled={true}
							value={userDetail.name}
						/>

						<FieldBase
							input
							type="default"
							label={t("checkout-screen-last-name-label")}
							placeholder={t("checkout-screen-last-name-placeholder")}
							disabled={true}
							value={userDetail.surname}
						/>

						<FieldBase
							input
							type="email"
							autoCapitalize="none"
							label={t("checkout-screen-email-label")}
							placeholder={t("checkout-screen-email-placeholder")}
							disabled={true}
							value={userDetail.mail}
						/>

						<FieldBase
							input
							type="phone-number"
							label={t("checkout-screen-mobile-phone-label")}
							placeholder={t("checkout-screen-email-placeholder")}
							disabled={true}
							value={`${userDetail.phone_code} ${userDetail.phone}`}
						/>

						<ButtonComponent
							title={t("checkout-screen-logout-button")}
							theme="outline"
							// onPress={() => setIsLogin(!isLogin)}
							isLoading={isLoading}
							disabled={isLoading}
							onPress={handleLogout}
						/>
					</>
				)}

				<DivisorComponent />

				<SectionItems title={t("checkout-screen-booking-details-title")}>
					<ReservationDetail
						purchaseTickets={purchaseTickets}
						purchaseTaxes={shoppingCartPurchase?.tax_visor ?? 0}
						totalPurchaseAmount={shoppingCartPurchase?.total_payment ?? 0}
					/>
				</SectionItems>

				{/* <DivisorComponent />

        <SectionItems title="Cupón de descuento">
          <FieldIconWithButton
            input
            leftImage={tag_icon}
            // rightImage={tag_icon}
            placeholder={'Ingresa un cupón'}
            actionLabel="Aplicar"
            onActionPress={handleAddCoupon}
          />
        </SectionItems>

        <CouponItem /> */}

				<View style={styles.checkContainer}>
					<CheckboxLabel
						label={t("checkout-screen-promotions-checkbox-label")}
						active={aceptAds}
						onChange={setAceptAds}
					/>

					<View style={styles.checkTerms}>
						<CheckboxComponent
							onChange={setAceptAllTermsConditions}
							// onBlur={onBlur}
							isActive={aceptAllTermsConditions}
						/>
						{/* Al completar la compra aceptas las <condiciones de la reserva>, <condiciones generales> y la <política de privacidad> */}
						<View style={styles.rowText}>
							<TextComponent size="14" color="dark">
								{t("checkout-screen-terms-checkbox-label")}
							</TextComponent>

							<TextComponent size="14" color="primary">
								{t("checkout-screen-terms-booking-conditions")}
							</TextComponent>

							<TextComponent size="14" color="primary">
								{t("checkout-screen-terms-general-conditions")}
							</TextComponent>

							<TextComponent size="14" color="dark">
								{t("and_the")}
							</TextComponent>

							<TextComponent
								size="14"
								color="primary"
								// onPress={handleGoToPrivacyPolice}
							>
								{t("checkout-screen-terms-privacy-policy")}
							</TextComponent>
						</View>
					</View>
				</View>
			</ScrollView>

			<BottomContainer showMargin>
				<ButtonWithIcon
					title={t("checkout-screen-card-button")}
					leftImageSource={payment_icon}
					style={styles.actionButton}
					onPress={openPaymentSheet}
					isLoading={isLoading}
					disabled={isDisabledPayment || isLoading || !aceptAllTermsConditions}
				/>

				{Platform.OS === "ios" && (
					<ButtonWithIcon
						theme="dark"
						title={t("checkout-screen-apple-pay-button")}
						hideTitle={true}
						style={styles.actionButton}
						onPress={handleOpenApplePay}
						leftImageSource={apple_pay_icon}
						leftImageStyle={styles.appleIcon}
						isLoading={isLoading}
						disabled={isDisabledPayment || isLoading || !aceptAllTermsConditions}
					/>
				)}
			</BottomContainer>
		</View>
	);
};

export default CheckoutScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.white,
	},
	content: {
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingVertical: normalizePixelSize(24, "height"),
		paddingBottom: normalizePixelSize(30, "height"),
		gap: normalizePixelSize(20, "height"),
	},
	bottomContainer: {
		borderTopWidth: 1,
		alignItems: "center",
		flexDirection: "row",
		gap: normalizePixelSize(12, "width"),
		borderTopColor: colors.lowlight,
		paddingTop: normalizePixelSize(4, "height"),
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingBottom: normalizePixelSize(12, "height"),
		// paddingHorizontal: normalizePixelSize(20, 'height'),
	},
	appleIcon: {
		height: 36,
		width: 80,
		resizeMode: "contain",
	},
	actionButton: {
		flexGrow: 1,
	},
	checkTerms: {
		flexDirection: "row",
		// alignItems: 'center',
		marginTop: 8,
		gap: 8,
	},
	rowText: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 4,
		flexShrink: 1,
		flexWrap: "wrap",
	},
	checkContainer: {
		gap: normalizePixelSize(10, "height"),
	},
});
