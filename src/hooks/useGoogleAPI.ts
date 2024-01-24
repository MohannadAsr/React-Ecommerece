import { GOOGLE_API } from '@src/Api/Google/EndPoints';
import { GetAddressDeliveryCost } from '@src/actions/OrderActions';
import axios from 'axios';
import React from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

const useGoogleAPI = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API.keyAlone,
  });

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    distance: number | null;
    cost: number | null;
  }>({ distance: null, cost: null });
  const [error, setError] = React.useState<null | string>(null);
  const [catchError, setCatchError] = React.useState<null | string>(null);

  const calcDistance = async (full_address, restaurantInfo) => {
    setLoading(true);
    let addressGeo = { lat: null, lng: null };
    let distance = null;
    // Getting the Geometry of the Address

    const response = await axios.get(
      `${GOOGLE_API.GetGeoCode}?address=${full_address}${GOOGLE_API.key}`
    );
    if (response.data.status == 'ZERO_RESULTS') {
      setLoading(false);
      setError('Unable to recognize the address please provide another one.');
      return;
    }
    if (response?.data?.results[0]?.geometry?.location) {
      addressGeo = {
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng,
      };

      // Make the API request using the service instead of the API to solve cross origins Issue
      const service = new window.google.maps.DistanceMatrixService();
      const distanceresponse = await service.getDistanceMatrix({
        origins: [addressGeo],
        destinations: [
          {
            lat: restaurantInfo.address.latitude,
            lng: restaurantInfo.address.longitude,
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      });

      distance = distanceresponse.rows[0].elements[0].distance.value;

      if (distance !== null) {
        setLoading(true);
        try {
          const costResponse = await GetAddressDeliveryCost(distance);

          setResult({ cost: costResponse.data, distance: distance });
          setError(null);
          setLoading(false);
          return { cost: costResponse.data, distance: distance };
        } catch (error) {
          setResult({ cost: null, distance: null });
          setError('Sorry your Location is out the range of our service');
          setLoading(false);
          return { cost: null, distance: distance || null };
        }
      }
    }
  };

  return {
    calcDistance,
    loading,
    result,
    error,
    catchError,
    setError,
    setResult,
  };
};

export default useGoogleAPI;
