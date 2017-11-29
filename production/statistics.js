const config = {
  apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
  authDomain: "proactiveweb-1e68d.firebaseapp.com", 
  databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
  storageBucket: "proactiveweb-1e68d.appspot.com",
};

      var locations = [
      [ 37.4472124, 126.6595561],
      [ 37.4172124, 126.6235561],
      [ 37.4072124, 126.6235561]
    ];

firebase.initializeApp( config );
<<<<<<< HEAD

	var category='Trash';
=======
	var category=localStorage.getItem("category");
>>>>>>> 41198e6b628b2c4b49f6e257c407348f4a7fc79c
 	var counter = $( '#newCom' );
    var counterCompleted = $( '#completedMess' );
    var counterProcess = $( '#in_Process' );
    var counterRejected = $( '#rejected' );
    var new_counter;
var inProcess_counter;
var rejected_counter;
var completed_counter;
$("#organization_name").html(localStorage.getItem("employeeOrganization"));
$("#name_of_employee").html(localStorage.getItem("employeeFirstName")+ ' '+localStorage.getItem("employeeLastName"));

$("#name_of_employee1").html(localStorage.getItem("employeeFirstName")+ ' '+localStorage.getItem("employeeLastName"));
$( '#get_position' ).html(localStorage.getItem("employeePosition"));
$( '#get_number' ).html( localStorage.getItem("employeePhoneNumber") );
$('.profile_img').attr('src', localStorage.getItem("employeePhoto"));


var alreadyDone=0;
var inacceptableComplaint=0;
var badQualityPhoto=0;
var problemNotFound=0;

<<<<<<< HEAD
  markeredMap();
  // doMarker();
=======
var november_new = 0;
var october_new = 0;
var december_new = 0;

var november_completed = 0;
var october_completed = 0;
var december_completed = 0;

>>>>>>> 41198e6b628b2c4b49f6e257c407348f4a7fc79c


firebase.database().ref('Complain/Tashkent/Nam-gu/'+category+'/Rejected/').once('value').then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		 var key = childSnapshot.key;
		 if(key.localeCompare( "rejected_count" ) != 0 ){		 	
		var reason = childSnapshot.val().reason;
		if(reason.localeCompare("already done")==0)
			alreadyDone++;
		else if(reason.localeCompare("inacceptable complaint")==0)
			inacceptableComplaint++;
		else if(reason.localeCompare("bad photo quality")==0)
			badQualityPhoto++;		
		else if(reason.localeCompare("problem not found in located area")==0)
			problemNotFound++;
		
<<<<<<< HEAD
	}

  showStatistics();


=======
	}showStatistics();
>>>>>>> 41198e6b628b2c4b49f6e257c407348f4a7fc79c
}
  )
});

<<<<<<< HEAD
    var organName;
    const dbRefObject = firebase.database().ref( 'organization/employee/name/' );
    const nameObject = firebase.database().ref( 'organization/employee/name/' );
    const getPosition = firebase.database().ref( 'organization/employee/position/' );
    const getNumber = firebase.database().ref( 'organization/employee/number/' );
    const counterFirebase = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/' );

    counterFirebase.child( "New" ).on( "value", function( snapshot ) {
      counter.text(snapshot.val().new_count);
      new_counter = snapshot.val().new_count;
       showStatistics();
    } );
=======
firebase.database().ref('Complain/Tashkent/Nam-gu/'+category+'/New/').once('value').then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		var key = childSnapshot.key;
		if(key.localeCompare("new_count")!=0){
			var date_new = childSnapshot.val().time;
			var tempdate = "";
			for (var i=3;i<5;i++){
				tempdate=tempdate+date_new[i];
			}
			date_new = parseInt(tempdate);
			if(date_new == 11){
				november_new++;
			}
			else if (date_new == 10){
				october_new++;
			}
			else if (date_new == 12){
				december_new++;
			}

		}
		showStatistics();
	   })

});


