/*const config = {
  apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
  authDomain: "proactiveweb-1e68d.firebaseapp.com", 
  databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
  storageBucket: "proactiveweb-1e68d.appspot.com",
};*/
var organName=localStorage.getItem("employeeOrganization");
var category;
if(organName.localeCompare("Ministry of Roads and Transportation")==0)
{
  category='Road';
}
else if(organName.localeCompare("Ministry of Communal Service")==0)
{
    category='CommunalServices';
}
else if(organName.localeCompare("Ministry of Housing")==0)
{
  category='Trash';
}
localStorage.setItem("category", category);
var new_counter;
var inProcess_counter;
var rejected_counter;
var completed_counter;
//firebase.initializeApp( config );
const dbRef = firebase.database();
var complaintId;
var senderEmailNew;
var senderEmailRejected;
var senderEmailCompleted;
var senderEmailInProcess;
var starRating;
var longitute;
var latitude;

function myMapNew(latitude, longitute) {
  var mapProp= {lat: Number(latitude), lng: Number(longitute)};
  var map = new google.maps.Map(document.getElementById("googleMapNew"),{
  zoom: 18,
  center: mapProp
  });
  var marker = new google.maps.Marker({
          position: mapProp,
          map: map,
          title: 'Hello World!'
        });
}
function myMapInProcess(latitude, longitute) {
  var mapProp= {lat: Number(latitude), lng: Number(longitute)};
var map = new google.maps.Map(document.getElementById("googleMapInProcess"),{
  zoom: 18,
  center: mapProp
  });
var marker = new google.maps.Marker({
          position: mapProp,
          map: map,
          title: 'Hello World!'
        });
}
function myMapCompleted(latitude, longitute) {
  var mapProp= {lat: Number(latitude), lng: Number(longitute)};
var map = new google.maps.Map(document.getElementById("googleMapCompleted"),{
  zoom: 18,
  center: mapProp
  });
var marker = new google.maps.Marker({
          position: mapProp,
          map: map,
          title: 'Hello World!'
        });
}
function myMapRejected(latitude, longitute) {
  var mapProp= {lat: Number(latitude), lng: Number(longitute)};
var map = new google.maps.Map(document.getElementById("googleMapRejected"),{
  zoom: 18,
  center: mapProp
  });
var marker = new google.maps.Marker({
          position: mapProp,
          map: map,
          title: 'Hello World!'
        });
}

    var counter = $( '#newCom' );
    var counterCompleted = $( '#completedMess' );
    var counterProcess = $( '#in_Process' );
    var counterRejected = $( '#rejected' );
    const dbRefObject = firebase.database().ref( 'organization/employee/name/' );
    const nameObject = firebase.database().ref( 'organization/employee/name/' );
    const getPosition = firebase.database().ref( 'organization/employee/position/' );
    const getNumber = firebase.database().ref( 'organization/employee/number/' );
    const counterFirebase = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/' );

    counterFirebase.child( "New" ).on( "value", function( snapshot ) {
      counter.text(snapshot.val().new_count);
      new_counter = snapshot.val().new_count;
      newLoad();
    } );
    
    counterFirebase.child( "Completed" ).on( "value", function( snapshot ) {
      counterCompleted.text(snapshot.val().completed_count);
      completed_counter = counterCompleted.text(snapshot.val().completed_count ).text();
      completedLoad();
    } );

    counterFirebase.child( "inProcess" ).on( "value", function( snapshot ) {
      counterProcess.text( snapshot.val().inProcess_count);
      inProcess_counter = counterProcess.text( snapshot.val().inProcess_count ).text();
      inProcessLoad();
    } );
    
    counterFirebase.child( "Rejected" ).on( "value", function( snapshot ) {
      counterRejected.text( snapshot.val().rejected_count);
      rejected_counter =  counterRejected.text( snapshot.val().rejected_count).text();
      rejectedLoad();
    } );

    $( '#name_of_employee' ).text( localStorage.getItem("employeeFirstName")+ ' '+localStorage.getItem("employeeLastName") );
    $( '#name_of_employee1' ).text( localStorage.getItem("employeeFirstName")+' '+localStorage.getItem("employeeLastName") );
    $( '#organization_name' ).text( localStorage.getItem("employeeOrganization"));
    $( '#get_position' ).text(localStorage.getItem("employeePosition"));
    $( '#get_number' ).text( localStorage.getItem("employeePhoneNumber") );
    $('.profile_img').attr('src', localStorage.getItem("employeePhoto"));
