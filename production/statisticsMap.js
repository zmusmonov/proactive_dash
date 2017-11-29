
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
  var map = new google.maps.Map( document.getElementById( 'markeredMap' ), {
    zoom: 19,
    center: new google.maps.LatLng( 37.4472124, 126.6595561 ),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  } );
  var queryToRejected = firebase.database()
    .ref( 'Complain/Tashkent/Nam-gu/' + category + '/New/' )
    .orderByKey();
  queryToRejected.once( "value" )
    .then( function( snapshot ) {
      snapshot.forEach( function( childSnapshot ) {
        var key = childSnapshot.key;
        if ( key.localeCompare( "new_count" ) != 0 ) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var photo = childData.photo;
          var type = childData.type;
          var sender = childData.sender;
          var comment = childData.comment;
          var time = childData.time;
          var location = childData.location;
          var content = '<div id="iw-container">' + '<div class="iw-title">' + type + '</div>' + '<div class="iw-content">' + '<div class="iw-subTitle">' + sender + '</div>' + '<img src="' + photo + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' + '<p> Comments:<br>' + comment + '</p>' + '<div class="iw-subTitle">Location</div>' + '<p>Longitute:' + lng + '<br>Latitude:' + lat + '<br>' + '<br>Address:' + location + '</p>' + '</div>' + '<div class="iw-bottom-gradient"></div>' + '</div>';
          var infowindow = new google.maps.InfoWindow( {
            content: content,
            maxWidth: 350
          } );
          marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
          google.maps.event.addListener( marker, 'click', function() {
            marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
            infowindow.open( map, marker );
          } );
          google.maps.event.addListener( map, 'click', function() {
            infowindow.close();
          } );
          google.maps.event.addListener( infowindow, 'domready', function() {
            var iwOuter = $( '.gm-style-iw' );
            var iwBackground = iwOuter.prev();
            iwBackground.children( ':nth-child(2)' )
              .css( {
                'display': 'none'
              } );
            iwBackground.children( ':nth-child(4)' )
              .css( {
                'display': 'none'
              } );
            iwOuter.parent()
              .parent()
              .css( {
                left: '115px'
              } );
            iwBackground.children( ':nth-child(1)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .find( 'div' )
              .children()
              .css( {
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
              } );
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css( {
              opacity: '1',
              right: '38px',
              top: '3px',
              border: '7px solid #48b5e9',
              'border-radius': '13px',
              'box-shadow': '0 0 5px #3990B9'
            } );
            if ( $( '.iw-content' )
              .height() < 140 ) {
              $( '.iw-bottom-gradient' )
                .css( {
                  display: 'none'
                } );
            }
            iwCloseBtn.mouseout( function() {
              $( this )
                .css( {
                  opacity: '1'
                } );
            } );
          } );
        }

      } )
    } );
            
          
}

function markeredMapCompleted() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 19,
    center: new google.maps.LatLng(37.4472124, 126.6595561),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/Completed/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key.localeCompare("completed_count") != 0) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var infowindow = new google.maps.InfoWindow();
          var photo = childData.response_image;
          var type = childData.type;
          var sender = childData.sender;
          var comment = childData.comment;
          var orgComment=childData.commentsOfOrg;
          var time = childData.time;
          var location = childData.location;
          var content = '<div id="iw-container">' + '<div class="iw-title">' + type + '</div>' + '<div class="iw-content">' + '<div class="iw-subTitle">' + sender + '</div>' + '<img src="' + photo + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' + '<p> Comments from user:<br>' + comment + '</p><br><p> Comments from organization:<br>' + orgComment + '</p>' + '<div class="iw-subTitle">Location</div>' + '<p>Longitute:' + lng + '<br>Latitude:' + lat + '<br>' + '<br>Address:' + location + '</p>' + '</div>' + '<div class="iw-bottom-gradient"></div>' + '</div>';
          var infowindow = new google.maps.InfoWindow( {
            content: content,
            maxWidth: 350
          } );
          marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
          google.maps.event.addListener( marker, 'click', function() {
            marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
            infowindow.open( map, marker );
          } );
          google.maps.event.addListener( map, 'click', function() {
            infowindow.close();
          } );
          google.maps.event.addListener( infowindow, 'domready', function() {
            var iwOuter = $( '.gm-style-iw' );
            var iwBackground = iwOuter.prev();
            iwBackground.children( ':nth-child(2)' )
              .css( {
                'display': 'none'
              } );
            iwBackground.children( ':nth-child(4)' )
              .css( {
                'display': 'none'
              } );
            iwOuter.parent()
              .parent()
              .css( {
                left: '115px'
              } );
            iwBackground.children( ':nth-child(1)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .find( 'div' )
              .children()
              .css( {
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
              } );
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css( {
              opacity: '1',
              right: '38px',
              top: '3px',
              border: '7px solid #48b5e9',
              'border-radius': '13px',
              'box-shadow': '0 0 5px #3990B9'
            } );
            if ( $( '.iw-content' )
              .height() < 140 ) {
              $( '.iw-bottom-gradient' )
                .css( {
                  display: 'none'
                } );
            }
            iwCloseBtn.mouseout( function() {
              $( this )
                .css( {
                  opacity: '1'
                } );
            } );
          } );
      }})});
}

