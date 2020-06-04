L.mapbox.accessToken = 'pk.eyJ1Ijoia2F5ZWx1bmUiLCJhIjoiY2p1YjAycHR6MDdtZjQzbWkwYW11cnF5ZSJ9.K6wshTMY58vtqpV-1_b9Hw';

var map = L.mapbox.map('map',null, { zoomControl:false })
.addLayer(L.mapbox.styleLayer('mapbox://styles/kayelune/ck48fnlvg07i91cqoy7m0mm1l', {
  continuousWorld: true
}))
.setView([0,0], 3);

var marker = L.marker([0, 0], {
  icon: L.mapbox.marker.icon()
});

marker.options.icon.options.iconUrl = '../img/icon.png';
marker.options.icon.options.iconSize = [60,60];

var polyline = L.polyline([]).addTo(map);
polyline.setStyle({
  color: 'rgb(199,50,88)'
});

let menu = document.getElementById('menu');
let closeButton = document.querySelector('#burger');
let buttonIss = document.getElementById('iss-name');
let image = document.getElementsByClassName('leaflet-marker-icon');
let orbite = document.getElementsByClassName('leaflet-overlay-pane');

function openMenu(){
  if(menu.classList.contains('menu-closed')){
    menu.classList.toggle('menu-closed');
    closeButton.classList.toggle('open');
  }else{
    menu.classList.toggle('menu-closed');
    closeButton.classList.toggle('open');
  }
}

function showSatelitte(){
  if(buttonIss.getAttribute('checked')){
    image[0].style.display = 'none';
    orbite[0].style.display = 'none';
    buttonIss.setAttribute('checked', '');
  }else{
    image[0].style.display = 'block';
    orbite[0].style.display = 'block';
    buttonIss.setAttribute('checked', 'checked');
  }
}

closeButton.addEventListener('click', openMenu);
buttonIss.addEventListener('click', showSatelitte);

window.setInterval(function() {
  fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(response=>response.json())
  .then((response => {
    let lon = response.longitude;
    let lat = response.latitude;
    map.setView([lat, lon]);
    marker.setLatLng(L.latLng(lat,lon));
    polyline.addLatLng(L.latLng(lat, lon));
  })
  )
}, 1200);
marker.addTo(map);