// Synchronizing object changes
  func();

function func() {
  $( 'div' ).on( 'click', ".contentNew", function() {
    var id = $( this ).attr( "id" );
    complaintId = id;
    var sender;
    var ref = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/New/' + id );
    ref.once( 'value' ).then( function( snapshot ) {

      $( '#complainPhotoNew').show();
      $( '#statusButtonCompletedInNewFolder').show();
      $( '#statusButtonRejectedInNewFolder').show();
      $( '#statusButtonInProcessInNewFolder').show();
      $( '#userPhotoNew').show();


      $( '#complainCategoryNew1' ).show();
      $( '#complainCategoryNew' ).html( snapshot.val().type );
      $( '#userNameNew1' ).show();
      sender = snapshot.val().sender;
      $( '#userNameNew' ).html( sender );
      $( '#userPhoneNumberNew1' ).show();
      $( '#commentNew1' ).show();
      $( '#commentNew' ).html( snapshot.val().comment );
      senderEmailNew = snapshot.val().emailCOMP;
      $( '#locationNew1' ).show();
      $( '#locationNew' ).html( snapshot.val().location );
      $( '#timeNew1' ).show();
      $( '#timeNew' ).html( snapshot.val().time );
      latitude=snapshot.val().latitude;
      longitute=snapshot.val().longitute;
      myMapNew(latitude, longitute);
      $("#lat").html(latitude);
      $("#long").html(longitute);
      $( '#complainPhotoNew' ).attr( 'src', snapshot.val().photo );
      var userRef = dbRef.ref( "user/" + senderEmailNew + "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        $( '#userPhoneNumberNew' ).html( datashot.val().number );
        $( '#userPhotoNew').show();
        $( '#userPhotoNew' ).attr( 'src', datashot.val().photo );
      } )
      document.getElementById('complainDetailsNew').style.display='block';
    } )
  } );

  $( 'div' ).on( 'click', ".contentRejected", function() {
    var id = $( this ).attr( "id" );
    complaintId = id;
    var sender;
    var ref = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/Rejected/' + id );
    ref.once( 'value' ).then( function( snapshot ) {

      $( '#complainPhotoRejected' ).show();
      
      $( '#complainCategoryRejected' ).html( snapshot.val().type );
      $( '#complainCategoryRejected1' ).show();

      $( '#commentRejected1' ).show;      
      $( '#commentRejected' ).html( snapshot.val().comment );

      sender = snapshot.val().sender;
      $( '#userNameRejected' ).html( sender );
      
      senderEmailRejected=snapshot.val().emailCOMP;
      $( '#userNameRejected1' ).show();

      $( '#locationRejected' ).html( snapshot.val().location );
      $( '#locationRejected1' ).show();

      $( '#timeRejected' ).html( snapshot.val().time );
      $( '#timeRejected1' ).show();

      $('#CompletionDateRejected').html(snapshot.val().CompletionDate);
      $('#CompletionDateRejected1').show();

      $('#CommentsOfOrgRejected').html(snapshot.val().CommentsOfOrg);
      $('#CommentsOfOrgRejected1').show();

      $('#reasonRejected').html(snapshot.val().reason);
       latitude=snapshot.val().latitude;
      longitute=snapshot.val().longitute;
      myMapRejected(latitude, longitute);
      $('#reasonRejected1').show();
      $( '#complainPhotoRejected' ).attr( 'src', snapshot.val().photo );
      var userRef = dbRef.ref( "user/" + senderEmailRejected + "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        $( '#userPhoneNumberRejected' ).html( datashot.val().number );
        $( '#userPhoneNumberRejected1' ).show();
        $( '#userPhotoRejected' ).attr( 'src', datashot.val().photo );
        $( '#userPhotoRejected' ).show();

      } )
      document.getElementById('complainDetailsRejected').style.display='block';
    } )
  } );

  $( 'div' ).on( 'click', ".contentCompleted", function() {
    var id = $( this ).attr( "id" );
    complaintId = id;
    var sender;
    var ref = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/Completed/' + id );
    ref.once( 'value' ).then( function( snapshot ) {

      $( '#userPhotoCompleted1' ).show();
      $( '#complainPhotoCompleted1' ).show();
      $( '#responsePhotoCompleted' ).show();
      $( '#complainPhotoCompleted' ).show();
      

      $( '#complainCategoryCompleted' ).html( snapshot.val().type );
      $( '#complainCategoryCompleted1' ).show();

      $( '#commentCompleted' ).html( snapshot.val().comment );
      $( '#commentCompleted1' ).show();

      sender = snapshot.val().sender;
      $( '#userNameCompleted' ).html( sender );
      $( '#userNameCompleted1' ).show();
      
      senderEmailCompleted = snapshot.val().emailCOMP;
      
      $('#responsePhotoCompleted').attr('src', snapshot.val().response_image);
      
      $( '#locationCompleted' ).html( snapshot.val().location );
      $( '#locationCompleted1' ).show();
      
      $( '#timeCompleted' ).html( snapshot.val().time );
      $( '#timeCompleted1' ).show();
      
      $('#commentsOfOrgCompleted').html(snapshot.val().commentsOfOrg);
      $('#commentsOfOrgCompleted1').show();
      
      $('#completionDateCompleted').html(snapshot.val().completion_date);
      $('#completionDateCompleted1').show();
      
      $('#financeOfWorkCompleted').html(snapshot.val().finance_of_work);
      $('#financeOfWorkCompleted1').show();
      
      $('#organizationRateCompleted').html(snapshot.val().organization_rate);
      $('#organizationRateCompleted1').show();
      
      $('#scopeCompleted').html(snapshot.val().scope);
       latitude=snapshot.val().latitude;
      longitute=snapshot.val().longitute;
      myMapCompleted(latitude, longitute);
      $('#scopeCompleted1').show();
      $( '#complainPhotoCompleted' ).attr( 'src', snapshot.val().photo );
      var userRef = dbRef.ref( "user/" + senderEmailCompleted + "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        $( '#userPhoneNumberCompleted' ).html( datashot.val().number );
        $( '#userPhoneNumberCompleted1' ).show();

        $( '#userPhotoCompleted' ).attr( 'src', datashot.val().photo );
        $( '#userPhotoCompleted' ).show();

      } )
      document.getElementById('complainDetailsCompleted').style.display='block';

    } )
  } );

  $( 'div' ).on( 'click', ".contentInProcess", function() {
    var id = $( this ).attr( "id" );
    complaintId = id;
    var sender;
    var ref = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/inProcess/' + id );
    ref.once( 'value' ).then( function( snapshot ) {

      $( '#statusButtonCompletedInProcessFolder').show();
      $( '#statusButtonRejectedInProcessFolder').show();


      $( '#complainCategoryInProcess1').show();
      $( '#complainCategoryInProcess').html(snapshot.val().type );

      $( '#commentInProcess1' ).show();
      $( '#commentInProcess' ).html(snapshot.val().comment );

      $( '#userNameInProcess1').show();
      sender = snapshot.val().sender;
      $( '#userNameInProcess').html( sender );

      $( '#userPhotoInProcess').show();


      $( '#locationInProcess1' ).show();
      senderEmailInProcess = snapshot.val().emailCOMP;
      $( '#locationInProcess' ).html( snapshot.val().location );

      $( '#timeInProcess1' ).show();      
      $( '#timeInProcess' ).html( snapshot.val().time );
       latitude=snapshot.val().latitude;
      longitute=snapshot.val().longitute;
      myMapInProcess(latitude, longitute);
      $( '#userPhoneNumberInProcess1' ).show();
      $( '#complainPhotoInProcess' ).attr( 'src', snapshot.val().photo );
      $( '#complainPhotoInProcess' ).show();

      var userRef = dbRef.ref( "user/" + senderEmailInProcess+ "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        $( '#userPhoneNumberInProcess' ).html( datashot.val().number );
        $( '#userPhotoInProcess' ).attr( 'src', datashot.val().photo );
      } )
      document.getElementById('complainDetailsInProcess').style.display='block';

    } )
  } );

  $( '#in_Process' ).on( 'click', function() {
    $( '#inProcessDiv' ).css( "display", "block" );
  } );

  $( '#rejected' ).on( 'click', function() {
    $( '#rejectedDiv' ).css( "display", "block" );
  } );

  $('#completedMess').on('click', function(){
    $('#CompletedDiv').css("display","block");
  });


  var modal = $( '#CompleteForm' );
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function( event ) {
    if ( event.target == modal ) {
      modal.style.display = "none";
    }
  };
  
  $( ':radio' ).change( function() {
    starRating = this.value;
  } );

  // function for displaying image downloaded by the user
  
  $( "#imgInput" ).change( function() {
    readURL( this );
  });

   $( "#imgInput2" ).change( function() {
    readURL( this );
  });

  var fileButton = $( '#imgInput' );
  fileButton.on( 'change', function( e ) {
    file = e.target.files[ 0 ];
    filename = file.name;
  } );

  var fileButton2 = $( '#imgInput2' );
  fileButton2.on( 'change', function( e ) {
    file2 = e.target.files[ 0 ];
    filename2 = file2.name;
  } );
}

