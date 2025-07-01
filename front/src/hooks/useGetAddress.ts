import { errorMassages } from '@/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

const useGetAddress = (location: LatLng) => {
  const { latitude, longitude } = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&results_type=street_address|route|political&key=AIzaSyDMofmtWvlz5Gq93yZte_Jp_DkTFyM8rNc&language=ko`,
        );
        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(errorMassages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);
  return result;
};

export default useGetAddress;
