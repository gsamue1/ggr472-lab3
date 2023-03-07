mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NhbXVlbC11b2Z0IiwiYSI6ImNsY3lieDA3MjJjNnAzcGs2NmxoMndpeGIifQ.PKKRKM7-HRYK7TuPgztVzg'; //default public map token from Mapbox account 

//Activating Base Map
const map = new mapboxgl.Map({
    container: 'map', // div container ID for map
    style: 'mapbox://styles/gsamuel-uoft/cle4l4pr5001t01ljheblcl08', // Link to mapbox style URL
    center: [-79.390, 43.663], // starting position [longitude, latitude]
    zoom: 11.29, // starting zoom
});

//Adding Layers to map when map loads
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
    // Add Map Source for GeoJSON of Outdoor Ice Rinks (ODRs) in Toronto 
    // Data Sourced from City of Toronto Open Data and uploaded to personal mapbox to build vector file
    map.addSource('odr', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/gsamue1/ggr472-lab3/main/Outdoor%20Ice%20Rinks%20-%204326.geojson' //Raw Content Github Link
    });

    // Adding Outdoor Rink Layer to existing basemap with simple styling
    map.addLayer({
        'id': 'outdoor-rinks-to', // unique id develoepd for layer
        'type': 'circle',
        'source': 'odr', //source id that matches addSource function
        'paint': {
            'circle-stroke-width': 2, //outline width
            'circle-color': '#627BC1', // point colour
            'circle-stroke-color': 'black' //outline colour
        },
    });
 

//INDOOR RINKS LAYER 
    // Add Map Source for GeoJSON of Indoor Ice Rinks (ODRs) in Toronto 
    // Data Sourced from City of Toronto Open Data -- downloaded directly to repository as geojson
    map.addSource('idr', {
        'type': 'geojson',
        // Use a URL for the value for the `data` property.
        'data': 'https://raw.githubusercontent.com/gsamue1/ggr472-lab3/main/indoor-ice-rinks-data.geojson' //Raw content Github Link -- going forward will develop more comprehensible link for data in website development
    });

    //Adding Indoor Rink GeoJSON geometry to existing basemap with simple styling
    map.addLayer({
        'id': 'indoor-rinks-to', // unique id develoepd for layer
        'type': 'circle',
        'source': 'idr', //source id that matches addSource function
        'paint': {
            'circle-radius': 4, // point size
            'circle-stroke-width': 2, //outline width
            'circle-color': [
                'match', // Match expression 
                ['get', 'Ice Pad Size Category'], // GET expression retrieves property value from 'capacity' data field
                'NHL(200X85)', '#f35c4b', // 
                'Regular(185X85)', '#eded4f', //
                'Undersized(less than 185X85)', '#e0890f',
                '#918e8d'
            ],
            'circle-stroke-color': 'black' //outline colour
        },
    });

})

//Adding Navigation Controls -- Zoom and Spin
map.addControl(new mapboxgl.NavigationControl());

//Adding Fullscreen Capacity 
map.addControl(new mapboxgl.FullscreenControl());

//Adding Geocoding Capacity -- People Can Search their Address
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca" 
});

//Positioning Geocoder on Page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

//Setting up Return Button -- Return Zoom to Original Extent
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.390, 43.663], //Coordinates Centering Page
        zoom: 11.29,
        essential: true
    });
});

// CONFIGURING POP UPS 
// Code Sourced: Mapbox https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/ 
    //INDOOR RINKS
    //Creating Pop-Up Variable 
    const popup_idr = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
        
        map.on('mouseenter', 'indoor-rinks-to', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        // Copying Coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Public_Name;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup_idr.setLngLat(coordinates).setHTML(description).addTo(map);
        });
        
        map.on('mouseleave', 'indoor-rinks-to', () => {
        map.getCanvas().style.cursor = '';
        popup_idr.remove();
        });

    //OUTDOOR RINKS
    //Creating Pop Up Variable
    const popup_odr = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
        
        map.on('mouseenter', 'outdoor-rinks-to', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        // Copying Coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Public_Name;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup_odr.setLngLat(coordinates).setHTML(description).addTo(map);
        });
        
        map.on('mouseleave', 'outdoor-rinks-to', () => {
        map.getCanvas().style.cursor = '';
        popup_odr.remove();
        });

    // GREEN SPACE
    //Elected not to use pop-ups for green space because of the sheer volume, number of unnamed spaces, inability to view parks from a high level and to prevent distraction away for ice rinks as core focus of the map. 

//////////////////// NEXT STEPS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Addition of address and lighting (outdoor rinks) information in pop-ups
// Filtering Capacity for Indoor or Outdoor Rinks
// Test Ant trail between geocoded location and rinks