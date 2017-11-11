const config = {
		apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
		authDomain: "proactiveweb-1e68d.firebaseapp.com",
		databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
		storageBucket: "proactiveweb-1e68d.appspot.com",
	};


	firebase.initializeApp(config);
	var dbRef=firebase.database();
	var complaintId;
	var senderEmail;
func();
  const pObject = document.getElementById('name_of_employee');
  const pObject1 = document.getElementById('name_of_employee1');
  const titleObject = document.getElementById('organization_name');
  const posObject = document.getElementById('get_position');
  const numberObject = document.getElementById('get_number');

  const counter = document.getElementById('newCom');
  const counterCompleted = document.getElementById('completedMess');
  const counterProcess = document.getElementById('in_Process');
  const counterRejected = document.getElementById('rejected');

  const dbRefObject = firebase.database().ref().child('organization').child('employee').child('name');
  const dbRefObject1 = firebase.database().ref().child('organization').child('employee').child('name');
  const nameObject =  firebase.database().ref().child('organization').child('name');
  const getPosition = firebase.database().ref().child('organization').child('employee').child('position');
  const getNumber = firebase.database().ref().child('organization').child('employee').child('number');

  const counterFirebase = firebase.database().ref().child('Complain').child('Tashkent').child('Nam-gu').child('Trash');

  counterFirebase.child("New").on("value", function(snapshot) {
    counter.innerHTML = snapshot.numChildren();
    
  });

  counterFirebase.child("Completed").on("value",function(snapshot){
    counterCompleted.innerHTML = snapshot.numChildren();
  });

  counterFirebase.child("inProcess").on("value", function(snapshot){
    counterProcess.innerHTML = snapshot.numChildren();
  });

  counterFirebase.child("Rejected").on("value", function(snapshot){
    counterRejected.innerHTML = snapshot.numChildren();
  });
  
  // Synchronizing object changes
function func(){
var item=document.getElementById("listview");
var organName=document.getElementById("organization_name");

  
var query=firebase.database().ref("Complain/Tashkent/Nam-gu/Trash/New").orderByKey();
query.once("value").then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		var key=childSnapshot.key;
		var childData=childSnapshot.val();
		var comment=childData.comment;
		var location=childData.location;
		var photo=childData.photo;
		var sender=childData.sender;

		var status=childData.status;
		var time=childData.time;
		var type=childData.type;
		var contentDiv=document.createElement('div');
		contentDiv.id=key;
		contentDiv.className='content';
		var itemActiveDiv=document.createElement('div');
		itemActiveDiv.className='item';
		var avatar=document.createElement('span');
		avatar.className='avatar';
		var img=document.createElement('img');
		var userRef=dbRef.ref("user/azizmailcom/");
		userRef.once('value').then(function(datashot){
		img.setAttribute('src', datashot.val().photo);
		})
		img.setAttribute('height', '60px');
		img.setAttribute('width', '60px');
		avatar.append(img);
		var descDiv=document.createElement('div');
		descDiv.className='desc';
		var h2=document.createElement('h2');
		h2.innerHTML=sender;
		var h6=document.createElement('h6');
		h6.innerHTML=type;
		var p=document.createElement('p');
		p.innerHTML=comment;
		var timeSpan=document.createElement('span');
		timeSpan.className='time';
		timeSpan.innerHTML=time;
		descDiv.appendChild(h2);
		descDiv.appendChild(h6);
		descDiv.appendChild(p);
		itemActiveDiv.appendChild(avatar);
		itemActiveDiv.appendChild(descDiv);
		itemActiveDiv.appendChild(timeSpan);
		contentDiv.appendChild(itemActiveDiv);
		item.appendChild(contentDiv);
	})
});
}
$('div').on('click',".content", function(){
		var id=$(this).attr("id");
		complaintId=id;
		var sender;
		var ref=dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+id);
		ref.once('value').then(function(snapshot){
		$('#complainCategory').html(snapshot.val().type);
		$('#comment').html(snapshot.val().comment);
		sender=snapshot.val().sender;
		$('#userName').html(sender);
		senderEmail=snapshot.val().emailCOMP;
    console.log(senderEmail);
		$('#location').html(snapshot.val().location);
		$('#time').html(snapshot.val().time);
		$('#complainPhoto').attr('src', snapshot.val().photo);
		var userRef=dbRef.ref("user/azizmailcom/");
		userRef.once('value').then(function(datashot){
		$('#userPhoneNumber').html(datashot.val().number);
		$('#userPhoto').attr('src', datashot.val().photo);
		})
		})
		
		
	})

