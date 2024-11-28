import { useEffect, useRef } from "react";

const GooglePlacesAutocomplete = () => {
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const postalRef = useRef(null);
  const localityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!window.google) {
        console.error("Google Maps JavaScript API library is not loaded.");
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        address1Ref.current,
        {
          componentRestrictions: { country: ["us", "ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        let address1 = "";
        let postcode = "";

        for (const component of place.address_components) {
          const componentType = component.types[0];

          switch (componentType) {
            case "street_number":
              address1 = `${component.long_name} ${address1}`;
              break;
            case "route":
              address1 += component.short_name;
              break;
            case "postal_code":
              postcode = `${component.long_name}${postcode}`;
              break;
            case "postal_code_suffix":
              postcode = `${postcode}-${component.long_name}`;
              break;
            case "locality":
              if (localityRef.current)
                localityRef.current.value = component.long_name;
              break;
            case "administrative_area_level_1":
              if (stateRef.current)
                stateRef.current.value = component.short_name;
              break;
            case "country":
              if (countryRef.current)
                countryRef.current.value = component.long_name;
              break;
            default:
              break;
          }
        }

        if (address1Ref.current) address1Ref.current.value = address1;
        if (postalRef.current) postalRef.current.value = postcode;
        if (address2Ref.current) address2Ref.current.focus();
      });
    };

    initializeAutocomplete();
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="ship-address">Address Line 1</label>
        <input
          type="text"
          id="ship-address"
          ref={address1Ref}
          placeholder="Enter your address"
        />
      </div>
      <div>
        <label htmlFor="address2">Address Line 2</label>
        <input
          type="text"
          id="address2"
          ref={address2Ref}
          placeholder="Apt, unit, etc."
        />
      </div>
      <div>
        <label htmlFor="postcode">Postal Code</label>
        <input
          type="text"
          id="postcode"
          ref={postalRef}
          placeholder="Postal code"
        />
      </div>
      <div>
        <label htmlFor="locality">City</label>
        <input type="text" id="locality" ref={localityRef} placeholder="City" />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input type="text" id="state" ref={stateRef} placeholder="State" />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          ref={countryRef}
          placeholder="Country"
        />
      </div>
    </form>
  );
};

export default GooglePlacesAutocomplete;
