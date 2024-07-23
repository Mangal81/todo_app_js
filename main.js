let todoData = []; //create an empty array to store todo data in local storage

let displayData = document.querySelector(".display-data");
let todoTable = document.querySelector(".todos");
displayData.setAttribute("style", "display:none;");

document.onload = function () {
	//fetchValue();
	showData();
};

// function will run on loading of document
window.onload = showData();
function showData() {
	let retriveData = localStorage.getItem("todoData");

	if (retriveData == null) {
		//this block will excute only if localstorege is empty or
		// there is no any object named "todoData"
		localStorage.setItem("todoData", todoData);
		console.log("item stored successfully");
		//console.error("No data availble")
		displayData.setAttribute("style", "display:block;")
	}

	else {
		try {
			let data = JSON.parse(retriveData);
			console.log(data);
			fetchValue();
		}
		catch (e) {
			console.error("No data availble (window.onload function)", e);
			displayData.setAttribute("style", "display:block;")
		}
	}
};




//function to store data in localstorage
function submitValue() {
	//get the value from input field
	let title = document.getElementById("title");
	let description = document.getElementById("description");

	// create an object
	const data = {
		id: Date.now(),
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

		const newRow =
			`<tr>
                <td>${data.title}</td>
                <td>${data.description} </td>
            </tr>`;
		todoTable.insertAdjacentHTML('beforeend', newRow);

		console.log("it was empty and now it has items");

		displayData.setAttribute("style", "display:none;")
	} else {
		// if it has any value
		let dataStored = JSON.parse(retriveData);
		dataStored.push(data);
		localStorage.setItem("todoData", JSON.stringify(dataStored));

		//making the input field empty
		title.value = "";
		description.value = "";

		const newRow =
			`<tr>
				<td>${data.title}</td>
				<td>${data.description}</td>
			</tr>`;
		todoTable.insertAdjacentHTML('beforeend', newRow);

		console.log("in else condition ", typeof dataStored);
	}
}

//function to fetch data from local storage
function fetchValue() {
	let retriveData = localStorage.getItem("todoData");
	try {
		let data = JSON.parse(retriveData);
		for (let i in data) {
			console.log(data[i].title, data[i].description);
			const newRow =
				`<tr>
					<td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].description}</td>
                	<td><button class="button btn edit" value="${data[i].id}">Edit</button><button class="button btn" id="delete">Delete</button></td>
                </tr>`;
			todoTable.insertAdjacentHTML('beforeend', newRow);
		}
	}
	catch (e) {
		console.log("no data availble", e);
	}
}

let clearAllBtn = document.getElementById("clear-All");
clearAllBtn.addEventListener("click",()=>{
	let txt = `Are you sure? If you click "Yes" page will be reloaded.`;
	if(confirm(txt)==true){
		localStorage.removeItem("todoData");
		window.location.reload();
	}
})


let edit_btn = document.getElementsByClassName("edit");
for (let btn of edit_btn) {
	//console.log(btn.value);
	let retriveData = localStorage.getItem("todoData");
	let data = JSON.parse(retriveData);
	console.log("for deleting data ", data);
	btn.addEventListener('click', () => {
		for (let i = 0; i < data.length; i++) {
			if (btn.value == data[i].id) {
				//localStorage.removeItem("todoData")
				btn.parentElement.parentElement.parentElement.remove();
				console.log(data);
			}
		}
	})
}
