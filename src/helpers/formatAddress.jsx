export const getFormattedAddress = (address) => {


  const withoutNumber = address.name.replace(/^\d+\s+/, "");
  const directionRegex = /^(N|S|E|W|NE|NW|SE|SW)\s+/i;

  const street_name = withoutNumber.replace(directionRegex, "").trim().toUpperCase();
  const street_number = address.formatted_address.match(/^\d+/)?.[0] || null;
  const zip = address.formatted_address.match(/\b\d{5}(?:-\d{4})?\b/)?.[0] || null; 
  const number_dir_name = address.name || null;
  const street_direction_name = address.name.replace(/^\d+\s*/, "").toUpperCase() || null;


  // console.log("OBJ", { street_number, street_direction_name, zip, street_name, number_dir_name });
  return {
    street_number,
    street_name,
    zip
  }
};