const useHooks = ({
  navigation,
  bookingCategory,
  bookingType,
  price,
  title,
  subtitle,
  illustration,
  symptomGroupId,
}) => {
  const onNext = async () => {
    let additionParams;

    switch (bookingType) {
      case 'Telepharmacy':
        additionParams = {
          symptomGroupId,
        };
        break;
      default:
        additionParams = {
          price,
          title,
          subtitle,
          illustration,
        };
        break;
    }

    navigation.navigate('MainStack', {
      screen: 'PatientSymptom',
      params: {
        bookingType,
        bookingCategory,
        ...additionParams,
      },
    });
  };

  return {
    actions: {
      onNext,
    },
  };
};

export default useHooks;