function newLoad(){
    var itemNew = $( '#listviewNew' );
    itemNew.empty();
  var queryToNew = firebase.database()
    .ref( 'Complain/Tashkent/Nam-gu/'+category+'/New/' )
    .orderByKey();
  queryToNew.once( "value" )
    .then( function( snapshot ) {
        snapshot.forEach( function( childSnapshot ) {
            var key = childSnapshot.key;
            if ( key.localeCompare( "new_count" ) != 0 ) {
              var childData = childSnapshot.val();
              var comment = childData.comment;
              var location = childData.location;
              var photo = childData.photo;
              var sender = childData.sender;
              senderEmailNew = childData.emailCOMP;
              var status = childData.status;
              var time = childData.time;
              var type = childData.type;
              var contentDiv = document.createElement( 'div' );
              contentDiv.id = key;
              contentDiv.className = 'contentNew';
              var itemActiveDiv = document.createElement( 'div' );
              itemActiveDiv.className = 'item';
              var avatar = document.createElement( 'span' );
              avatar.className = 'avatar';
              var img = document.createElement( 'img' );
              var userRef = dbRef.ref( "user/" + senderEmailNew + "/" );
              userRef.once( 'value' )
                .then( function( datashot ) {
                  img.setAttribute( 'src', datashot.val()
                    .photo );
                } );
              img.setAttribute( 'height', '60px' );
              img.setAttribute( 'width', '60px' );
              avatar.append( img );
              var descDiv = document.createElement( 'div' );
              descDiv.className = 'desc';
              var h2 = document.createElement( 'h2' );
              h2.innerHTML = sender;
              var h6 = document.createElement( 'h6' );
              h6.innerHTML = type;
              var p = document.createElement( 'p' );
              p.innerHTML = comment;
              var timeSpan = document.createElement( 'span' );
              timeSpan.className = 'time';
              timeSpan.innerHTML = time;
              descDiv.appendChild( h2 );
              descDiv.appendChild( h6 );
              descDiv.appendChild( p );
              itemActiveDiv.appendChild( avatar );
              itemActiveDiv.appendChild( descDiv );
              itemActiveDiv.appendChild( timeSpan );
              contentDiv.appendChild( itemActiveDiv );
              itemNew.append( contentDiv );
            }
          }
                 )} );

console.log("NewLoad Function completed");
}
function inProcessLoad(){
  ////////////////////// SAME STAFF FOR IN_PROCESS
    var itemInProcess = $( '#listviewInProcess' );
    itemInProcess.empty();
    var queryToInProcess = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/inProcess/' ).orderByKey();
    queryToInProcess.once( "value" ).then( function( snapshot ) {
    snapshot.forEach( function( childSnapshot ) {
      var key = childSnapshot.key;
      if ( key.localeCompare( "inProcess_count" ) != 0 ) {
      var childData = childSnapshot.val();
      var comment = childData.comment;
      var location = childData.location;
      var photo = childData.photo;
      var sender = childData.sender;
      senderEmailInProcess = childData.emailCOMP;
      var status = childData.status;
      var time = childData.time;
      var type = childData.type;
      var contentDiv = document.createElement( 'div' );
      contentDiv.id = key;
      contentDiv.className = 'contentInProcess';
      var itemActiveDiv = document.createElement( 'div' );
      itemActiveDiv.className = 'item';
      var avatar = document.createElement( 'span' );
      avatar.className = 'avatar';
      var img = document.createElement( 'img' );
      var userRef = dbRef.ref( "user/" + senderEmailInProcess + "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        img.setAttribute( 'src', datashot.val().photo );
      } );
      img.setAttribute( 'height', '60px' );
      img.setAttribute( 'width', '60px' );
      avatar.append( img );
      var descDiv = document.createElement( 'div' );
      descDiv.className = 'desc';
      var h2 = document.createElement( 'h2' );
      h2.innerHTML = sender;
      var h6 = document.createElement( 'h6' );
      h6.innerHTML = type;
      var p = document.createElement( 'p' );
      p.innerHTML = comment;
      var timeSpan = document.createElement( 'span' );
      timeSpan.className = 'time';
      timeSpan.innerHTML = time;
      descDiv.appendChild( h2 );
      descDiv.appendChild( h6 );
      descDiv.appendChild( p );
      itemActiveDiv.appendChild( avatar );
      itemActiveDiv.appendChild( descDiv );
      itemActiveDiv.appendChild( timeSpan );
      contentDiv.appendChild( itemActiveDiv );
      itemInProcess.append( contentDiv );
    }} )
  } );
