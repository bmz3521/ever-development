export const useHooks = ({ navigation }) => {
  const onlabPress = item => {
    navigation.navigate('HistoryStack', {
      screen: 'DocumentDisplay',
      params: {
        type: item.type,
        title: 'ผลตรวจห้องปฏิบัติการ',
        data: item.data,
        lab: true,
      },
    });
  };
  return {
    actions: {
      onlabPress,
    },
  };
};
