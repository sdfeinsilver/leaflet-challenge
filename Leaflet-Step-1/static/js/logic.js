// Create initial map object, insert into "mapid" html id in div tag
var myMap = L.map("mapid", {
    center: [32.7767, -96.7970],
    zoom: 5
});

// Add the tile layer (background map image) to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Store query url that references earthquake info in variable
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the GeoJSON data
d3.json(link, function(data) {
    // Create a function that will create the features of our map
    function createEarthquakeFeatures(feature) {
        return {
            // Function assignColor will assign color of markers based on depth of quake
            fillColor: assignColor(feature.geometry.coordinates[2]),
            color: "black",
            // Function assignRadius will multiply magnitude of radius to make marker more readable
            radius: assignRadius(feature.properties.mag),
            stroke: true,
            weight: 1.0,
            opacity: 1,
            fillOpacity: 1,
        };

        // Create Function assignColor
        function assignColor(depth) {
            if (depth > 90) {
                return "Black";
            }
            else if (depth > 75) {
                return "Brown";
            }
            else if (depth > 50) {
                return "Crimson";
            }
            else if (depth > 25) {
                return "Chocolate";
            }
            else if (depth > 15) {
                return "Coral";
            }
            else if (depth > 10) {
                return "BurlyWood";
            }
            else if (depth > 5) {
                return "Beige";
            }
            else {
                return "AliceBlue";
            }
        };

        // Create Function assignRadius
        function assignRadius(magnitude) {
            return magnitude *5;
        };
    };

    // Add GeoJSON layer to map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        // Set style of circle marker based on createEarthquakeFeatures function
        style: createEarthquakeFeatures,

        // Create popup for each marker with necessary info
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Quake Magnigude: " + feature.properties.mag +
                "<br>Depth: " + feature.geometry.coordinates[2] +
                "<br>Location: " + feature.properties.place
            );
        }
    }).addTo(myMap);

    // Create Legend
    let legend = L.control({
        position: "topright"
    });

    // Add Legend Details
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "Legend Info");
        let grades = [15, 40, 65, 90];
        let colors = ["Black", "Brown", "Blue", "Aquamarine", "AliceBlue"];

        // Loop through grade intervals and generate colored labels
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
            + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    // Add legend to map
    legend.addTo(myMap);
});