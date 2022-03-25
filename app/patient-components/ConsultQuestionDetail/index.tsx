import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Text from "app/elements/Text";
import TextInput from "app/elements/TextInput";
import { Colors } from "app/configs";
import ButtonBorder from "app/elements/Buttons/ButtonBorder";
import Theme from "app/style/Theme";
import AttachItem from "app/patient-components/BookAppointment/AttachItem";
import { ICON } from "app/images/Icon";

interface ConsultQuestionDetailProps {
  style?: ViewStyle;
  attachment?: any;
  question: string;
  onOpenAttachmentModal?: () => void;
  onCloseAttachment?: (item: any) => void;
}

const ConsultQuestionDetail = memo(
  ({
    style,
    attachment,
    question,
    onOpenAttachmentModal,
    onCloseAttachment,
    label,
    onChangeText,
    value,
  }: ConsultQuestionDetailProps) => {
    const [text, setText] = useState<any>(value);
    const onChangeTextChild = useCallback(
      (value) => {
        onChangeText(value, label)
        setText(value);
      },
      [value]
    );


    console.log('attachmentChild', attachment);

    return (
      <View style={style}>
        <TextInput
          value={value}
          backgroundColor={Colors.WhiteSmoke}
          borderColor={Colors.WhiteSmoke}
          style={styles.question}
          multiline
          editable
          onChangeText={onChangeTextChild}
        />
        <View style={Theme.flexRowRight}>
          <Text
            size={11}
            lineHeight={14}
            color={Colors.GrayBlue}
            marginRight={16}
            marginBottom={16}
            marginTop={8}
          >
            {/* Mins 60 chars */}
          </Text>
          <Text
            size={11}
            lineHeight={14}
            color={Colors.GrayBlue}
            marginBottom={16}
            marginTop={8}
          >
            {question.length}/1000
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}> 
        <View style={{width: 20, height: 20, backgroundColor: '#00bae5', borderRadius: 50}}>
        </View>
        <Text style={{fontSize: 16,  color: '#00bae5',
        
        paddingLeft: 10, paddingHorizontal: 20,
         marginBottom: 30}}>กรุณาอัพโหลดผลการตรวจโควิด RT-PCR หรือ Home Antigen</Text>
        <View>
        </View>
                </View>

          {attachment && attachment.map(item => {
              console.log('itemConsole', item);
              return <AttachItem item={item} onClose={onCloseAttachment} />
            })
          }
        <Text style={{color: 'grey'}}> Max 5 </Text>
        <ButtonBorder
          iconLeft={ICON.attach}
          iconColor={Colors.DodgerBlue}
          title="กรุณาแนบผลตรวจโควิด"
          color={Colors.GrayBlue}
          onPress={onOpenAttachmentModal}
        />
      </View>
    );
  }
);

export default ConsultQuestionDetail;

const styles = StyleSheet.create({
  container: {},
  question: {
    padding: 12,
  },
});
