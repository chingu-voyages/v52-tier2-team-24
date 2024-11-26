export const getFormattedAddress = (address) => {
  //I want to do a little more research on how to clean this up but we are in the right format here, definitely need to do much more test with peculiar addresses
  const withoutNumber = address.name.replace(/^\d+\s+/, "");

  const street_name = withoutNumber
    .replace(/^(N|S|E|W|NE|NW|SE|SW)\s+/i, "")
    .replace(/\b(?:Dr|Pl|St|Rd|Ave|Blvd|Ct|Ln|Way)\b.*$/i, "")
    .trim()
    .toUpperCase();
  const street_number = address.formatted_address.match(/^\d+/)?.[0] || null;
  const zip_code =
    address.formatted_address.match(/\b\d{5}(?:-\d{4})?\b/)?.[0] || null;
  return {
    street_number,
    street_name,
    zip_code,
  };
};
