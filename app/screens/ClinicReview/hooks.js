const useHooks = ({ navigation, route }) => {
  const { review } = route.params;

  return {
    review,
  };
};

export default useHooks;
