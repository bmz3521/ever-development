import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

const useHooks = () => {
  const DISABLED_DAYS = ['Saturday', 'Sunday'];
  const calendar_api_key = 'AIzaSyBDLYwoxv5GtDACl-UE5M4aaIN77Q1MYno';
  const currentDateTime = moment(new Date())
    .add(2, 'days')
    .format('YYYY-MM-DD');

  const [dayOff, setDayOff] = useState({});
  const [weekend, setWeekEnd] = useState({});

  useEffect(() => {
    getHolidays();
    setWeekEnd(
      getDaysInMonth(moment().month() + 1, moment().year(), DISABLED_DAYS),
    );
  }, []);

  const getHolidays = async () => {
    const disableDay = { disabled: true, disableTouchEvent: true };
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/th.th.official%23holiday%40group.v.calendar.google.com/events?key=${calendar_api_key}`,
      );
      const marked = {};
      data.items.forEach(item => {
        marked[item.start.date] = disableDay;
      });

      setDayOff(marked);
    } catch (error) {
      console.log(error);
    }
  };

  const getDaysInMonth = (month, year, days) => {
    let pivot = moment()
      .month(month)
      .year(year)
      .startOf('month');
    const end = moment()
      .month(month)
      .year(year)
      .endOf('month');
    let dates = {};
    const disabled = { disabled: true };
    while (pivot.isBefore(end)) {
      days.forEach(day => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
        dates[moment(pivot.day(days[1]) - 1).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    return dates;
  };

  return {
    DISABLED_DAYS,
    dayOff,
    weekend,
    currentDateTime,
    getHolidays,
    setWeekEnd,
    getDaysInMonth,
  };
};

export { useHooks };
