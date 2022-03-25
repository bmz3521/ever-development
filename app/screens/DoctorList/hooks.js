const useHooks = ({ navigation, route }) => {
  const { doctors } = route.params;
  return {
    doctors,
  };
};

export default useHooks;
