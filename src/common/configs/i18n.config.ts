import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nOptions,
} from 'nestjs-i18n';
import { Language } from '../constants/common.constant';

export const I18nConfiguration: I18nOptions = {
  fallbackLanguage: Language.ENGLISH,
  loaderOptions: {
    path: path.join(__dirname, '../../i18n/'),
    watch: true,
  },
  resolvers: [
    { use: HeaderResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
};
