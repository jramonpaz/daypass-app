import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";

import AppNavigation from "./navigation/AppNavigation";

import { store } from "./store/store";

import "./gesture-handler";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, STRIPE_PUBLISHABLE_KEY } from "../.env.ts";
//import { Auth0Provider } from 'react-native-auth0';
import { Text, View } from "react-native";

const Main = () => {
	return (
		<StripeProvider
			publishableKey={STRIPE_PUBLISHABLE_KEY}
			merchantIdentifier="merchant.com.tangram.daypass" // required for Apple Pay
			urlScheme="merchant.com.tangram.daypass" // required for 3D Secure and bank redirects
		>
			{/* <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}> */}
			<Provider store={store}>
				<AppNavigation />
			</Provider>
			{/* </Auth0Provider> */}
		</StripeProvider>
	);
};

export default Main;
