L.mapbox.accessToken = 'pk.eyJ1Ijoia2F5ZWx1bmUiLCJhIjoiY2p1YjAycHR6MDdtZjQzbWkwYW11cnF5ZSJ9.K6wshTMY58vtqpV-1_b9Hw';

var map = L.mapbox.map('map').addLayer(L.mapbox.styleLayer('mapbox://styles/kayelune/ck48fnlvg07i91cqoy7m0mm1l')).setView([0,0], 3);

var marker = L.marker([-73, 40], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#f86767'
    })
});
var polyline = L.polyline([]).addTo(map);
var pointsAdded = 0;

console.log(marker);
window.setInterval(function() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response=>response.json())
    .then((response => {
      let lon = response.longitude;
      let lat = response.latitude;
      map.setView([lat, lon]);
      marker.setLatLng(L.latLng(lat,lon));
      polyline.addLatLng(L.latLng(lat, lon));
      // if (++pointsAdded < 360) window.setTimeout(add, 100);   
    })
    )
}, 1500);

marker.addTo(map);
