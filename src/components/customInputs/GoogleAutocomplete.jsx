import { useRef, useEffect, useState } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getFormattedAddress } from "../../helpers/formatAddress";

import { searchAddress } from "../../utils/axios-data";

// need to gen new api for production and need to debounce to restict # of calls
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const PlaceAutocompleteClassic = () => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [number, setNumber] = useState("");
  const [zip, setZip] = useState("");
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
      fields: ["address_components", "name", "formatted_address"],
      bounds: cityLimits,
      strictBounds: true,
      types: ["address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const selectedPlace = placeAutocomplete.getPlace();
      let streetNumber = "";
      let streetName = ""
      let postcode = "";

      for (const component of selectedPlace.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number":
           streetNumber = `${component.long_name} ${streetNumber}`;
            break;
            case "route":
          streetName = component.short_name;
              break;
          case "postal_code":
            postcode = `${component.long_name}${postcode}`;
            break;
          default:
            break;
        }
      }

      console.log("Select PL", selectedPlace);
      console.log("Number", streetNumber)
      console.log("Number", streetName)
      console.log("Postal", postcode)
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
