var config = {apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
  authDomain: "proactiveweb-1e68d.firebaseapp.com",
  databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
  storageBucket: "proactiveweb-1e68d.appspot.com"};
firebase.initializeApp( config );
var pObject = $( '#name_of_employee' );
var pObject1 = $( '#name_of_employee1' );
var titleObject = $( '#organization_name' );
var posObject = $( '#get_position' );
var numberObject = $( '#get_number' );
var counter = $( '#newCom' );
var counterCompleted = $( '#completedMess' );
var counterProcess = $( '#in_Process' );
var counterRejected = $( '#rejected' );
var dbRef = firebase.database();
var complaintId;
var senderEmail;
var pathToCategory = "Complain/Tashkent/Nam-gu/Trash/";
var pathToEmployee = "organization/employee";
var pathToOrgName = "organization";
var dbRefObject = firebase.database().ref( pathToEmployee + '/name/' );
var nameObject = firebase.database().ref( pathToOrgName + '/name/' );
var getPosition = firebase.database().ref( pathToEmployee + '/position/' );
var getNumber = firebase.database().ref( pathToEmployee + '/number/' );
var counterFirebase = firebase.database().ref( pathToCategory );
counterFirebase.child( "New" ).on( "value", function( snapshot ) {
    counter.text( snapshot.numChildren() );
  } );
counterFirebase.child( "Completed" ).on( "value", function( snapshot ) {
    counterCompleted.text( snapshot.numChildren() );
  } );
counterFirebase.child( "inProcess" ).on( "value", function( snapshot ) {
    counterProcess.text( snapshot.numChildren() );
  } );
counterFirebase.child( "Rejected" ).on( "value", function( snapshot ) {
    counterRejected.text( snapshot.numChildren() );
  } );
func();
var modal = $( '#CompleteForm' );

