import { createSelector } from 'reselect'

const languages = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
}

const selectLocaleDomain = state => state.get('locale')

export const selectLocaleCode = createSelector(
  selectLocaleDomain,
  locale => locale.get('code'),
)

export const selectLocaleLanguage = createSelector(
  selectLocaleCode,
  locale => languages[locale],
)
