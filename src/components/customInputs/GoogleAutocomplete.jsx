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

  //still need strict bounds this starts in LA but was difficult for me to figure out. the libraries use different terms or maybe are on different versions vs regular googleapi call
  const cityLimits = {
    north: 34.342452,
    south: 33.692558,
    east: -117.679592,
    west: -118.682393,
  };
//do we need more data then this from the autocomplete?
  const mockAddress = {
    street_number: "16907",
    street_name: "BASSETT",
    zip_code: "91406",
  };

//Used for testinging against mock addresses
  const testFunction = () => {
    searchAddress(mockAddress);
  };

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      bounds: cityLimits,
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const selectedPlace = placeAutocomplete.getPlace();
      console.log("Selected Place:", selectedPlace);
      const validAddress = getFormattedAddress(selectedPlace);
      console.log("Valid", validAddress);
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
