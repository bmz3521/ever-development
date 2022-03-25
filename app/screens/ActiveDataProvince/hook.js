import React, { useEffect, useState, useRef } from 'react';
import { useTheme, Icon } from 'react-native-elements';
import raw from '@assets/raw_database.json';
import { uniq } from 'lodash';

const useHooks = () => {
  const { theme } = useTheme();
  const uniqRaw = uniq(raw.map(r => r.province));
  const [provinces, setProvinces] = useState(uniqRaw);

  const onChangeProvince = value => {
    let filterProvinces = raw.filter(r => r.province === value);
    let uniqAmphoes = uniq(
      filterProvinces.map(filterProvince => filterProvince.amphoe),
    );
    return uniqAmphoes;
  };

  const onChangeAmphoe = value => {
    let filterAreas = raw.filter(r => r.amphoe === value);
    let uniqDistricts = uniq(
      filterAreas.map(filterArea => filterArea.district),
    );
    return uniqDistricts;
  };

  const onChangeDistrict = value => {
    let filterDistricts = raw.filter(r => r.district === value);
    let uniqZipcodes = uniq(
      filterDistricts.map(filterDistrict => filterDistrict.zipcode),
    );
    return uniqZipcodes;
  };

  return {
    Icon,
    theme,
    provinces,
    onChangeProvince,
    onChangeAmphoe,
    onChangeDistrict,
  };
};

export { useHooks };
