import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  formatStreet,
  getAddressComponents,
} from "../../helpers/formatAddress";

import { searchAddress } from "../../utils/axios-data";

import PropTypes from "prop-types";

const GoogleAutoComplete = ({setValue, errors}) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["address_components", "name", "formatted_address"],
      bounds: {
        north: 34.342452,
        south: 33.692558,
        east: -117.679592,
        west: -118.682393,
      },
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

      const { streetNumber, postcode } = getAddressComponents(
        selectedPlace.address_components
      );

      const validationAddress = {
        house_number: streetNumber,
        street_name: formatStreet(selectedPlace.name),
        zip_code: postcode,
      };

      try {
        const results = await searchAddress(validationAddress);
        if (results) {
          setStatus(true);
          setMessage("Address Validated");
          setValue("address", selectedPlace.formatted_address);
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
  }, [placeAutocomplete, setValue]);

  const handleInputChange = () => {
    setMessage("");
    setStatus(null);
  };

  return (
    <div>
      <input
        onInput={handleInputChange}
        className={`w-full  border mb-4   rounded-lg pl-2 py-2 focus:outline-slate-400 ${
          errors
            ? "border-red-500 placeholder-red-500"
            : "border-slate-300"
        }`}
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

GoogleAutoComplete.propTypes = {
  setValue: PropTypes.func.isRequired,
};

export default GoogleAutoComplete;