function markeredMapInProcess() {
var map = new google.maps.Map( document.getElementById( 'markeredMap' ), {
    zoom: 19,
    center: new google.maps.LatLng( 37.4472124, 126.6595561 ),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  } );
  var queryToRejected = firebase.database()
    .ref( 'Complain/Tashkent/Nam-gu/' + category + '/inProcess/' )
    .orderByKey();
  queryToRejected.once( "value" )
    .then( function( snapshot ) {
      snapshot.forEach( function( childSnapshot ) {
        var key = childSnapshot.key;
        if ( key.localeCompare( "inProcess_count" ) != 0 ) {
          var childData = childSnapshot.val();
          var lng = childData.longitute;
          var lat = childData.latitude;
          var photo = childData.photo;
          var type = childData.type;
          var sender = childData.sender;
          var comment = childData.comment;
          var time = childData.time;
          var location = childData.location;
          var content = '<div id="iw-container">' + '<div class="iw-title">' + type + '</div>' + '<div class="iw-content">' + '<div class="iw-subTitle">' + sender + '</div>' + '<img src="' + photo + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' + '<p> Comments:<br>' + comment + '</p>' + '<div class="iw-subTitle">Location</div>' + '<p>Longitute:' + lng + '<br>Latitude:' + lat + '<br>' + '<br>Address:' + location + '</p>' + '</div>' + '<div class="iw-bottom-gradient"></div>' + '</div>';
          var infowindow = new google.maps.InfoWindow( {
            content: content,
            maxWidth: 350
          } );
          marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
          google.maps.event.addListener( marker, 'click', function() {
            marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
            infowindow.open( map, marker );
          } );
          google.maps.event.addListener( map, 'click', function() {
            infowindow.close();
          } );
          google.maps.event.addListener( infowindow, 'domready', function() {
            var iwOuter = $( '.gm-style-iw' );
            var iwBackground = iwOuter.prev();
            iwBackground.children( ':nth-child(2)' )
              .css( {
                'display': 'none'
              } );
            iwBackground.children( ':nth-child(4)' )
              .css( {
                'display': 'none'
              } );
            iwOuter.parent()
              .parent()
              .css( {
                left: '115px'
              } );
            iwBackground.children( ':nth-child(1)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .find( 'div' )
              .children()
              .css( {
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
              } );
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css( {
              opacity: '1',
              right: '38px',
              top: '3px',
              border: '7px solid #48b5e9',
              'border-radius': '13px',
              'box-shadow': '0 0 5px #3990B9'
            } );
            if ( $( '.iw-content' )
              .height() < 140 ) {
              $( '.iw-bottom-gradient' )
                .css( {
                  display: 'none'
                } );
            }
            iwCloseBtn.mouseout( function() {
              $( this )
                .css( {
                  opacity: '1'
                } );
            } );
          } );
        }

      } )
    } );
}
function markeredMapRejected() {
var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 19,
    center: new google.maps.LatLng(37.4472124, 126.6595561),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var queryToRejected = firebase.database().ref('Complain/Tashkent/Nam-gu/' + category + '/Rejected/').orderByKey();
queryToRejected.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key.localeCompare("rejected_count") != 0) {
            var lng = childData.longitute;
          var lat = childData.latitude;
          var photo = childData.photo;
          var type = childData.type;
          var sender = childData.sender;
          var comment = childData.comment;
          var time = childData.time;
          var location = childData.location;
          var content = '<div id="iw-container">' + '<div class="iw-title">' + type + '</div>' + '<div class="iw-content">' + '<div class="iw-subTitle">' + sender + '</div>' + '<img src="' + photo + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' + '<p> Comments:<br>' + comment + '</p>' + '<div class="iw-subTitle">Location</div>' + '<p>Longitute:' + lng + '<br>Latitude:' + lat + '<br>' + '<br>Address:' + location + '</p>' + '</div>' + '<div class="iw-bottom-gradient"></div>' + '</div>';
          var infowindow = new google.maps.InfoWindow( {
            content: content,
            maxWidth: 350
          } );
          marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
          google.maps.event.addListener( marker, 'click', function() {
            marker = new google.maps.Marker( {
            position: new google.maps.LatLng( Number( lat ), Number( lng ) ),
            map: map,
            title: type
          } );
            infowindow.open( map, marker );
          } );
          google.maps.event.addListener( map, 'click', function() {
            infowindow.close();
          } );
          google.maps.event.addListener( infowindow, 'domready', function() {
            var iwOuter = $( '.gm-style-iw' );
            var iwBackground = iwOuter.prev();
            iwBackground.children( ':nth-child(2)' )
              .css( {
                'display': 'none'
              } );
            iwBackground.children( ':nth-child(4)' )
              .css( {
                'display': 'none'
              } );
            iwOuter.parent()
              .parent()
              .css( {
                left: '115px'
              } );
            iwBackground.children( ':nth-child(1)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .attr( 'style', function( i, s ) {
                return s + 'left: 76px !important;'
              } );
            iwBackground.children( ':nth-child(3)' )
              .find( 'div' )
              .children()
              .css( {
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
              } );
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css( {
              opacity: '1',
              right: '38px',
              top: '3px',
              border: '7px solid #48b5e9',
              'border-radius': '13px',
              'box-shadow': '0 0 5px #3990B9'
            } );
            if ( $( '.iw-content' )
              .height() < 140 ) {
              $( '.iw-bottom-gradient' )
                .css( {
                  display: 'none'
                } );
            }
            iwCloseBtn.mouseout( function() {
              $( this )
                .css( {
                  opacity: '1'
                } );
            } );
          } );
      }})});
}