console.log("inProcessLoad Function Completed");
}

function completedLoad(){
    var itemCompleted = $( '#listviewCompleted' );
    itemCompleted.empty();
    var queryToCompleted = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/Completed/' ).orderByKey();
    queryToCompleted.once( "value" ).then( function( snapshot ) {
    snapshot.forEach( function( childSnapshot ) {
      var key = childSnapshot.key;
      if ( key.localeCompare( "completed_count" ) != 0 ) {
      var childData = childSnapshot.val();
      var comment = childData.comment;
      var location = childData.location;
      var photo = childData.photo;
      var sender = childData.sender;
      senderEmailCompleted = childData.emailCOMP;
      var status = childData.status;
      var time = childData.time;
      var type = childData.type;
      var contentDiv = document.createElement( 'div' );
      contentDiv.id = key;
      contentDiv.className = 'contentCompleted';
      var itemActiveDiv = document.createElement( 'div' );
      itemActiveDiv.className = 'item';
      var avatar = document.createElement( 'span' );
      avatar.className = 'avatar';
      var img = document.createElement( 'img' );
      var userRef = dbRef.ref( "user/" + senderEmailCompleted + "/" );
      userRef.once( 'value' ).then( function( datashot ) {
        img.setAttribute( 'src', datashot.val().photo );
      } );
      img.setAttribute( 'height', '60px' );
      img.setAttribute( 'width', '60px' );
      avatar.append( img );
      var descDiv = document.createElement( 'div' );
      descDiv.className = 'desc';
      var h2 = document.createElement( 'h2' );
      h2.innerHTML = sender;
      var h6 = document.createElement( 'h6' );
      h6.innerHTML = type;
      var p = document.createElement( 'p' );
      p.innerHTML = comment;
      var timeSpan = document.createElement( 'span' );
      timeSpan.className = 'time';
      timeSpan.innerHTML = time;
      descDiv.appendChild( h2 );
      descDiv.appendChild( h6 );
      descDiv.appendChild( p );
      itemActiveDiv.appendChild( avatar );
      itemActiveDiv.appendChild( descDiv );
      itemActiveDiv.appendChild( timeSpan );
      contentDiv.appendChild( itemActiveDiv );
      itemCompleted.append( contentDiv );
    }} )
  } );
  console.log("CompletedLoad Function Completed");
}

