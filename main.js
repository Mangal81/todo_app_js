let todoData = []; //create an empty array to store todo data in local storage

// function will run on loading of document
window.onload = () => {
	let retriveData = localStorage.getItem("todoData");

	if (retriveData == null) {
		//this block will excute only if localstorege is empty or
		// there is no any object named "todoData"
		localStorage.setItem("todoData", todoData);
		console.log("item stored successfully");
	} else console.log("already present");
};

//function to store data in localstorage
function submitValue() {
	//get the value from input field
	let title = document.getElementById("title");
	let description = document.getElementById("description");

	// create an object
	const data = {
		title: title.value,
		description: description.value,
	};

	// fetch data from local storage
	let retriveData = localStorage.getItem("todoData");

	if (retriveData.length == 0) {
		// if todoData object doesn't have any value
		todoData.push(data);
		localStorage.setItem("todoData", JSON.stringify(todoData));

		//making the input field empty
		title.value = "";
		description.value = "";

		console.log("it was empty and now it has items");
	} else {
		// if it has any value
		let dataStored = JSON.parse(retriveData);
		dataStored.push(data);
		localStorage.setItem("todoData", JSON.stringify(dataStored));

		//making the input field empty
		title.value = "";
		description.value = "";

		console.log("in else condition ", typeof dataStored);
	}
}

//function to fetch data from local storage
function fetchValue() {
	let retriveData = localStorage.getItem("todoData");
	try {
		let data = JSON.parse(retriveData);
		console.log(data);
	} catch (e) {
		console.log("no data availble");
	}
}
