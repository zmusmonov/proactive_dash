const config = {
	apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
	authDomain: "proactiveweb-1e68d.firebaseapp.com",
	databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
	storageBucket: "proactiveweb-1e68d.appspot.com",
};
firebase.initializeApp( config );
var employeeFirstName;
var employeeLastName;
var employeePhoneNumber;
var employeePosition;
var employeeOrganization;
var employeePhoto;
var userName = $( '#txtUsername' )
	.val();
var password = $( '#txtPassword' )
	.val();

function login() {
	console.log("username " +$( '#txtUsername' ).val());
	console.log("password "+ $( '#txtPassword' ).val());
	firebase.database()
		.ref( "employee" )
		.once( "value" )
		.then( function( snapshot ) {
				snapshot.forEach( function( childSnapshot ) {
						var key = childSnapshot.key;
						console.log("key " +key);
						var childData = childSnapshot.val();
						var passwd = childData.password;
						console.log("pass "+passwd)
						if ( ($( '#txtUsername' ).val()).localeCompare( key ) == 0 && ($( '#txtPassword' ).val()).localeCompare( password ) == 0 ) {
							console.log("Inside if ");
							employeeFirstName = childData.firstname;
							employeeLastName = childData.lastname;
							employeeOrganization = childData.organization;
							employeePhoneNumber = childData.phonenumber;
							employeePhoto = childData.photo;
							employeePosition = childData.position;
							window.location.assign( "file:///D:/INHA%20University/Senior/2%20semester/proactive/proactive_dash/production/index.html" );

						}
					
	
				}) 
		} );

}