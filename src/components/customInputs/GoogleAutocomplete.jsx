import { useRef, useEffect, useState } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getFormattedAddress } from "../../helpers/formatAddress";

import { searchAddress } from "../../utils/axios-data";

// need to gen new api for production and need to debounce to restict # of calls
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const PlaceAutocompleteClassic = () => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  //need bounds to be better and strict
  const cityLimits = {
    north: 34.342452,
    south: 33.692558,
    east: -117.679592,
    west: -118.682393,
  };

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      // this is where i need to figure how to get mroe data, is there a places to see avail option for @vis.gl could not find much on site but alot of the google props were not working
      fields: ["geometry", "name", "formatted_address"],
      bounds: cityLimits,
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const selectedPlace = placeAutocomplete.getPlace();
      const validAddress = getFormattedAddress(selectedPlace);
      searchAddress(validAddress);
    });
  }, [placeAutocomplete]);

  return (
    <div>
      <input
        className="w-full pl-2 border mb-4  py-2 rounded-lg  focus:outline-slate-400 "
        ref={inputRef}
        placeholder="Enter Your Address"
      />
      {/* button is strictly for testing mock data */}
      {/* <button className="p-5 bg-green-500" onClick={testFunction}>
        {" "}
        Button
      </button> */}
    </div>
  );
};

const GoogleAutoComplete = () => (
  <APIProvider apiKey={GOOGLE_API_KEY}>
    <PlaceAutocompleteClassic />
  </APIProvider>
);

export default GoogleAutoComplete;