firebase.database().ref('Complain/Tashkent/Nam-gu/'+category+'/Completed/').once('value').then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		var key = childSnapshot.key;
		if(key.localeCompare("completed_count")!=0){
			var date_completed = childSnapshot.val().time;
			var tempdate_com = "";
			for (var i=3;i<5;i++){
				tempdate_com = tempdate_com + date_completed[i];
			}
			date_completed = parseInt(tempdate_com);
			if(date_completed == 11){
				november_completed++;
			}
			else if (date_completed == 10){
				october_completed++;
			}
			else if (date_completed == 12){
				december_completed++;
			}

		}
		showStatistics();
	   })

});

>>>>>>> 41198e6b628b2c4b49f6e257c407348f4a7fc79c
    
const counterFirebase = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/' );

counterFirebase.child( "New" ).on( "value", function( snapshot ) {
  counter.text(snapshot.val().new_count);
  new_counter = snapshot.val().new_count;
   showStatistics();
} );

counterFirebase.child( "Completed" ).on( "value", function( snapshot ) {
  counterCompleted.text(snapshot.val().completed_count);
  completed_counter = counterCompleted.text(snapshot.val().completed_count ).text();
   showStatistics();
} );

counterFirebase.child( "inProcess" ).on( "value", function( snapshot ) {
  counterProcess.text( snapshot.val().inProcess_count);
  inProcess_counter = counterProcess.text( snapshot.val().inProcess_count ).text();
   showStatistics();
} );

counterFirebase.child( "Rejected" ).on( "value", function( snapshot ) {
  counterRejected.text( snapshot.val().rejected_count);
  rejected_counter =  counterRejected.text( snapshot.val().rejected_count).text();
  showStatistics();
    } );

  function showStatistics(){
    var ctx = document.getElementById("pieChart").getContext('2d');
  	var myChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: {
	    labels: ["New", "Completed", "Rejected", "In Process"],
	    datasets: [{
	      backgroundColor: [
	        "#2ecc71",
	        "#3498db",
	        "#95a5a6",
	        "#9b59b6"
	      ],
	      data: [new_counter, completed_counter, rejected_counter, inProcess_counter]
	    }]
	  }
	});

	var ctx2 = document.getElementById("polarChart").getContext('2d');
	var myChart2 = new Chart(ctx2, {
  type: 'polarArea',
  data: {
    labels: ["alredy done", "inacceptable complaint", "bad photo quality", "problem not found in located area"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6"
      ],
      data: [alreadyDone, inacceptableComplaint, badQualityPhoto, problemNotFound]
    }]
  }
});

var ctx3 = document.getElementById("barChart").getContext('2d');
var myChart3 = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ["Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: 'New',
      data: [1, october_new, november_new, december_new],
      backgroundColor: "rgba(153,255,51,1)"
    }, {
      label: 'Completed',
      data: [1, october_completed, november_completed, december_completed],
      backgroundColor: "rgba(255,153,0,1)"
    }]
  }
 });
}



function markeredMap() {
  var map = new google.maps.Map(document.getElementById('markeredMap'), {
    zoom: 10,
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
                console.log(lng + " and " + lat);
                //locations.push([lng, lat]);
                var infowindow = new google.maps.InfoWindow();
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(Number(lat), Number(lng)),
                  map: map
                });
                // google.maps.event.addListener(marker, 'click', (function(marker, i) {
                //     return function() {
                //       infowindow.setContent(locations[i][0] + " and " + locations[i][1]);
                //       infowindow.open(map, marker);
                //     }
                //   })
                // );
            }})});}

// function doMarker(){
// console.log("KIrdin");  
// console.log("Henbjkclaksl: "+ locations.length);  
     

    

//     var marker, i;
//     for (i = 0; i < locations.length; i++) {  
        

      
//       })(marker, i));
//       }
//   }


// function myMapNew(latitude, longitute) {
//   var mapProp= {lat: Number(latitude), lng: Number(longitute)};
//   var map = new google.maps.Map(document.getElementById("markeredMap"),{
//   zoom: 18,
//   center: mapProp
//   });
//   var marker = new google.maps.Marker({
//           position: mapProp,
//           map: map,
//           title: 'Hello World!'
//         });
// }
//       myMapNew(-33.890542, 151.274856);

