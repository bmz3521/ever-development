import React from 'react';
import { Text } from 'react-native';
import MarkDown from 'react-native-markdown-display';
import useStyles from './styles';

const TextCompilance = ({ content }) => {
  const rules = {
    list_item: (
      ordered_list_icon,
      ordered_list_content,
      bullet_list_icon,
      bullet_list_content,
    ) => (
      <Text key={ordered_list_content[0].key} style={{ marginLeft: 8 }}>
        {ordered_list_content}
      </Text>
    ),
  };

  /** NOTE doc about markdown : https://github.com/iamacup/react-native-markdown-display/ */
  const styles = useStyles();
  return (
    <MarkDown style={styles.markdown} rules={rules}>
      {content}
    </MarkDown>
  );
};

export default React.memo(TextCompilance);
