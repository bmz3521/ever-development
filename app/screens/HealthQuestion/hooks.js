import { useSelector } from 'react-redux';

const useHooks = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  return {
    user,
    auth,
  };
};

export default useHooks;
