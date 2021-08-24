function createMap(layers) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: "pk.eyJ1Ijoic3BpY3V6emkxMCIsImEiOiJja3F2aHVibmkwZXAxMzFwYWR5ZTZxdXY3In0.PUDqObIlPwooM7Ld80ZNVg"
    });
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: "pk.eyJ1Ijoic3BpY3V6emkxMCIsImEiOiJja3F2aHVibmkwZXAxMzFwYWR5ZTZxdXY3In0.PUDqObIlPwooM7Ld80ZNVg"
    });
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: "pk.eyJ1Ijoic3BpY3V6emkxMCIsImEiOiJja3F2aHVibmkwZXAxMzFwYWR5ZTZxdXY3In0.PUDqObIlPwooM7Ld80ZNVg"
    });
    var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "outdoors-v11",
        accessToken: "pk.eyJ1Ijoic3BpY3V6emkxMCIsImEiOiJja3F2aHVibmkwZXAxMzFwYWR5ZTZxdXY3In0.PUDqObIlPwooM7Ld80ZNVg"
    });

    // Create the map with our layers
    var myMap = L.map("map-id", {
        center: [39.82, -98.57],
        zoom: 5,
        layers: [
            lightmap,
            layers.Earthquakes
        ]
    });

    var baseMaps = {
        'Light': lightmap,
        'Dark': darkmap,
        'Streets': streetmap,
        'Outdoors': outdoormap

    }

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
    L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(myMap);


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

var statePoints = {};
var earthquakeScores = {};
var tornadoScores = {};
var fireScores = {};
var hurricaneScores = {};
var floodScores = {};
var iceScores = {};
var landslideScores = {};
var tsunamiScores = {};
var earthquakeWeight = parseInt(d3.select("#earthquake-select").property("value"));
var tornadoWeight = parseInt(d3.select('#tornado-select').property("value"));
var fireWeight = parseInt(d3.select('#fire-select').property("value"));
var hurricaneWeight = parseInt(d3.select('#hurricane-select').property("value"));
var floodWeight = parseInt(d3.select('#flood-select').property("value"));
var iceWeight = parseInt(d3.select('#ice-select').property("value"));
var landslideWeight = parseInt(d3.select('#landslide-select').property("value"));
var tsunamiWeight = parseInt(d3.select('#tsunami-select').property("value"));
function stateScores(disasters) {
    d3.selectAll('td').remove();
    var allStates = [];
    disasters.forEach(report => allStates.push(report.state));
    var states = [...new Set(allStates)];

    for (var x = 0; x < states.length; x++) {
        statePoints[states[x]] = 0;
        earthquakeScores[states[x]] = 0;
        tornadoScores[states[x]] = 0;
        fireScores[states[x]] = 0;
        hurricaneScores[states[x]] = 0;
        floodScores[states[x]] = 0;
        iceScores[states[x]] = 0;
        landslideScores[states[x]] = 0;
        tsunamiScores[states[x]] = 0;
    };

    for (var x = 0; x < disasters.length; x++) {
        if (disasters[x].type === "Earthquake") {
            statePoints[disasters[x].state] += earthquakeWeight
            earthquakeScores[disasters[x].state] += earthquakeWeight
        }
        else if (disasters[x].type === "Tornado") {
            statePoints[disasters[x].state] += tornadoWeight
            tornadoScores[disasters[x].state] += tornadoWeight
        }
        else if (disasters[x].type === "Fire") {
            statePoints[disasters[x].state] += fireWeight
            fireScores[disasters[x].state] += fireWeight
        }
        else if (disasters[x].type === "Hurricane") {
            statePoints[disasters[x].state] += hurricaneWeight
            hurricaneScores[disasters[x].state] += hurricaneWeight
        }
        else if (disasters[x].type === "Flood") {
            statePoints[disasters[x].state] += floodWeight
            floodScores[disasters[x].state] += floodWeight
        }
        else if (disasters[x].type === "Severe Ice Storm") {
            statePoints[disasters[x].state] += iceWeight
            iceScores[disasters[x].state] += iceWeight
        }
        else if (disasters[x].type === "Mud/Landslide") {
            statePoints[disasters[x].state] += landslideWeight
            landslideScores[disasters[x].state] += landslideWeight
        }
        else if (disasters[x].type === "Tsunami") {
            statePoints[disasters[x].state] += tsunamiWeight
            tsunamiScores[disasters[x].state] += tsunamiWeight
        }
    };

    var entries = Object.entries(statePoints);
    var newEntries = []
    for (entry in entries) {
        for (area in area_entries) {
            if (entries[entry][0] === area_entries[area][0]) {
                state = entries[entry][0]
                newValue = (entries[entry][1]/area_entries[area][1]).toFixed(2)
                newEntries.push([state,newValue])
            }
        }
    }
    console.log(newEntries)
    var statePointsSorted = newEntries.sort((a, b) => b[1] - a[1])
    console.log(statePointsSorted)

    var tableBody = d3.select("tbody");
    for (var i = 0; i < statePointsSorted.length; i++) {
        var row = tableBody.append('tr').attr("id", `${statePointsSorted[i][0]}`);
        row.append('td').classed("state-row", true).text(i + 1);
        row.append('td').classed("state-row", true).text(statePointsSorted[i][0]);
        row.append('td').classed("state-row", true).text(statePointsSorted[i][1]);
        if (i > 14) {
            row.classed('trhide', true)
        }
    };
    $('.trhide').hide();
};