function func() {
  var organName = $( '#organization_name' );
  var itemNew = $( '#listviewNew' );
  var queryToNew = firebase.database().ref( pathToCategory + '/New/' ).orderByKey();
  queryToNew.once( "value" ).then( function( snapshot ) {
      snapshot.forEach( function( childSnapshot ) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var comment = childData.comment;
        var location = childData.location;
        var photo = childData.photo;
        senderEmail = childData.emailCOMP;
        var sender = childData.sender;
        var status = childData.status;
        var time = childData.time;
        var type = childData.type;
        var userRef = dbRef.ref( "user/" + senderEmail + "/" );
        var contentDiv = document.createElement( 'div' );
        contentDiv.id = key;
        contentDiv.className = 'contentNew';
        var itemActiveDiv = document.createElement( 'div' );
        itemActiveDiv.className = 'item';
        var avatar = document.createElement( 'span' );
        avatar.className = 'avatar';
        var img = document.createElement( 'img' );
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
        itemNew.append( contentDiv );
      } )
    } ); // the end of then() with query inside
  $( 'div' ).on( 'click', ".contentNew", function() {
      var id = $( this ).attr( "id" );
      complaintId = id;
      var ref = dbRef.ref( pathToCategory + '/New/' + id );
      ref.once( 'value' ).then( function( snapshot ) {
          $( '#complainCategory' ).html( snapshot.val().type );
          $( '#comment' ).html( snapshot.val().comment );
          sender = snapshot.val().sender;
          $( '#userName' ).html( sender );
          senderEmail=snapshot.val().emailCOMP;
          $( '#location' ).html( snapshot.val().location );
          $( '#time' ).html( snapshot.val().time );
          $( '#complainPhoto' ).attr( 'src', snapshot.val().photo );
          var userRef = dbRef.ref( "user/" + senderEmail + "/" );
          userRef.once( 'value' ).then( function( datashot ) {
              $( '#userPhoneNumber' ).html( datashot.val().number );
              $( '#userPhoto' ).attr( 'src', datashot.val().photo );
            } )
        } )
    } )

  var itemRejected = $( '#listviewRejected' );
  var queryToRejected = firebase.database().ref( pathToCategory + '/Rejected/' ).orderByKey();
  queryToRejected.once( "value" ).then( function( snapshot ) {
      snapshot.forEach( function( childSnapshot ) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var comment = childData.comment;
        var location = childData.location;
        var photo = childData.photo;
        senderEmail = childData.emailCOMP;
        var sender = childData.sender;
        var status = childData.status;
        var time = childData.time;
        var type = childData.type;
        var userRef = dbRef.ref( "user/" + senderEmail + "/" );
        var contentDiv = document.createElement( 'div' );
        contentDiv.id = key;
        contentDiv.className = 'contentRejected';
        var itemActiveDiv = document.createElement( 'div' );
        itemActiveDiv.className = 'item';
        var avatar = document.createElement( 'span' );
        avatar.className = 'avatar';
        var img = document.createElement( 'img' );
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
        itemRejected.append( contentDiv );
      } )
    } ); // the end of then() with query inside
  $( 'div' ).on( 'click', ".contentRejected", function() {
      var id = $( this ).attr( "id" );
      complaintId = id;
      var ref = dbRef.ref( pathToCategory + '/Rejected/' + id );
      ref.once( 'value' ).then( function( snapshot ) {
          $( '#complainCategory' ).html( snapshot.val().type );
          $( '#comment' ).html( snapshot.val().comment );
          sender = snapshot.val().sender;
          $( '#userName' ).html( sender );
          senderEmail=snapshot.val().emailCOMP;
          $( '#location' ).html( snapshot.val().location );
          $( '#time' ).html( snapshot.val().time );
          $( '#complainPhoto' ).attr( 'src', snapshot.val().photo );
          var userRef = dbRef.ref( "user/" + senderEmail + "/" );
          userRef.once( 'value' ).then( function( datashot ) {
              $( '#userPhoneNumber' ).html( datashot.val().number );
              $( '#userPhoto' ).attr( 'src', datashot.val().photo );
            } )
        } )
    } )
  $( '#inProcess' )
    .on( 'click', function() {
      $( '#inProcessDiv' ).css( "display", "block" );
    } );
  $( '#rejected' )
    .on( 'click', function() {
      $( '#rejectedDiv' ).css( "display", "block" );
    } );
  // end of func() function
  window.onclick = function( event ) {
    if ( event.target == modal ) {
      modal.style.display = "none";
    }
  };
  dbRefObject.on( 'value', snap => {
    pObject.text( snap.val() );
    pObject1.text( snap.val() );
  } );
  nameObject.on( 'value', snap => {
    titleObject.text( snap.val() );
  } );
  getPosition.on( 'value', snap => {
    posObject.text( snap.val() );
  } );
  getNumber.on( 'value', snap => {
    numberObject.text( snap.val() );
  } );

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

  function inProcessSubmit() {
    var oldRef = dbRef.ref( pathToCategory + "New/" + complaintId + '/' );
    var complaintKey = genKey();
    var newRef_inProcess = dbRef.ref( "user/" + senderEmail + "/complains/inProcess/" + complaintKey + '/' );
    var newRefToCopy_inProcess = dbRef.ref( "Complain/Tashkent/Nam-gu/Trash/inProcess/" + complaintKey )
    var responsible = $( '#responsible' ).val();
    var date = $( '#expected_date' ).val();
    var budjet = $( '#budjet' ).val();
    var note = $( '#note' ).val();
    oldRef.child( "Key" ).set( complaintKey );
    oldRef.child( "ResponsiblePerson" ).set( responsible );
    oldRef.child( "ExpectedDate" ).set( budjet );
    oldRef.child( "Note" ).set( note );
    oldRef.child( "Checked" ).set( "false" );
    moveFbRecord( oldRef, newRef_inProcess );
    copyFbRecord( newRef_inProcess, newRefToCopy_inProcess );
    $( '#id03' ).css( 'display', 'none' );
  }

  function rejectedSubmit() {
    var complaintNumberInRejected = genKey();
    var newRef_rejected = dbRef.ref( "user/" + senderEmail + "/complains/rejected/" + complaintNumberInRejected );
    var newRefToCopy_rejected = dbRef.ref( pathToCategory + "Rejected/" + complaintNumberInRejected );
    var oldRef = dbRef.ref( pathToCategory + "New/" + complaintId + '/' );
    var reason = $( '#reasonsRejected option:selected' ).text();
    var comment = $( '#commentRejected' ).val();
    var nameOfOrganization = $( '#organization_name' ).text();
    var d = new Date();
    var rejectedDate = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();
    oldRef.child( "Organization" ).set( nameOfOrganization );
    oldRef.child( "Key" ).set( complaintNumberInRejected );
    oldRef.child( "reason" ).set( reason );
    oldRef.child( "CommentsOfOrg" ).set( comment );
    oldRef.child( "CompletionDate" ).set( rejectedDate );
    oldRef.child( "Checked" ).set( "false" );
    moveFbRecord( oldRef, newRef_rejected );
    copyFbRecord( newRef_rejected, newRefToCopy_rejected );
    $( '#id02' ).css( 'display', 'none' );
  }

  function genKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for ( var i = 0; i < 12; i++ ) text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    return text;
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
  var starRating;
  $( ':radio' )
    .change( function() {
      console.log( 'New star rating: ' + this.value );
      starRating = this.value;
    } );

  function readURL( input ) {
    if ( input.files && input.files[ 0 ] ) {
      var reader = new FileReader();
      reader.onload = function( e ) {
        $( '#image' ).attr( 'src', e.target.result );
      }
      reader.readAsDataURL( input.files[ 0 ] );
    }
  }
  $( "#imgInput" ).change( function() {
      readURL( this );
    } );
  $( '#imgInput' ).on( 'change', function( e ) {
      file = e.target.files[ 0 ];
      filename = file.name;
    } );
  var keygen = genKey();

  function FirebaseSubmit() {
    var oldReference = firebase.database().ref( pathToCategory + "New/" + complaintId + '/' );
    var newReference_completed = firebase.database().ref( pathToCategory + 'Completed/' + keygen + '/' );
    var newReferenceToCopy_completed = firebase.database().ref( 'user/' + senderEmail + '/complains/completed/' + keygen + '/' );
    var storageRef = firebase.storage().ref( 'response_images/' + filename );
    var uploadTask = storageRef.put( file );
    uploadTask.on( 'state_changed', function( snapshot ) {}, function( error ) {}, function() {
      var responsible_person = $( '#responsible_person' ).val();
      var downloadURL = uploadTask.snapshot.downloadURL;
      var completion_date = $( '#completion_date' ).val();
      var scope = $( "#scope_of_work" ).val();
      var finance_of_work = $( '#finance_of_work' ).val();
      var commentsOfOrg = $( '#message' ).val();
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
    } );
  }
}
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////  TRYING THE RANDOM STAF HERE   ///////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
