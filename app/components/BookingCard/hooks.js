import React from 'react';
import styles from './styles';
import { Image } from 'react-native';
import { Images } from '@config';
import Icon from 'react-native-vector-icons/FontAwesome5';

const useHooks = () => {
  const RoleImage = ({ item }) => {
    const role = item.status.split('_')[0];
    switch (role) {
      case 'PHARMACY':
        return <Image style={[styles.userAva]} source={Images.PharmacyImage} />;
      case 'DOCTOR':
        return <Image style={[styles.userAva]} source={Images.homeicon7} />;
      case 'CLINIC':
        return <Image style={[styles.userAva]} source={Images.Clinic} />;
      case 'PATIENT':
        return <Image style={[styles.userAva]} source={Images.Clinic} />;
      // change Image for this role later
      case 'COMMUNITY':
        return <Image style={[styles.userAva]} source={Images.PharmacyImage} />;
    }
  };

  const RoleTopIcon = ({ item }) => {
    const role = item.status.split('_')[0];
    switch (role) {
      case 'PHARMACY':
        return (
          <Icon
            name="prescription-bottle-alt"
            style={[styles.titleIcon, { color: '#085394', marginLeft: 1 }]}
          />
        );
      case 'DOCTOR':
        return (
          <Icon
            name="stethoscope"
            style={[styles.titleIcon, { color: 'green', marginLeft: -2 }]}
          />
        );
      case 'CLINIC':
        return <Image style={[styles.topIcon]} source={Images.ClinicTopIcon} />;
      case 'PATIENT':
        return <Image style={[styles.topIcon]} source={Images.ClinicTopIcon} />;
      // change Image for this role later
      case 'COMMUNITY':
        return (
          <Icon
            name="prescription-bottle-alt"
            style={[styles.titleIcon, { color: '#085394', marginLeft: 1 }]}
          />
        );
    }
  };

  return {
    RoleImage,
    RoleTopIcon,
  };
};

export default useHooks;