$('#inProcess').on('click', function(){
	$('#inProcessDiv').css("display", "block");
})

$('#rejected').on('click', function(){
	$('#rejectedDiv').css("display", "block");
})


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


dbRefObject.on('value', snap => {
    const name_of_emp = document.createElement('name_of_emp');
    name_of_emp.innerText = snap.val();
    pObject.appendChild(name_of_emp);
  });

  dbRefObject1.on('value', snap => {
    const name_of_emp1 = document.createElement('name_of_emp1');
    name_of_emp1.innerText = snap.val();
    pObject1.appendChild(name_of_emp1);
  });

  nameObject.on('value', snap => {
    const name_of_organization = document.createElement('name_of_organization');
    name_of_organization.innerText = snap.val();
    titleObject.appendChild(name_of_organization);
  });

  getPosition.on('value', snap => {
    const position_of_emp = document.createElement('position_of_emp');
    position_of_emp.innerText = snap.val();
    posObject.appendChild(position_of_emp);
  });

  getNumber.on('value', snap => {
    const employee_number = document.createElement('employee_number');
    employee_number.innerText = snap.val();
    numberObject.appendChild(employee_number);
  });

  
  counterFirebase.child("New").on("value", function(snapshot) {
    counter.innerHTML = snapshot.numChildren();
});


