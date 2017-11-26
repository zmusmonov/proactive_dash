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
						console.log("key " + key);
						var childData = childSnapshot.val();
						var passwd = childData.password;
						console.log("pass "+passwd);
						if ((($( '#txtUsername' ).val()).localeCompare( key )) == 0) {
							if((($( '#txtPassword' ).val()).localeCompare( passwd )) == 0 ){
								employeeFirstName =	childData.firstname;
								localStorage.setItem("employeeFirstName",employeeFirstName);
								employeeLastName = childData.lastname;
								localStorage.setItem("employeeLastName",employeeLastName);
								employeeOrganization = childData.organization;
								localStorage.setItem("employeeOrganization",employeeOrganization);
								employeePhoneNumber = childData.phonenumber;
								localStorage.setItem("employeePhoneNumber",employeePhoneNumber);
								employeePhoto = childData.photo;
								localStorage.setItem("employeePhoto",employeePhoto);
								employeePosition = childData.position;
								localStorage.setItem("employeePosition",employeePosition);
								window.location.assign( "index.html" );
							}
						}
					
	
				}) 
		} );

		

}