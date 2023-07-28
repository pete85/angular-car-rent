export const appConfig = {
  version: {
    branch: '@branch@',
    commit_sha: '@commit_sha@',
    commit_short_sha: '@commit_short_sha@'
  },
  appName: 'Vehicle Hire',
  baseUrl: 'https://pete85.com:8091/api',
  calendarTimeZone: 'none',
  currency: 'GBP',
  languageCode: "en-gb",
  timeFormat: 'HH:mm',
  dateFormat: `dd/MM/yyyy`,
  dateLongFormat: `yyyy-MM-dd'T'HH:mm:ss`,
  menuCode:'menuCode',
  countries: ['GB', 'PL'], // Google Places (Alpha-2 - https://www.iban.com/country-codes)
  countriesList: [
    {name: 'United Kingdom', code: 'UK'},
    {name: 'Poland', code: 'PL'}
  ],
  postUrl: 'JvPAo5LAPQ1bLO7l',
  snackBarDuration: 5000,
  // cypress: {
  //   recordKey: '0fc64678-bec2-4d01-9913-ce225da012ae',
  //   suitePattern: 'cypress/e2e/suites/*.spec.cy.ts',
  //   featurePattern: 'cypress/e2e/features/*.feature'
  // }
};

export const appColours = {
  primary: '#000000',
  secondary: '#5197D4',
  danger: '#a94442',
  success: '#97b1fe',
  warning: '#dfba4b',
  grey: '#dbdfe5',
  lightGrey: '#666E6E',
  darkGrey: '#3E4545',
  white: '#FFFFFF',
  yellow: '#DFDD4B',
  alert: '#EB5757',
  lightBlue: '#f6fafd',
  highlight: '#EBE5A1',
  navy: '#02145e',
  lavender: '#9AAEF9',
  jade: '#8FD6E5',
  fuchsia: '#FF0096',
  lime: '#64C20B',
  darkGreyRGBA: 'rgba(62, 69, 69, 0.6)'
};
