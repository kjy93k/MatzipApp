import Geolocation from '@react-native-community/geolocation';
import { useState, useEffect } from 'react';
import { LatLng } from 'react-native-maps';
import useAppState from './useAppState';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const { latitude, longitude } = info.coords;
        setUserLocation({ latitude, longitude });
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      { enableHighAccuracy: true },
    );
  }, [isComeback]);

  return { userLocation, isUserLocationError };
};

export default useUserLocation;
