import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { formatStreet } from "../../helpers/formatAddress";

import { searchAddress } from "../../utils/axios-data";

const GoogleAutoComplete = (setAddress) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

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

    const handlePlaceChanged = async () => {
      const selectedPlace = placeAutocomplete.getPlace();
      console.log("Sel place", selectedPlace);
      const stName = formatStreet(selectedPlace.name);
      let streetNumber = "";
      let postcode = "";

      for (const component of selectedPlace.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number":
            streetNumber = `${component.long_name}${streetNumber}`;
            break;
          case "postal_code":
            postcode = `${component.long_name}${postcode}`;
            break;
          default:
            break;
        }
      }

      const validationAddress = {
        house_number: streetNumber,
        street_name: stName,
        zip_code: postcode,
      };

      try {
        const results = await searchAddress(validationAddress);
        if (results) {
          setStatus(true);
          setMessage("Address Validated");
        } else {
          setStatus(false);
          setMessage("Address Not Found in Dataset");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setStatus(false);
        setMessage("Address Not Found in Dataset");
      }
    };
    placeAutocomplete.addListener("place_changed", handlePlaceChanged);

    return () => placeAutocomplete.unbindAll();
  }, [placeAutocomplete]);

  const handleInputChange = () => {
    setMessage("");
    setStatus(null);
  };

  return (
    <div>
      <input
        onInput={handleInputChange}
        className="w-full pl-2 border mb-4  py-2 rounded-lg border-slate-300  focus:outline-slate-400 "
        ref={inputRef}
        placeholder="Enter Your Address"
      />
      {message && (
        <p className={`mt-2 ${status ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default GoogleAutoComplete;
