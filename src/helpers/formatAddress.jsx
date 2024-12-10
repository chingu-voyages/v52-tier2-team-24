export const formatStreet = (input) => {
  if (!input) {
    console.error("Invalid input:", input);
    return null;
  }
  return input
    .replace(/^\d+\s?/, "")
    .replace(/^(N|S|E|W)\s/, "")
    .replace(/\s(Dr|St|Ave|Rd|Blvd|Ln|Ct)$/g, "")
    .trim()
    .toUpperCase();
};

export const getAddressComponents = (address) => {
  let streetNumber = "";
  let postcode = "";

  address.forEach((component) => {
    const componentType = component.types[0];
    switch (componentType) {
      case "street_number":
        streetNumber = component.long_name;
        break;
      case "postal_code":
        postcode = component.long_name;
        break;
      default:
        break;
    }
  });

  return { streetNumber, postcode };
};

export const formatAddress = (address) => address.replace(/,?\s?CA/, '').replace(/,?\s?USA/, '');