function rejectedLoad(){
    var itemRejected = $( '#listviewRejected' );
    itemRejected.empty();
  var queryToRejected = firebase.database()
    .ref( 'Complain/Tashkent/Nam-gu/'+category+'/Rejected/')
    .orderByKey();
  queryToRejected.once( "value" )
    .then( function( snapshot ) {
      snapshot.forEach( function( childSnapshot ) {
        var key = childSnapshot.key;
        if ( key.localeCompare( "rejected_count" ) != 0 ) {
          var childData = childSnapshot.val();
          var comment = childData.comment;
          var location = childData.location;
          var photo = childData.photo;
          var sender = childData.sender;
          senderEmailRejected = childData.emailCOMP;
          var status = childData.status;
          var time = childData.time;
          var type = childData.type;
          var contentDiv = document.createElement( 'div' );
          contentDiv.id = key;
          contentDiv.className = 'contentRejected';
          var itemActiveDiv = document.createElement( 'div' );
          itemActiveDiv.className = 'item';
          var avatar = document.createElement( 'span' );
          avatar.className = 'avatar';
          var img = document.createElement( 'img' );
          var userRef = dbRef.ref( "user/" + senderEmailRejected + "/" );
          userRef.once( 'value' )
            .then( function( datashot ) {
              img.setAttribute( 'src', datashot.val()
                .photo );
            } );
          img.setAttribute( 'height', '60px' );
          img.setAttribute( 'width', '60px' );
          avatar.append( img );
          var descDiv = document.createElement( 'div' );
          descDiv.className = 'desc';
          var h2 = document.createElement( 'h2' );
          h2.innerHTML = sender;
          var h6 = document.createElement( 'h6' );
          h6.innerHTML = type;
          var p = document.createElement( 'p' );
          p.innerHTML = comment;
          var timeSpan = document.createElement( 'span' );
          timeSpan.className = 'time';
          timeSpan.innerHTML = time;
          descDiv.appendChild( h2 );
          descDiv.appendChild( h6 );
          descDiv.appendChild( p );
          itemActiveDiv.appendChild( avatar );
          itemActiveDiv.appendChild( descDiv );
          itemActiveDiv.appendChild( timeSpan );
          contentDiv.appendChild( itemActiveDiv );
          itemRejected.append( contentDiv );
        }
      } )
    } );
  console.log("rejectedLoad Function completed");
}


