export async function getCoordinates(key, address) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`
  );
  const json = await res.json();
  const { lat, lng } = json.results[0].geometry.location;

  return { lat, lng };
}
