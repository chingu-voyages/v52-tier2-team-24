import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { useState } from "react";
// i forgot to gitignore the first one but i'm going to gen a new one for dep later
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export default function GoogleNew() {
  const [address, setAddress] = useState("");

  const handlePlaceChange = (e) => {
    const addressComponents = e.target.value?.addressComponents;

    const formattedAddress = e.target.value?.formattedAddress;

    console.log("Formatted=> ", formattedAddress);
    console.log("Components=> ", addressComponents);
    if (formattedAddress) setAddress(formattedAddress);
  };

  const type = "address";
  const position = { lat: 34.0549, lng: -118.2426 };
  const radius = 15000;

  return (
    <div>
      <APILoader
        apiKey={GOOGLE_API_KEY}
        solutionChannel="GMP_GCC_placepicker_v"
      />
{/* this custom comp is being style in app.css but having a hard time removing the original border this might requrie a custom input */}
      <PlacePicker
        className="address-input"
        locationBias={position}
        radius={radius}
        type={type}
        placeholder="Enter a place to see its address"
        strictBounds
        onPlaceChange={handlePlaceChange}
      />
      <div>
        <p>{address}</p>
      </div>
    </div>
  );
}
