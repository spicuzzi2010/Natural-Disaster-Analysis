function createMap(layers) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: "pk.eyJ1Ijoic3BpY3V6emkxMCIsImEiOiJja3F2aHVibmkwZXAxMzFwYWR5ZTZxdXY3In0.PUDqObIlPwooM7Ld80ZNVg"
    });

    // Create the map with our layers
    var myMap = L.map("map-id", {
        center: [39.82, -98.57],
        zoom: 5,
        layers: [
            layers.Earthquakes
        ]
    });

    // Add our 'lightmap' tile layer to the map
    lightmap.addTo(myMap);

    // Create an overlays object to add to the layer control
    var overlays = {
        "Earthquakes": layers.Earthquakes,
        "Tornadoes": layers.Tornadoes,
        "Fires": layers.Fires,
        "Hurricanes": layers.Hurricanes,
        "Floods": layers.Floods,
        "Severe Ice Storms": layers.Ice,
        "Mud/Landslides": layers.Landslides,
        "Tsunamis": layers.Tsunamis
    };

    // Create a control for our layers, add our overlay layers to it
    L.control.layers(null, overlays).addTo(myMap);


    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };

    // Add the info legend to the map
    info.addTo(myMap);

};

function statePoints(disasters) {
    var disasterType;
    var statePoints = {};
    var allStates = [];
    disasters.forEach(report => allStates.push(report.state));
    var states = [...new Set(allStates)];
    console.log(states)

    for (var x=0; x < states.length; x++) {
        statePoints[states[x]] = 0;
    };
    for (var x=0; x < disasters.length; x++) {
        statePoints[disasters[x].state]++
    }
    entries = Object.entries(statePoints);
    statePointsSorted = entries.sort((a,b) => b[1] - a[1])
    console.log(statePointsSorted)

    var tableBody = d3.select("tbody");
    //d3.selectAll('tr').remove();
    //for (var [key, value] of Object.entries(statePoints)) {
    for (var i=0; i < statePointsSorted.length; i++) {
        var row = tableBody.append('tr');
        row.append('td').text(statePointsSorted[i][0]);
        row.append('td').text(statePointsSorted[i][1]);
    };
};

function createMarkers(disasters) {
    var disasterType;
    var layers = {
        Earthquakes: new L.LayerGroup(),
        Tornadoes: new L.LayerGroup(),
        Fires: new L.LayerGroup(),
        Hurricanes: new L.LayerGroup(),
        Floods: new L.LayerGroup(),
        Ice: new L.LayerGroup(),
        Landslides: new L.LayerGroup(),
        Tsunamis: new L.LayerGroup()
    };

    for (var x=0; x < disasters.length; x++) {
        if (disasters[x].type === "Fire") {
            disasterType = "Fires"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Tornado") {
            disasterType = "Tornadoes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Earthquake") {
            disasterType = "Earthquakes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Hurricane") {
            disasterType = "Hurricanes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Flood") {
            disasterType = "Floods"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Severe Ice Storm") {
            disasterType = "Ice"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Mud/Landslide") {
            disasterType = "Landslides"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Tsunami") {
            disasterType = "Tsunamis"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else {
            disasterType = "Other"
        }

    }
    console.log(layers)
    createMap(layers)
};

const url = "/api/disasters"
d3.json(url).then(createMarkers);
d3.json(url).then(statePoints);

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml3 .letter',
        opacity: [0, 4],
        easing:

            "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 500 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 100,
        duration: 400000,
        easing: "easeOutExpo",
        delay: 10
    });
