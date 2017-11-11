(function(){
  
  const config = {
    apiKey: "AIzaSyClq2kdiDboyMJs1QxISwIMT5VpUZKOGVU",
    authDomain: "proactiveweb-1e68d.firebaseapp.com",
    databaseURL: "https://proactiveweb-1e68d.firebaseio.com/",
    storageBucket: "proactiveweb-1e68d.appspot.com",
  };

  firebase.initializeApp(config);

  const pObject = document.getElementById('name_of_employee');
  const pObject1 = document.getElementById('name_of_employee1');
  const titleObject = document.getElementById('organization_name');
  const posObject = document.getElementById('get_position');
  const numberObject = document.getElementById('get_number');

  //////////////////////////////
  // getting the messages here//
  //////////////////////////////

  
  const counter = document.getElementById('newCom');

  const dbRefObject = firebase.database().ref().child('organization').child('employee').child('name');
  const dbRefObject1 = firebase.database().ref().child('organization').child('employee').child('name');
  const nameObject =  firebase.database().ref().child('organization').child('name');
  const getPosition = firebase.database().ref().child('organization').child('employee').child('position');
  const getNumber = firebase.database().ref().child('organization').child('employee').child('number');

  
  // Synchronizing object changes
  const counterFirebase = firebase.database().ref().child('Complain').child('Tashkent').child('Nam-gu').child('Trash');

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
    console.log(snapshot.numChildren());
});
}());