function runData(disasters) {
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

    var earthquakeMarker = L.AwesomeMarkers.icon({
        icon: 'industry',
        markerColor: "darkred"
    });
    var fireMarker = L.AwesomeMarkers.icon({
        icon: 'fire',
        markerColor: "red"
    });
    var tornadoMarker = L.AwesomeMarkers.icon({
        icon: 'check-double',
        markerColor: "gray"
    });
    var hurricaneMarker = L.AwesomeMarkers.icon({
        icon: 'fan',
        markerColor: "cadetblue"
    });
    var floodMarker = L.AwesomeMarkers.icon({
        icon: 'water',
        markerColor: "blue"
    });
    var iceMarker = L.AwesomeMarkers.icon({
        icon: 'icicles',
        markerColor: "darkblue"
    });
    var landslideMarker = L.AwesomeMarkers.icon({
        icon: 'mountain',
        markerColor: "black"
    });
    var tsunamiMarker = L.AwesomeMarkers.icon({
        icon: 'bacon',
        markerColor: "darkpurple"
    });

    for (var x = 0; x < disasters.length; x++) {
        if (disasters[x].type === "Fire") {
            disasterType = "Fires"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: fireMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Tornado") {
            disasterType = "Tornadoes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: tornadoMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Earthquake") {
            disasterType = "Earthquakes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: earthquakeMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Hurricane") {
            disasterType = "Hurricanes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: hurricaneMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Flood") {
            disasterType = "Floods"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: floodMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Severe Ice Storm") {
            disasterType = "Ice"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: iceMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Mud/Landslide") {
            disasterType = "Landslides"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: landslideMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Tsunami") {
            disasterType = "Tsunamis"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon], {icon: tsunamiMarker})
                .bindPopup("<h3>Location: " + disasters[x].county + ", " + disasters[x].state +
                    "<h3><h3>Date: " + disasters[x].date + "<h3><h3>Title: " + disasters[x].title + "</h3>");
            newMarker.addTo(layers[disasterType]);
        }
        else {
            disasterType = "Other"
        }

    }
    console.log(layers)
    createMap(layers)
    stateScores(disasters)
};

const url = "/api/disasters";
d3.json(url).then(runData)

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
        delay: (el, i) => 100 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 100,
        duration: 400000,
        easing: "easeOutExpo",
        delay: 10
    });

var updateButton = d3.select("#update-button");
updateButton.on("click", function () { d3.json(url).then(statePoints) });
$("#show-hide").click(function () { $(".trhide").toggle() });

