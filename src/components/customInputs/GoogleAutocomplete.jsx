import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  formatStreet,
  getAddressComponents,
} from "../../helpers/formatAddress";

import { searchAddress } from "../../utils/axios-data";

import PropTypes from "prop-types";

const GoogleAutoComplete = ({
  setValue,
  errors,
  setAddressStatus,
  setAddressMessage,
}) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);

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

      const { streetNumber, postcode } = getAddressComponents(
        selectedPlace.address_components
      );

      const validationAddress = {
        house_number: streetNumber,
        street_name: formatStreet(selectedPlace.name),
        zip_code: postcode,
      };

      try {
        setAddressStatus(true);
        const results = await searchAddress(validationAddress);
        if (results) {
          setAddressStatus(false);
          setAddressMessage(true);

          setValue("address", selectedPlace.formatted_address);
        } else {
          setAddressStatus(false);
          setAddressMessage(false);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setAddressStatus(false);
        setAddressMessage(error.message);
      }
    };
    placeAutocomplete.addListener("place_changed", handlePlaceChanged);

    return () => placeAutocomplete.unbindAll();
  }, [placeAutocomplete, setValue, setAddressStatus, setAddressMessage]);

  const handleInputChange = () => {
    setAddressMessage(null);
    setAddressStatus(null);
  };

  return (
    <div>
      <input
        onInput={handleInputChange}
        className={`w-full  border mb-4   rounded-lg pl-2 py-2 focus:outline-slate-400 ${
          errors ? "border-red-500 placeholder-red-500" : "border-slate-300"
        }`}
        ref={inputRef}
        placeholder="Enter Your Address"
      />
    </div>
  );
};

GoogleAutoComplete.propTypes = {
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
  setAddressStatus: PropTypes.func.isRequired,
  setAddressMessage: PropTypes.func.isRequired,
};
export default GoogleAutoComplete;
