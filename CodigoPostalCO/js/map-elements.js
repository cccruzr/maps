// ################### Map providers ###################
// OSM Mapnik
var osm_street = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

// OSM Black and white
var osm_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Stamen Toner
var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
});

// Esri topography
var esri_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// Esri satellite world imagery
var esri_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Thunderforest transport map
var tf_transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
  attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  apikey: '2c7ee6d6c9e848a9be98e27a855ba7fb',
  maxZoom: 22
});

// Carto positron light
var carto_light = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

// Carto dark matter
var carto_dark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

var basemaps = {
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/osm-street.png'></div> OpenStreetMap": osm_street,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/esri-sat.png'></div> Satellite": esri_satellite,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/esri-topo.png'></div> Topográfico": esri_topo,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/thunder-transit.png'></div> Tránsito": tf_transport,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/carto-light.png'></div> Grayscale": carto_light,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/carto-dark.png'></div> Dark Matter": carto_dark,
};




// ################### MAP INITIALIZATION ###################
// Bogota default coordinates
var coordBogota = [4.7110, -74.0721];
var mapbounds = new L.latLngBounds(   //Map boundaries
  L.latLng(14, -87),     //UpperLeft 13.81674, -82.96875
  L.latLng(-5.5, -60)    //BottomRight -5.09094, -66.79687
);

// Map creation
var map = new L.map("map", {
  zoomControl:false,
  center: coordBogota,
  zoom: 6,
  layers: [osm_street],
  wheelPxPerZoomLevel: 90,
  maxBounds: mapbounds,
  maxBoundsViscosity: 0.8,
  minZoom: 6,
});

// Add basemap layers to the map
L.control.layers(basemaps).addTo( map );
// Add zoom control to the top right
L.control.zoom({position: "topright"}).addTo( map );

// Add #sidebar element to map sidebar
var sidebar = L.control.sidebar("sidebar", { 
  autoPan: false,
  closeButton: false
}).addTo(map);

// Adds coordinates to URL
var hash = new L.Hash(map);

// Add scale control
// L.control.scale().addTo(map);


// ####### TOOLBAR BUTTONS ####### //
// Button to show/hide legend sidebar
var legendButton = L.easyButton({
  states: [{
    stateName: 'hide-sidebar',        // name the state
    icon:      'fa-caret-left',               // and define its properties
    title:     'Ocultar barra lateral',      // like its title
    onClick: function(btn) {       // and its callback
      sidebar.hide();
      btn.state('show-sidebar');    // change state on click!
    }
  }, {
    stateName: 'show-sidebar',
    icon:      'fa-bars',
    title:     'Mostrar barra lateral',
    onClick: function(btn, map) {
      sidebar.show();
      btn.state('hide-sidebar');
    }
  }]
}).addTo( map );

// Button: Fullscreen
var fullscreen = L.easyButton({
  states: [{
    icon: 'fa-arrows-alt',
    title: "Pantalla completa",
    onClick: function(btn, map) {
      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }]
}).addTo(map);

// Button: default position
var mapDefaultLocation = L.easyButton({
  states: [{
    icon:'fa-globe', 
    title: "Vista predeterminada", 
    onClick: function(btn, map){
      map.setView(coordBogota, 6);
    }
  }]
}).addTo( map );

// Geolocalizer
var geoLocate = L.control.locate({
  strings: {
    title: "Geolocalizador"
  }
}).addTo(map);

//Geocoder
var mapzenGeocoder = L.control.geocoder('mapzen-o4AkLq1',{
  attribution: "",
  expanded: false,
  //layers: ["country", "region", "county"],
  params: {
    'boundary.country': 'COL'
  },
  textStrings: {
    INPUT_PLACEHOLDER: 'Buscar (Lugar o Dirección)',
    INPUT_TITLE_ATTRIBUTE: 'Buscar',
    RESET_TITLE_ATTRIBUTE: 'Restablecer',
    NO_RESULTS: 'No se encontraron resultados.',
    ERROR_403: 'Se necesita una "API KEY" válida para usar la búsqueda.',
    ERROR_404: 'No se encontró el servicio de búsqueda. :-(',
    ERROR_408: 'El servicio demoró en responder. Intente de nuevo en unos instantes.',
    ERROR_429: 'Hay muchas solicitudes en el momento. Intente de nuevo más tarde.',
    ERROR_500: 'El servicio de búsqueda no está funcionando en el momento. Intente de nuevo más tarde.',
    ERROR_502: 'Se perdió la conexión. Intente de nuevo más tarde.',
    ERROR_DEFAULT: 'El servicio de búsqueda presenta inconvenientes. :-('
  },
}).addTo(map);



// ###########################################################
// ####### SPECIFIC MAP ELEMENTS FROM HERE ON ################
// ###########################################################
//Postal Codes SHP call
var zipcodes = L.esri.featureLayer({
  //url: 'https://services3.arcgis.com/3845X4ZJand4K8Fh/arcgis/rest/services/colombia_codigo_postal_shp/FeatureServer/0',
  url: 'https://services3.arcgis.com/3845X4ZJand4K8Fh/arcgis/rest/services/Colombia_C%C3%B3digo_Postal_(Simplificada)/FeatureServer/0',
  simplifyFactor: 0.25,
  precision: 4,
  fields: ['FID', 'Codigo_Pos'],
  style: {
      color: 'rgba(0, 117, 180, 0.75)',
      weight: 1
  }
});

//Map zoom events
map.on("zoomend", function(e){
  console.log("Zoom level: ", map.getZoom());
  if(map.getZoom() >= 12){ //Level 6 is the treshold 
    zipcodes.addTo(map);
  } else{
      map.removeLayer(zipcodes);
      document.getElementById('info-pane').innerHTML = '';
      zipcodes.resetFeatureStyle(oldId);
  }
});

// Tooltip update on mouse events
var oldId;
zipcodes.on('mouseover', function(e){showPC(e)});
zipcodes.on('click', function(e){
  hidePC(e);
  showPC(e);
});

zipcodes.on('mouseout', function(e){hidePC(e)});


//Show Postal Code
function showPC(e){
  oldId = e.layer.feature.id;
  document.getElementById('info-pane').innerHTML = '<b>' + e.layer.feature.properties.Codigo_Pos + '</b>';
  zipcodes.setFeatureStyle(e.layer.feature.id, {
    color: 'rgba(250, 122, 148, 0.9)',
    weight: 3,
    opacity: 1
  });
}

// Hide Postal Code
function hidePC(e){
  document.getElementById('info-pane').innerHTML = '';
  zipcodes.resetFeatureStyle(oldId);
}