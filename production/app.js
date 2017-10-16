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

	const message1Object = document.getElementById('first_message');
	const message2Object = document.getElementById('second_message');
	const message3Object = document.getElementById('third_message');

	const dbRefObject = firebase.database().ref().child('Organizations').child('Employee Info').child('Name');
	const dbRefObject1 = firebase.database().ref().child('Organizations').child('Employee Info').child('Name');
	const nameObject =  firebase.database().ref().child('Organizations').child('Name');
	const getPosition = firebase.database().ref().child('Organizations').child('Employee Info').child('Position');
	const getNumber = firebase.database().ref().child('Organizations').child('Employee Info').child('Number');

	const getMessage1 = firebase.database().ref().child('Complain').child('Tashkent').child('MirzoUlugbek').child('Roads').child('New').child('complain1').child('Discription');
	const getMessage2 = firebase.database().ref().child('Complain').child('Tashkent').child('Nam-gu').child('Trash').child('New').child('-KvkRub3cKCFv2cTRgDx').child('comment');
	const getMessage3 = firebase.database().ref().child('Complain').child('Tashkent').child('Nam-gu').child('Trash').child('New').child('-KvkUT9I0k15kyeWH0d4').child('comment');

	// Synchronizing object changes

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

	getMessage1.on('value', snap => {
		const message1_text = document.createElement('message1_text');
		message1_text.innerText = snap.val();
		message1Object.appendChild(message1_text);
	});

	getMessage2.on('value', snap => {
		const message2_text = document.createElement('message2_text');
		message2_text.innerText = snap.val();
		message2Object.appendChild(message2_text);
	});

	getMessage3.on('value', snap => {
		const message3_text = document.createElement('message3_text');
		message3_text.innerText = snap.val();
		message3Object.appendChild(message3_text);
	});


}()); 





