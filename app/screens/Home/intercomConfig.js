import Intercom, { Visibility } from '@intercom/intercom-react-native';
import {
  setIntercomAfterReboot,
  setIntercomBtnVisiblehandler,
  getIntercomBtnVisible,
} from '@utils/asyncStorage';

const intercomConfig = ({ userId, firstname, lastname, email, setVisible }) => {
  const loginAsUser = () => {
    const id = `${userId}_${firstname}_${lastname}`;
    const fullName = `${firstname}_${lastname}`;

    const user = {
      userId: id,
      // email: email || '',
      name: fullName,
    };

    Intercom.registerIdentifiedUser(user).then(() => {
      console.log('I am registered...');
    });
  };

  const loginAsGuest = () => {
    Intercom.registerUnidentifiedUser().then(() => {
      console.log('I am a guest...');
    });
  };

  const interComvisiblehandler = async () => {
    try {
      await setIntercomBtnVisiblehandler();
      const isVisible = await getIntercomBtnVisible();
      setVisible(isVisible);
    } catch (error) {
      console.log('failed to load intercom status', error);
    }
  };

  const launchIntercomAfterReboot = async () => {
    try {
      await setIntercomAfterReboot();
      const isVisible = await getIntercomBtnVisible();
      setVisible(isVisible);
    } catch (error) {
      console.log('failed to load intercom status', error);
    }
  };

  const checkIntercomVisibility = async () => {
    const isVisible = await getIntercomBtnVisible();
    setVisible(isVisible);
  };

  return {
    events: {
      loginAsUser,
      loginAsGuest,
      interComvisiblehandler,
      launchIntercomAfterReboot,
      checkIntercomVisibility,
    },
  };
};

export { intercomConfig };