function readURL( input ) {
    if ( input.files && input.files[ 0 ] ) {
      var reader = new FileReader();
      
      reader.onload = function( e ) {
        $( '#image' ).attr( 'src', e.target.result );
      }
      reader.readAsDataURL( input.files[ 0 ] );
    }
  };
/////////////////////////////////////
///OUTSIDE func /////////////////////
/////////////////////////////////////
function NewToCompleted() {
    var keygen = genKey();
    var oldReference = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/New/' + complaintId + '/' );
    var newReference_completed = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/Completed/' + keygen + '/' );
    var newReferenceToCopy_completed = firebase.database().ref( 'user/' + senderEmailNew + '/complains/completed/' + keygen + '/' );
    var storageRef = firebase.storage().ref( 'response_images/' + filename );
    var uploadTask = storageRef.put( file );
    uploadTask.on( 'state_changed', function( snapshot ) {
    }, function( error ) {
    }, function() {
      var responsible_person = $( '#responsible_person' ).val();
      var downloadURL = uploadTask.snapshot.downloadURL;
      var d = new Date();
      var completion_date = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();
      var e = document.getElementById( "scope_of_work" );
      var scope = e.options[ e.selectedIndex ].text;
      var finance_of_work = $( '#finance_of_work' ).val();
      var commentsOfOrg = $( '#message' ).val();
      oldReference.child( "Checked" ).set( "false" );
      oldReference.child( "status" ).set( "completed" );
      oldReference.child( "Organization" ).set( organName );
      oldReference.child( "latercomment" ).set( "" );
      oldReference.child( "RespondRateFromUser" ).set( 0 );
      oldReference.child( "responsible_person" ).set( responsible_person );
      oldReference.child( "response_image" ).set( downloadURL );
      oldReference.child( "completion_date" ).set( completion_date );
      oldReference.child( "scope" ).set( scope );
      oldReference.child( "finance_of_work" ).set( finance_of_work );
      oldReference.child( "commentsOfOrg" ).set( commentsOfOrg );
      oldReference.child( "organization_rate" ).set( starRating );
      oldReference.child( "Key" ).set( keygen );
      oldReference.child( "Checked" ).set( "false" );
      moveFbRecord( oldReference, newReference_completed );
      copyFbRecord( newReference_completed, newReferenceToCopy_completed );
      document.getElementById( 'CompleteForm' ).style.display = 'none';
      document.getElementById('complainDetailsNew').style.display='none';

    } );
  }



  function genKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for ( var i = 0; i < 12; i++ )
      text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    return text;
  }

