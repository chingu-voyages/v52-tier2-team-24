import PropTypes from 'prop-types';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';
import Directions from './Directions';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

export const GoogleMap = ({appointments}) => {

  // DIRECTIONS FUNCTION
  

  const locations = appointments.map(appt => {
    return {
      key: appt.address,
      location: {
        lat: appt.latitude,
        lng: appt.longitude,
      }
    }
  })

  const addresses = appointments.map(appt => appt.address)
  console.log("Addresses", addresses)

  console.log("LOCATION KEY", locations)

  return (

    <div className='flex justify-end'>
      <APIProvider 
        apiKey={GOOGLE_API_KEY} 
        onLoad={() => {
          console.log('Maps API has loaded.')
        }}
      >
        <Map
          style={{width: '80vw', height: '50vh'}}
          defaultCenter={locations[0] ? locations[0].location : {lat: 34.0549, lng: -118.2426}}
          mapId={GOOGLE_MAP_ID}
          defaultZoom={11}
          gestureHandling={'greedy'}

          disableDefaultUI={false}
        >
          {/* {locations.map((address, index) => <AdvancedMarker key={index} position={address.location} />)} */}
          <Directions addresses={addresses} />
        </Map>
      </APIProvider>
    </div>
  );
};

GoogleMap.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};