function moveFbRecord(oldRef, newRef) {    
     oldRef.once('value', function(snap)  {
          newRef.set( snap.val(), function(error) {
               if( !error ) {  oldRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}

function inProcessSubmit() {
	var complainKey = genKey();
	var responsible =$('#responsible').val();
	var date=$('#expected_date').val();
	var budjet = $('#budjet').val();	  
	var note = $('#note').val();
// console.log(complaintId);
  console.log(senderEmail);
	dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Key").set(complainKey);
	dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("ResponsiblePerson").set(responsible);
	dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("ExpectedDate").set(budjet);
	dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Note").set(note);



	  var oldRef=dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId);
	  var newRef=dbRef.ref("user/"+senderEmail+"/complains/inProcess/"+complainKey+'/');
	  var newRefToCopy=dbRef.ref("Complain/Tashkent/Nam-gu/Trash/inProcess/"+complainKey);

	  moveFbRecord(oldRef, newRef);
	  copyFbRecord(newRef, newRefToCopy);

	  document.getElementById('id03').style.display='none';
}


function rejectedSubmit(){
  var complaintNumberInRejected=genKey();

  var reason=$('#reasonsRejected option:selected').text();
  var comment=$('#commentRejected').val();
  var nameOfOrganization=$('#organization_name').text();
  var d=new Date();
  var rejectedDate=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
  
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Organization").set(nameOfOrganization);
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Key").set(complaintNumberInRejected);
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("reason").set(reason);
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("CommentsOfOrg").set(comment);
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("CompletionDate").set(rejectedDate);
  dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Checked").set("false");
  var oldRef=dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId);
  var newRef=dbRef.ref("user/"+senderEmail+"/complains/rejected/"+complaintNumberInRejected);
  var newRefToCopy=dbRef.ref("Complain/Tashkent/Nam-gu/Trash/Rejected/"+complaintNumberInRejected);
  moveFbRecord(oldRef, newRef);
  copyFbRecord(newRef, newRefToCopy);
  document.getElementById('id02').style.display='none';
}




function genKey() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function copyFbRecord(oldRef, newRef) {    
     oldRef.once('value', function(snap)  {
          newRef.set( snap.val(), function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}

var starRating;

$(':radio').change(function() {
  console.log('New star rating: ' + this.value);
  starRating = this.value;

});

// function for displaying image downloaded by the user
function readURL(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    
    
    reader.onload = function(e){
      $('#image').attr('src',e.target.result);
    }

    reader.readAsDataURL(input.files[0]);

    console.log("Ziizzzii");
    
  }
}

$("#imgInput").change(function(){
  readURL(this);
});

var fileButton = document.getElementById('imgInput');

fileButton.addEventListener('change', function(e){
    file = e.target.files[0];
    filename = file.name;
});

function FirebaseSubmit() {
    console.log("I am inside firebase function()");
    
    var storageRef = firebase.storage().ref('response_images/' + filename);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', function(snapshot){

    }, function(error){

    },function(){
        /*var postKey = firebase.database().ref('response_images/').push().key;
        var downloadURL = uploadTask.snapshot.downloadURL;
        var updates = {};

        var e = document.getElementById("scope_of_work");
        var strUser = e.options[e.selectedIndex].text;

        var postData = {
          response_image:downloadURL,
          responsible_person:$('#responsible_person').val(),
          completion_date:$('#completion_date').val(),
          organization_rate:starRating,
          scope_of_work:strUser,
          finance_of_work:$('#finance_of_work').val(),
          comment_from_organization:$('#message').val(),
          Key:postKey,
          comment:$('#comment').text(),


          emailCOMP:senderEmail,
          location:$('#location').text(),
          sender:$('#userName').text(),
          status:"completed",
          type:$('#complainCategory').text()
        };*/

      //  updates[postKey] = postData;
       //firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/New/'+complaintId+'/').update(updates);
      
        /*updates['/Complain/Tashkent/Nam-gu/Trash/New/'+complaintId+'/'+postKey] = postData;
        firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/Completed/'+complaintId).update(postData);
        console.log(downloadURL);*/

        var responsible_person=$('#responsible_person').val();
        var downloadURL=uploadTask.snapshot.downloadURL;
        var completion_date=$('#completion_date').val();
        var e = document.getElementById("scope_of_work");
        var scope = e.options[e.selectedIndex].text;
        var finance_of_work=$('#finance_of_work').val();
        var commentsOfOrg=$('#message').val();
        var keygen=genKey();
        window.alert("responsible_person"+responsible_person);
         window.alert("downloadURL"+downloadURL);
          window.alert("completion_date"+completion_date);
           window.alert("scope"+scope);
            window.alert("finance_of_work"+finance_of_work);
             window.alert("commentsOfOrg"+commentsOfOrg);
           window.alert("keygen"+keygen);
              window.alert("starRating"+starRating);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("responsible_person").set(responsible_person);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("response_image").set(downloadURL);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("completion_date").set(completion_date);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("scope").set(scope);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("finance_of_work").set(finance_of_work);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("commentsOfOrg").set(commentsOfOrg);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("organization_rate").set(starRating);
        dbRef.ref("Complain/Tashkent/Nam-gu/Trash/New/"+complaintId).child("Key").set(keygen);
        var oldReference = firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/New/'+complaintId+'/');
        //var newReference = firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/Completed'+postKey);
        var newReference = firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/Completed/'+keygen+'/');
        moveFbRecord(oldReference,newReference);


        var oldCopyReference = firebase.database().ref('/Complain/Tashkent/Nam-gu/Trash/Completed/'+keygen+'/');
        var newCopyReference = firebase.database().ref('user/'+senderEmail+'/complains/completed/'+keygen+'/');
        copyFbRecord(oldCopyReference,newCopyReference);
    });
}


// oxirgisi


