import { ImageSourcePropType } from 'react-native';

export interface ILanguageMock {
  id: string
  title: string
  subtitle: string
  iso: string
  country: string
  icon: ImageSourcePropType;
}

export interface ICurrency {
  id: string
  title: string
  subtitle: string
  iso: string
  country: string
  symbol: string
  icon: ImageSourcePropType;
}
