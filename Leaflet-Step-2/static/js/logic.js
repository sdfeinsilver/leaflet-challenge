//Step 2 - Add Layers

//Create Tile layers
var grayMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}); 

var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
}); 

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
}); 

// Create initial map object, insert into "mapid" html id in div tag, created layer attribute
var myMap = L.map("mapid", {
    center: [32.7767, -96.7970],
    zoom: 5,
    layers: [grayMap, satelliteMap, outdoorsMap]
});

// Add grayMap tile layer to map
grayMap.addTo(myMap);

// Create layers for different datasets (earthquakes and tectonic plates)
let tectonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

// Define the basemaps object
let baseMaps = {
    Satellite: satelliteMap,
    GrayMap: grayMap,
    OutdoorsMap: outdoorsMap
};











// // Store query url that references earthquake info in variable
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Grab the GeoJSON data
// d3.json(link, function(data) {
//     // Create a function that will create the features of our map
//     function createEarthquakeFeatures(feature) {
//         return {
//             // Function assignColor will assign color of markers based on depth of quake
//             fillColor: assignColor(feature.geometry.coordinates[2]),
//             color: "black",
//             // Function assignRadius will multiply magnitude of radius to make marker more readable
//             radius: assignRadius(feature.properties.mag),
//             stroke: true,
//             weight: 1.0,
//             opacity: 1,
//             fillOpacity: 1,
//         };

//         // Create Function assignColor
//         function assignColor(depth) {
//             if (depth > 100) {
//                 return "Black";
//             }
//             else if (depth > 75) {
//                 return "Brown";
//             }
//             else if (depth > 50) {
//                 return "Crimson";
//             }
//             else if (depth > 25) {
//                 return "Chocolate";
//             }
//             else if (depth > 15) {
//                 return "Coral";
//             }
//             else if (depth > 10) {
//                 return "BurlyWood";
//             }
//             else if (depth > 5) {
//                 return "Beige";
//             }
//             else {
//                 return "AliceBlue";
//             }
//         };

//         // Create Function assignRadius
//         function assignRadius(magnitude) {
//             return magnitude *5;
//         };
//     };

//     // Add GeoJSON layer to map
//     L.geoJson(data, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng);
//         },

//         // Set style of circle marker based on createEarthquakeFeatures function
//         style: createEarthquakeFeatures,

//         // Create popup for each marker with necessary info
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(
//                 "Quake Magnigude: " + feature.properties.mag +
//                 "<br>Depth: " + feature.geometry.coordinates[2] +
//                 "<br>Location: " + feature.properties.place
//             );
//         }
//     }).addTo(myMap);

// // Create Legend
// let legend = L.control({ position: "bottomleft" });

// legend.onAdd = function(map) {
// let div = L.DomUtil.create("div", "legend");
// div.innerHTML += "<h4>Earthquake Depth Legend</h4>";
// div.innerHTML += '<i style="background: AliceBlue"></i><span><5</span><br>';
// div.innerHTML += '<i style="background: Beige"></i><span>>5</span><br>';
// div.innerHTML += '<i style="background: BurlyWood"></i><span>>10</span><br>';
// div.innerHTML += '<i style="background: Coral"></i><span>>15</span><br>';
// div.innerHTML += '<i style="background: Chocolate"></i><span>>25</span><br>';
// div.innerHTML += '<i style="background: Crimson"></i><span>>50</span><br>';
// div.innerHTML += '<i style="background: Brown"></i><span>>75</span><br>';
// div.innerHTML += '<i style="background: Black"></i><span>>100</span><br>';


// return div;
// };

// legend.addTo(myMap);
// });