var sq_mi = { "AK": 665384.0/1000, "TX": 268596.5/1000, "CA": 163694.7/1000, "MT": 147039.7/1000, "NM": 121590.3/1000, "AZ": 113990.3/1000, "NV": 110571.8/1000, "CO": 104093.7/1000, "OR": 98378.5/1000, "WY": 97813.0/1000, "MI": 96713.5/1000, "MN": 86935.8/1000, "UT": 84896.9/1000, "ID": 83569.0/1000, "KS": 82278.4/1000, "NE": 77347.8/1000, "SD": 77115.7/1000, "WA": 71298.0/1000, "ND": 70698.3/1000, "OK": 69898.9/1000, "MO": 69707.0/1000, "FL": 65757.7/1000, "WI": 65496.4/1000, "GA": 59425.2/1000, "IL": 57913.6/1000, "IA": 56272.8/1000, "NY": 54555.0/1000, "NC": 53819.2/1000, "AR": 53178.6/1000, "AL": 52420.1/1000, "LA": 52378.1/1000, "MS": 48431.8/1000, "PA": 46054.4/1000, "OH": 44825.6/1000, "VA": 42774.9/1000, "TN": 42144.3/1000, "KY": 40407.8/1000, "IN": 36419.6/1000, "ME": 35379.7/1000, "SC": 32020.5/1000, "WV": 24230.0/1000, "MD": 12405.9/1000, "HI": 10931.7/1000, "MA": 10554.4/1000, "VT": 9616.4/1000, "NH": 9349.2/1000, "NJ": 8722.6/1000, "CT": 5543.4/1000, "DE": 2488.7/1000, "RI": 1544.9/1000 };
var area_entries = Object.entries(sq_mi)
console.log(area_entries);

$(document).on("click", ".state-row", function(){
    var stateID = $(this).parent().attr("id");
    $("#state-data").text(`${stateID}`)
    $("#state-area").html(`<b>Area (Sq. Miles):</b> ${sq_mi[`${stateID}`]*1000}`)
    $("#state-score").html(`<b>${stateID} Disaster Score:</b> ${statePoints[`${stateID}`]}`)
    var stateEarthquakeScore = earthquakeScores[`${stateID}`]
    var earthquakeNum = stateEarthquakeScore/earthquakeWeight
    $("#earthquake-num").html(`# of Earthquake Events: ${earthquakeNum}
                                <br>Earthquake Weight: ${earthquakeWeight}
                                <br><b><em>Earthquake Score:</em></b> ${stateEarthquakeScore}`)
    var stateTornadoScore = tornadoScores[`${stateID}`]
    var tornadoNum = stateTornadoScore/tornadoWeight
    $("#tornado-num").html(`# of Tornado Events: ${tornadoNum}
                                <br>Tornado Weight: ${tornadoWeight}
                                <br><b><em>Tornado Score:</em></b> ${stateTornadoScore}`)
    var stateFireScore = fireScores[`${stateID}`]
    var fireNum = stateFireScore/fireWeight
    $("#fire-num").html(`# of Wildfire Events: ${fireNum}
                                <br>Wildfire Weight: ${fireWeight}
                                <br><b><em>Wildfire Score:</em></b> ${stateFireScore}`)
    var stateHurricaneScore = hurricaneScores[`${stateID}`]
    var hurricaneNum = stateHurricaneScore/hurricaneWeight
    $("#hurricane-num").html(`# of Hurricane Events: ${hurricaneNum}
                                <br>Hurricane Weight: ${hurricaneWeight}
                                <br><b><em>Hurricane Score:</em></b> ${stateHurricaneScore}`)
    var stateFloodScore = floodScores[`${stateID}`]
    var floodNum = stateFloodScore/floodWeight
    $("#flood-num").html(`# of Flood Events: ${floodNum}
                                <br>Flood Weight: ${floodWeight}
                                <br><b><em>Flood Score:</em></b> ${stateFloodScore}`)
    var stateIceScore = iceScores[`${stateID}`]
    var iceNum = stateIceScore/iceWeight
    $("#ice-num").html(`# of Severe Ice Storm Events: ${iceNum}
                                <br>Severe Ice Storm Weight: ${iceWeight}
                                <br><b><em>Severe Ice Storm Score:</em></b> ${stateIceScore}`)
    var stateLandslideScore = landslideScores[`${stateID}`]
    var landslideNum = stateLandslideScore/landslideWeight
    $("#landslide-num").html(`# of Mud/Landslide Events: ${landslideNum}
                                <br>Mud/Landslide Weight: ${landslideWeight}
                                <br><b><em>Mud/Landslide Score:</em></b> ${stateLandslideScore}`)
    var stateTsunamiScore = tsunamiScores[`${stateID}`]
    var tsunamiNum = stateTsunamiScore/tsunamiWeight
    $("#tsunami-num").html(`# of Tsunami Events: ${tsunamiNum}
                                <br>Tsunami Weight: ${tsunamiWeight}
                                <br><b><em>Tsunami Score:</em></b> ${stateTsunamiScore}`)
});