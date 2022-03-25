import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _isEmpty from 'lodash/isEmpty';
import { useTheme } from 'react-native-elements';

import styles from './styles';
import i18next from 'i18next';

const EventTime = ({ time: { content, style: timeStyle } = {}, style }) => {
  return (
    <View style={[styles.timeContainer, style]}>
      <Text style={[styles.time, timeStyle]}>{content}</Text>
    </View>
  );
};

const EventIcon = ({ icon: OriginalIcon = {}, iconStyle, lineStyle }) => {
  // Determines whether we are trying to render a custom icon component, or use the default
  const iconIsComponent = typeof OriginalIcon === 'function';
  let iconToBeRendered = iconIsComponent ? (
    <OriginalIcon styles={styles.icon} />
  ) : (
    <Icon
      name={OriginalIcon.content}
      style={[
        styles.icon,
        OriginalIcon.style && !_isEmpty(OriginalIcon.style)
          ? OriginalIcon.style
          : null,
      ]}
    />
  );

  return (
    <View style={[styles.iconContainer, iconStyle]}>
      {iconToBeRendered}
      <View style={[styles.verticalLine, lineStyle]} />
    </View>
  );
};

/*
Event component, is the component in which you can render whatever the event is about,
e.g. Title, description, or even render a custom template by sending a render-prop with whatsoever
content you need.
*/
const Event = ({ children, style }) => {
  return <View style={[styles.eventContainer, style]}>{children}</View>;
};

/*
Row component, is the component that combines all the sub-components (EventIcon, Event, EventTime) and
gets each 'event' as an argument of type object
*/
const Row = ({
  event = {},
  eventStyle,
  timeContainerStyle,
  iconContainerStyle,
  lineStyle,
  contentContainerStyle,
}) => {
  const {
    title: OriginalTitle = {},
    description: OriginalDescription = {},
    doctorName: OriginalDoctor = {},
    today,
    time,
    icon,
    pressAction,
  } = event;

  // Determines whether or not the Row is clickable, and acts accordingly
  const RowComp = pressAction ? TouchableOpacity : View;

  // Determines whether the title is just a text and its style, or a render-prop function, and acts accrodingly
  const titleIsComponent = OriginalTitle && typeof OriginalTitle === 'function';
  const title = titleIsComponent ? (
    <OriginalTitle styles={styles.title} />
  ) : (
    typeof OriginalTitle === 'object' &&
    !_isEmpty(OriginalTitle) && (
      <View>
        <Text style={[styles.title, OriginalTitle.style]}>
          {OriginalTitle.content}
        </Text>
      </View>
    )
  );

  // Determines whether the description is just a text and its style, or a render-prop function, and acts accrodingly
  const descriptionIsComponent =
    OriginalDescription && typeof OriginalDescription === 'function';
  const description = descriptionIsComponent ? (
    <OriginalDescription styles={styles.description} />
  ) : (
    typeof OriginalDescription === 'object' &&
    !_isEmpty(OriginalDescription) && (
      <View>
        <Text style={[styles.description, OriginalDescription.style]}>
          {OriginalDescription.content}
        </Text>
      </View>
    )
  );

  // Determines whether the doctorName is just a text and its style, or a render-prop function, and acts accrodingly
  const doctorNameIsComponent =
    OriginalDoctor && typeof OriginalDoctor === 'function';
  const doctor = descriptionIsComponent ? (
    <OriginalDoctor styles={styles.doctorName} />
  ) : (
    typeof OriginalDoctor === 'object' &&
    !_isEmpty(OriginalDoctor) && (
      <View>
        <Text style={[styles.doctor, OriginalDoctor.style]}>
          {OriginalDoctor.content}
        </Text>
      </View>
    )
  );

  const { theme } = useTheme();

  return (
    <RowComp
      activeOpacity={0.5}
      style={[styles.row, eventStyle]}
      onPress={pressAction}
    >
      <EventTime time={time} style={timeContainerStyle} />
      <EventIcon
        icon={icon}
        iconStyle={iconContainerStyle}
        lineStyle={lineStyle}
      />
      <Event
        style={[
          contentContainerStyle,
          {
            shadowColor: theme.colors.shadows,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3,
            elevation: 6,
          },
        ]}
      >
        {title}
        <View style={styles.makeRow}>
          <View>
            <Icon
              name="hospital-o"
              size={12}
              color={today.content ? '#fff' : '#7C7C7C'}
              style={styles.iconMargin}
            />
          </View>
          {description}
        </View>
        <View style={styles.makeRow}>
          <View>
            <Icon
              name="stethoscope"
              size={12}
              color={today.content ? '#fff' : '#7C7C7C'}
              style={styles.iconMargin}
            />
          </View>
          {doctor}
        </View>
      </Event>
    </RowComp>
  );
};

const Timeline = ({
  data = [], // The actual event's array, array of objects, each object represents a single event
  eventStyle = {}, // Each event's whole row's style
  timeContainerStyle = {}, // The style object of the container that holds the time
  iconContainerStyle = {}, // The style object of the container that holds the icon
  lineStyle = {}, // The vertical line's style object
  contentContainerStyle = {}, // The style object of the container that holds the content i.e. title and description
  onEndReachedThreshold,
  onEndReached,
  TimelineFooter,
  TimelineHeader,
  onRefresh,
  refreshing,
  loading,
  ...rest
}) => {
  const { theme } = useTheme();
  const events = (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <Row
          event={item}
          eventStyle={eventStyle}
          timeContainerStyle={
            index === 0
              ? [contentContainerStyle, { marginTop: 20 }]
              : timeContainerStyle
          }
          iconContainerStyle={
            index === 0
              ? [contentContainerStyle, { marginTop: 20 }]
              : iconContainerStyle
          }
          lineStyle={
            index === data.length - 1 ? styles.noVerticalLine : lineStyle
          }
          contentContainerStyle={[
            index === 0
              ? [contentContainerStyle, { marginTop: 20 }]
              : contentContainerStyle,
          ]}
        />
      )}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(_, ndx) => ndx.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold || 0}
      contentContainerStyle={{ flexGrow: 1 }}
      ListFooterComponent={TimelineFooter}
      ListHeaderComponent={TimelineHeader}
      ListEmptyComponent={() =>
        !loading &&
        !refreshing && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                fontFamily: theme.fontFamilyDefault,
                fontSize: theme.fontSizeDefault,
              }}
            >
              {i18next.t('HISTORYDETAIL_EMPTY')}
            </Text>
          </View>
        )
      }
      {...rest}
    />
  );

  return <View style={styles.container}>{events}</View>;
};

module.exports = Timeline;
