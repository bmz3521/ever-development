import React from 'react';
import * as Utils from '@utils';

const MAX_ABOUT = 1;
const MAX_LOCATION = 0;

const useHooks = props => {
  const { actions, clinic, navigation, route } = props;
  console.log(route.params);

  const clinicId = route.params.id;
  console.log('clinicId', clinicId);

  console.log(props.clinic.data);

  const [ready, setReady] = React.useState(false);

  const [locationMore, setLocationMore] = React.useState(false);
  const [locationList, setLocationList] = React.useState([]);

  const [aboutMore, setAboutMore] = React.useState(false);
  const [aboutList, setAboutList] = React.useState([]);

  React.useEffect(() => {
    actions.getClinic({
      filter: {
        where: {
          id: clinicId,
        },
        include: [
          'Accreditations',
          'Amenities',
          'Doctors',
          'ClinicPackages',
          'ClinicPhotos',
          'ClinicReviews',
          'Procedures',
        ],
      },
    });
  }, [clinicId, actions]);

  React.useEffect(() => {
    if (clinic.loading || !clinic.data) return;

    setAboutList(clinic.data.about.split('\n'));
    setLocationList(clinic.data.locationDescription.split('\n'));
    setReady(true);
  }, [clinic.data]);

  const setAboutMoreCallback = React.useCallback(
    value => () => setAboutMore(value),
    [],
  );
  const setLocationMoreCallback = React.useCallback(
    value => () => setLocationMore(value),
    [],
  );

  return {
    ready,
    aboutList: aboutList.slice(0, aboutMore ? aboutList.length : MAX_ABOUT),
    aboutMoreCondition: aboutList.length > MAX_ABOUT && !aboutMore,
    locationList: locationList.slice(
      0,
      locationMore ? locationList.length : MAX_LOCATION,
    ),
    locationMoreCondition: locationList.length > MAX_LOCATION && !locationMore,
    events: {
      setAboutMore: setAboutMoreCallback,
      setLocationMore: setLocationMoreCallback,
    },
  };
};

export { useHooks };