function NewToRejected() {
    var keygen = genKey();
    var reason = $( '#reasonsRejected option:selected' ).text();
    var comment = $( '#commentRejected' ).val();
    var d = new Date();
    var rejectedDate = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();  
    var oldRef = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/New/' + complaintId + '/' );
    var newRef_rejected = dbRef.ref( "user/" + senderEmailNew + "/complains/rejected/" + keygen );
    var newRefToCopy_rejected = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/Rejected/' + keygen );
    oldRef.child( "Organization" ).set( organName );
    oldRef.child( "Key" ).set( keygen );
    oldRef.child( "reason" ).set( reason );
    oldRef.child( "CommentsOfOrg" ).set( comment );
    oldRef.child( "CompletionDate" ).set( rejectedDate );
    oldRef.child( "Checked" ).set( "false" );
    moveFbRecord( oldRef, newRefToCopy_rejected );
    copyFbRecord( newRefToCopy_rejected, newRef_rejected );
    $('#complainDetailsNew').css('display', 'none');
    $( '#id02' ).css( 'display', 'none' );
  }

function NewToInProcess() {
    var oldRef = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/New/' + complaintId + '/' );
    var complaintKey = genKey();
    var newRef_inProcess = dbRef.ref( "user/" + senderEmailNew + "/complains/inProcess/" + complaintKey + '/' );
    var newRefToCopy_inProcess = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/inProcess/' + complaintKey );
    var responsible = $( '#responsible' ).val();
    var date = $( '#expected_date' ).val();
    var budjet = $( '#budjet' ).val();
    var note = $( '#note' ).val();
    oldRef.child( "Key" ).set( complaintKey );
    oldRef.child( "Organization" ).set( organName );
    oldRef.child( "ResponsiblePerson" ).set( responsible );
    oldRef.child( "ExpectedBudjet" ).set( budjet );
    oldRef.child( "ExpectedDate" ).set( date );
    oldRef.child( "Note" ).set( note );
    oldRef.child( "Checked" ).set( "false" );
    moveFbRecord( oldRef, newRef_inProcess );
    copyFbRecord( newRef_inProcess, newRefToCopy_inProcess );
    document.getElementById( 'id03' ).style.display = 'none';
    $('#complainDetailsNew').css('display', 'none');
  }

 function moveFbRecord( oldRef, newRef ) {
    oldRef.once( 'value', function( snap ) {
      newRef.set( snap.val(), function( error ) {
        if ( !error ) {
          oldRef.remove();
        } else if ( typeof( console ) !== 'undefined' && console.error ) {
          console.error( error );
        }
      } );
    } );
  }

