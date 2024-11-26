export const getFormattedAddress = (address) => {
  const streetNumber = address.formatted_address.match(/^\d+/)?.[0] || null;
  const zipCode = address.formatted_address.match(/\b\d{5}(?:-\d{4})?\b/)?.[0] || null; 
  const name = address.name || null;

  console.log("OBJ", { streetNumber, name, zipCode });
};