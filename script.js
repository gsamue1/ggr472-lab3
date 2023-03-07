mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NhbXVlbC11b2Z0IiwiYSI6ImNsY3lieDA3MjJjNnAzcGs2NmxoMndpeGIifQ.PKKRKM7-HRYK7TuPgztVzg'; //default public map token from Mapbox account 

const map = new mapboxgl.Map({
    container: 'map', // div container ID for map
    style: 'mapbox://styles/gsamuel-uoft/cle4l4pr5001t01ljheblcl08', // Link to mapbox style URL
    center: [-79.390, 43.663], // starting position [longitude, latitude]
    zoom: 11.29, // starting zoom
});

// //Adding Navigation Controls -- Zoom and Spin
// map.addControl(new mapboxgl.NavigationControl());

// //Adding Fullscreen Capacity 
// map.addControl(new mapboxgl.FullscreenControl());

// //Adding Geocoding Capacity -- People Can Search their Address
// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     countries: "ca" 
// });

// //Position Geocoder on page
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// //Setting up Return Button
// document.getElementById('returnbutton').addEventListener('click', () => {
//     map.flyTo({
//         center: [-79.390, 43.663], //Coordinates Centering Page
//         zoom: 11.29,
//         essential: true
//     });
// });

map.on('load', () => {

//GREEN SPACE LAYER -- Perfect Locations for Snowball Fights/Sledding
    // Add Map Source for Vector Tileset of Green Space in Toronto 
    // Data Sourced from City of Toronto Open Data and uploaded to personal mapbox to build vector file
    map.addSource('green-space', {
        'type': 'vector',
        'url': 'mapbox://gsamuel-uoft.1snr0b2n' //Tileset id from Mapbox
    });

    // Adding Green Space Layer to existing basemap with simple styling
    map.addLayer({
        'id': 'green-space-to', // unique id developed for layer
        'type': 'fill', //polygon
        'source': 'green-space', //source id that matches addSource function
        'paint': {
            'fill-color': 'green',
            'fill-opacity': 0.4,
            'fill-outline-color': 'green'
        },
        'source-layer': 'green_space-46qnsm' //Layer ID from Mapbox
    });

//OUTDOOR RINKS LAYER
    // Add Map Source for Vector Tileset of Outdoor Ice Rinks (ODRs) in Toronto 
    // Data Sourced from City of Toronto Open Data and uploaded to personal mapbox to build vector file
    map.addSource('odr', {
        'type': 'vector',
        'url': 'mapbox://gsamuel-uoft.14j01kfq' //Tileset id from Mapbox
    });

    // Adding Outdoor Rink Layer to existing basemap with simple styling
    map.addLayer({
        'id': 'outdoor-rxinks-to', // unique id develoepd for layer
        'type': 'circle',
        'source': 'odr', //source id that matches addSource function
        'paint': {
            'circle-stroke-width': 2, //outline width
            'circle-color': '#627BC1', // point colour
            'circle-stroke-color': 'black' //outline colour
        },
        'source-layer': 'Outdoor_Ice_Rinks_-_4326-dz0kt0' //Layer ID from Mapbox page
    });
 

//INDOOR RINKS LAYER 
    // Add Map Source for GeoJSON of Indoor Ice Rinks (ODRs) in Toronto 
    // Data Sourced from City of Toronto Open Data -- downloaded directly to repository as geojson
    map.addSource('idr', {
        'type': 'geojson',
        // Use a URL for the value for the `data` property.
        'data': 'https://raw.githubusercontent.com/gsamue1/ggr472-lab2/main/indoor-ice-rinks-data.geojson' //Raw content Github Link -- going forward will develop more comprehensible link for data in website development
    });

    // //Adding Indoor Rink GeoJSON geometry to existing basemap with simple styling
    map.addLayer({
        'id': 'indoor-rinks-to', // unique id develoepd for layer
        'type': 'circle',
        'source': 'idr', //source id that matches addSource function
        'paint': {
            'circle-radius': 4, // point size
            'circle-stroke-width': 2, //outline width
            'circle-color': 'red',
            'circle-stroke-color': 'black' //outline colour
        },
    });

})

// UNUSED CODE -- CONFIGURING POP UPS GOING FORWARD
//When a click event occurs on a feature in the places layer, open a popup at the
//location of the feature, with description HTML from its properties.
map.on('click', 'indoor-rinks-to', (e) => {
    console.log(e);   //e is the event info triggered and is passed to the function as a parameter (e)
     //Explore console output using Google DevTools
    let provname = e.features[0].properties.Public_Name;
    console.log(Public_Name);
 });

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'indoor-rinks-to', () => {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'indoor-rinks-to', () => {
map.getCanvas().style.cursor = '';
});

// //Pop Up for Outdoor Rinks
// map.on('click', 'indoor-rinks-to', (e) => {
// new mapboxgl.Popup() //Declare new popup object on each click
//     .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
//     .setHTML("<b>Rink Name:</b> " + e.features[0].properties.Public_Name + "<br>" +
//         "Rink Type: door") //Use click event properties to write text for popup
//     .addTo(map); //Show popup on map
// });
