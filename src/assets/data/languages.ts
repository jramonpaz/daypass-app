import { ILanguageMock } from '@app/types';
import { flag_spain_icon, flag_usa_icon } from '@app/utils/images';

// TODO: extract icon to ad key-value object with iso id as key
export const languages_mock: ILanguageMock[] = [
  {
    id: '1',
    title: 'English',
    subtitle: 'US',
    country: 'USA',
    iso: 'en',
    icon: flag_usa_icon,
  },
  {
    id: '2',
    title: 'Español',
    subtitle: 'ES',
    country: 'ESP',
    iso: 'es',
    icon: flag_spain_icon,
  },
];
