import i18next from 'i18next';

/** NOTE LabelInfo as a function to fix change lang in Android */
export const labelInfo = () => [
  {
    header: i18next.t('PROFILE_EDIT_ORGANIZATION'),
    type: 'ProviderOrganize',
    linkTo: 'SettingProvider',
  },
  {
    header: i18next.t('SETTINGINFO_PERSONAL_INFO2'),
    type: 'personalInfo',
    linkTo: 'EditUserInfo',
    infoTitle: [
      {
        title: i18next.t('SETTINGINFO_IDCARD'),
      },
      {
        title: i18next.t('SETTINGINFO_FIRSTNAME'),
      },
      {
        title: i18next.t('SETTINGINFO_LASTNAME'),
      },
      {
        title: i18next.t('SETTINGINFO_BIRTHDATE'),
      },
      {
        title: i18next.t('SETTINGINFO_PHONE_NUMBER'),
      },
      {
        title: i18next.t('SETTINGINFO_SEX'),
      },
    ],
  },
  {
    header: i18next.t('SETTINGINFO_ADDRESS'),
    type: 'address',
    linkTo: 'EditUserInfo',
    infoTitle: [
      {
        title: i18next.t('SETTINGINFO_LOCATION1'),
      },
      i18next.language !== 'th'
        ? {
            title:
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[0] +
              ' ' +
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[1] +
              ' ,' +
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[3],
          }
        : {
            title:
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[0] +
              ' ' +
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[1] +
              ' ' +
              i18next.t('SETTINGINFO_LOCATION2').split(' ')[2],
          },
    ],
  },
];
