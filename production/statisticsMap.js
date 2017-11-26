
const config = {
  apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
  authDomain: "proactiveweb-1e68d.firebaseapp.com", 
  databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
  storageBucket: "proactiveweb-1e68d.appspot.com",
};
firebase.initializeApp( config );
var category=localStorage.getItem('category');
$("#organization_name").html(localStorage.getItem("employeeOrganization"));
$("#name_of_employee").html(localStorage.getItem("employeeFirstName")+ ' '+localStorage.getItem("employeeLastName"));
$(".profile_img").attr('src', localStorage.getItem("employeePhoto"));
markeredMapNew();
function funct(a){
  console.log(a);
  if(a.value.localeCompare("new")==0)
  markeredMapNew();
else if(a.value.localeCompare("completed")==0)
  markeredMapCompleted();
else if(a.value.localeCompare("rejected")==0)
  markeredMapRejected();
else if(a.value.localeCompare("inprocess")==0)
  markeredMapInProcess();
}



function markeredMapNew() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
  zoom: 13,
  center: new google.maps.LatLng(37.4472124, 126.6595561),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/New/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            if (key.localeCompare("rejected_count") != 0) {
              var childData = childSnapshot.val();
              var lng = childData.longitute;
              var lat = childData.latitude;
              var infowindow = new google.maps.InfoWindow();
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(Number(lat), Number(lng)),
                map: map
              });
          }})});
    }

function markeredMapCompleted() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 13,
    center: new google.maps.LatLng(37.4472124, 126.6595561),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/Completed/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key.localeCompare("rejected_count") != 0) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var infowindow = new google.maps.InfoWindow();
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(lat), Number(lng)),
            map: map
          });
      }})});
}

function markeredMapInProcess() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 13,
    center: new google.maps.LatLng(37.4472124, 126.6595561),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/inProcess/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key.localeCompare("rejected_count") != 0) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var infowindow = new google.maps.InfoWindow();
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(lat), Number(lng)),
            map: map
          });
      }})});
}
function markeredMapRejected() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 13,
    center: new google.maps.LatLng(37.4472124, 126.6595561),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/Rejected/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key.localeCompare("rejected_count") != 0) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var infowindow = new google.maps.InfoWindow();
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(lat), Number(lng)),
            map: map
          });
      }})});
}

