/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native';
import axios from 'axios';
import './i18n';

import App from './App';
import { name as appName } from './app.json';

// Debugging line to check the STAGE value

import {
	STAGE,
	BASE_API_URL_DEV,
	BASE_API_URL_PROD,
} from './.env';

console.log('STAGE:', STAGE);

const DESARROLLO = STAGE === 'development';
const PRODUCCION = STAGE === 'production';

const DOLOG = PRODUCCION;

axios.defaults.baseURL = DESARROLLO ? BASE_API_URL_DEV : BASE_API_URL_PROD;

// console.log({
// 	STAGE,
// 	BASE_API_URL_DEV,
// 	BASE_API_URL_PROD
// })

console.log(axios.defaults.baseURL)

let tokenPromise = null;

const logRequestDetails = (request) => {
	if (DOLOG) {
		console.log('Request Details:');
		console.log('Request BASE URL:', axios.defaults.baseURL);
		console.log('Request URL:', request.url);
		console.log('Request Method:', request.method);
		console.log('Request Headers:', request.headers);
		console.log('Request Data:', request.data);
	}
}

const logResponseDetails = (response) => {
	// if (DOLOG) {
	// 	console.log('Response Status:', response.status);
	// 	console.log('Response Data:', response.data);
	// }
}

const logErrorDetails = (error) => {
	// if (DOLOG) {
	// 	console.error('Error Details:');
	// 	console.error('Error Message:', error.message);
	// 	console.error('Error Status:', error.response?.status);
	// 	console.error('Error Data:', error.response?.data);
	// }
}

const PREFIJO = '/api';

axios.interceptors.request.use(
	async (request) => {

		if (!request.url.startsWith("/")) {
			request.url = `/${request.url}`;
		}

		request.url = `${PREFIJO}${request.url}`;
		logRequestDetails(request);

		try {
			if (!tokenPromise) {
				tokenPromise = AsyncStorage.getItem('USER_TOKEN'); // Almacenar la promesa
			}

			const cachedToken = await tokenPromise; // Esperar a que se resuelva la promesa
			tokenPromise = null; // Resetear la promesa

			if (cachedToken) {
				request.headers.Authorization = `Bearer ${cachedToken}`;
			}
		} catch (error) {
			console.error('Error loading the token from AsyncStorage:', error);
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);


// Response interceptor: Ignore 4xx errors and send only 5xx errors to the catch block
axios.interceptors.response.use(
	(response) => {

		logResponseDetails(response);

		return response; // Successful response
	},
	(error) => {
		const status = error.response?.status;

		logErrorDetails(error);

		if (status && status < 500) {
			// If the error is 4xx, resolve it as a "successful" response
			return Promise.resolve(error.response);
		}

		// If the error is 5xx, reject it and send it to the catch block
		return Promise.reject(error);
	}
);

AppRegistry.registerComponent(appName, () => App);
