const useHooks = ({ weeklySteps }) => {
  const average = () => {
    let sum = weeklySteps.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );

    return Math.floor(sum / weeklySteps.length);
  };

  return {
    events: {
      average,
    },
  };
};

export { useHooks };
