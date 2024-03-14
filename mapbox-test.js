require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoCodingClient = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN});
async function geocoder(location){
    try{
 let response = await geoCodingClient
.forwardGeocode({
    query: location,
    limit: 1
})
.send();

console.log(response.body.features[0].geometry.coordinates);
    } catch(err){
        console.log(err.message);
    }
}
geocoder('Mountainview, California');