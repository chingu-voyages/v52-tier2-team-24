import {
  APIProvider,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const GoogleMap = () => {
  const appointments = JSON.parse(localStorage.getItem('appointments'));

  const locations = appointments.map(appt => {
    return {
      key: appt.address,
      location: {
        lat: appt.latitude,
        lng: appt.longitude,
      }
    }
  })

  return (
    <div className='flex justify-end bg-gray-300'>
      <APIProvider 
        apiKey={GOOGLE_API_KEY} 
        onLoad={() => {
          console.log('Maps API has loaded.')
        }}
      >
        <Map
          style={{width: '80vw', height: '50vh'}}
          defaultCenter={locations[0].location || {lat: 34.0549, lng: -118.2426}}
          defaultZoom={11}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {locations.map((address, index) => <AdvancedMarker key={index} position={address.location} />)}
        </Map>
      </APIProvider>
    </div>
  )
};