function copyFbRecord( oldRef, newRef ) {
    oldRef.once( 'value', function( snap ) {
      newRef.set( snap.val(), function( error ) {
        if ( error && typeof( console ) !== 'undefined' && console.error ) {
          console.error( error );
        }
      } );
    } );
  }

function InProcessToCompleted() {
    var keygen = genKey();
    var oldReference = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/inProcess/' + complaintId + '/' );
    var newReference_completed = firebase.database().ref( 'Complain/Tashkent/Nam-gu/'+category+'/Completed/' + complaintId + '/' );
    var newReferenceToCopy_completed = firebase.database().ref( 'user/' + senderEmailInProcess + '/complains/completed/' + complaintId + '/' );
    var oldRefToDelete = firebase.database().ref( 'user/' + senderEmailInProcess + '/complains/inProcess/' + complaintId + '/' );
    oldRefToDelete.remove();
    var storageRef = firebase.storage().ref( 'response_images/' + filename2 );
    var uploadTask = storageRef.put( file2 );
    uploadTask.on( 'state_changed', function( snapshot ) {
    }, function( error ) {
    }, function() {
      var d = new Date();
    var completion_date = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();
      var downloadURL = uploadTask.snapshot.downloadURL;
      var e = document.getElementById( "scope_of_work" );
      var scope = e.options[ e.selectedIndex ].text;
      var finance_of_work = $( '#finance_of_work' ).val();
      var commentsOfOrg = $( '#message' ).val();
      oldReference.child( "latercomment" ).set( "" );
      oldReference.child( "RespondRateFromUser" ).set( 0 );
      oldReference.child( "response_image" ).set( downloadURL );
      oldReference.child( "completion_date" ).set( completion_date );
      oldReference.child( "scope" ).set( scope );
      oldReference.child( "finance_of_work" ).set( finance_of_work );
      oldReference.child( "commentsOfOrg" ).set( commentsOfOrg );
      oldReference.child( "organization_rate" ).set( starRating );
      oldReference.child( "Key" ).set( complaintId );
      oldReference.child( "Checked" ).set( "false" );
      moveFbRecord( oldReference, newReference_completed );
      copyFbRecord( newReference_completed, newReferenceToCopy_completed );
    $('#complainDetailsInProcess').css('display', 'none');
      document.getElementById( 'CompleteFormInProcess' ).style.display = 'none';
    } );

    }


function InProcessToRejected() {
    var keygen = genKey();
    var reason = $( '#reasonsRejected option:selected' ).text();
    var comment = $( '#commentRejected' ).val();
    var d = new Date();
    var rejectedDate = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();
    var oldRef = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/inProcess/' + complaintId + '/' );
    var oldRefForUser = dbRef.ref( "user/" + senderEmailInProcess + "/complains/inProcess/" + complaintId+'/' );
    var newRefForUser = dbRef.ref( "user/" + senderEmailInProcess + "/complains/rejected/" + keygen );
    var newRef = dbRef.ref( 'Complain/Tashkent/Nam-gu/'+category+'/Rejected/' + keygen );
    oldRefForUser.remove();
    oldRef.child( "Key" ).set( keygen );
    oldRef.child( "reason" ).set( reason );
    oldRef.child( "CommentsOfOrg" ).set( comment );
    oldRef.child( "CompletionDate" ).set( rejectedDate );
    oldRef.child( "Checked" ).set( "false" );
    moveFbRecord( oldRef, newRef );
    copyFbRecord( newRef, newRefForUser );
    $( '#id02' ).css( 'display', 'none' );
    $('#complainDetailsInProcess').css('display', 'none');
  }