let coordinates = {
    lat: undefined,
    lon: undefined
}
let message="";

let map = undefined;

async function requestCoordinates(){
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            if ((this.responseText) === '{}') {
                $('.find-location-btn').css({"border-color": "red", "border-radius": "5px"});
                $('#map-message').html("Invalid Location").css("color", "yellow")
            } else {
                const obj = JSON.parse(xhr.responseText);
                if (obj[0].display_name.includes('Heraklion')) {
                    $('.find-location-btn').css({"border-color": "darkgrey", "border-radius": "5px"});
                    $('#map-message').html("Valid").css("color", "black");
                    //MARKER
                    let lat = obj[0].lat;
                    let lon = obj[0].lon;

                    coordinates = {lat: lat, lon: lon};
                    message = obj[0].display_name;
                } else {
                    $('.find-location-btn').css({"border-color": "red", "border-radius": "5px"});
                    $('#map-message').html("Must be IN Heraklion").css("color", "yellow");
                }
            }
        }
    });
    const addressDOM = document.getElementById("address");
    let address = "";
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    if (addressDOM === null){
        const addressName = document.getElementById("street").value;
        const number = document.getElementById("street-number").value;
        address = addressName + " " + number + " " + city + " " + country;
    } else {
        address = addressDOM.value + " " + city + " " + country;
    }


    xhr.open('GET', 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=' + address + '&accept-language=en&polygon_threshold=0.0');

    // xhr.open('GET', 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=34%20West%2013th%20Street&city=New%20York%20City&state=NY&postalcode=10011&country=USA&accept-language=en&polygon_threshold=0.0');
    xhr.setRequestHeader('X-RapidAPI-Host', 'forward-reverse-geocoding.p.rapidapi.com');
    xhr.setRequestHeader('X-RapidAPI-Key', 'fddeaf7166msh673ea9fc0bd5067p1cd0fejsn15aa102a192d');

    xhr.send(data);
}

async function loadDoc() {
    if(map === undefined){
        drawMap('Map');
    }
    await requestCoordinates();
    let markerPosition = setPosition(coordinates.lat, coordinates.lon);

    let markerLayer = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markerLayer);
    const mar = new OpenLayers.Marker(markerPosition);
    markerLayer.addMarker(mar);

    mar.events.register('mousedown', mar, function (evt) {
            handler(markerPosition, message);
        }
    );
    map.setCenter(markerPosition, 25);
}

function setPosition(lat, lon) {
    const fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    const toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    const position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    return position;
}

function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup",
        position, null,
        message, null,
        true // <-- true if we want a close (X) button, false otherwise
    );
    map.addPopup(popup);
}

function drawMap(mapID) {
    map = new OpenLayers.Map(mapID);
    let mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
    let osmLayer = new OpenLayers.Layer.OSM("OpenStreetMap");
    let latitude = 35.33920552585561;
    let longitude = 25.13318216086705;
    let markerPosition = setPosition(latitude, longitude);

    //MARKER
    // let size = new OpenLayers.Size(21,25);
    // // let offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    //
    // let markerLayer = new OpenLayers.Layer.Markers("Markers");
    // map.addLayer(markerLayer);
    // const mar = new OpenLayers.Marker(markerPosition);
    // markerLayer.addMarker(mar);
    //
    // mar.events.register('mousedown', mar, function(evt) {
    //     handler(markerPosition,'CSD: sxoli mike');}
    // );

    map.setCenter(markerPosition, 13);
}

function getCoordinates() {
    if (coordinates.lat !== undefined || coordinates.lon !== undefined)
        return coordinates;
    else
        return undefined;
}

// TODO add to ajaxContent.load(registration.html, drawMap('Map'))
// $(document).ready(function (){
//     drawMap('Map');
// });

function calculateCoordinates(){

}