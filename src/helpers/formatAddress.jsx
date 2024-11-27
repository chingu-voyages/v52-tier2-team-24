//can somehow tweak api or use something different to return address in a different way we could elimate alot of this, this could also potentially cause errors
export const getFormattedAddress = (address) => {
  const withoutNumber = address.name.replace(/^\d+\s+/, "");
  const street_name = withoutNumber
    .replace(/^(N|S|E|W|NE|NW|SE|SW)\s+/i, "")
    .replace(/\b(?:Dr|Pl|St|Rd|Ave|Blvd|Ct|Ln|Way)\b.*$/i, "")
    .trim()
    .toUpperCase();
  const house_number = address.formatted_address.match(/^\d+/)?.[0] || null;
  const zip_code =
    address.formatted_address.match(/CA\s(\d{5})/)?.[1] || null;
  return {
    house_number,
    street_name,
    zip_code,
  };
};
