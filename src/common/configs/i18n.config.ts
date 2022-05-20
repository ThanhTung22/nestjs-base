import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nOptions,
} from 'nestjs-i18n';
import { Language } from '../constants/common.constant';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: Language.ENGLISH,
  loaderOptions: {
    path: './dist/i18n/',
    watch: true,
  },
  resolvers: [
    { use: HeaderResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
};
