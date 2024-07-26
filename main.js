let form = document.getElementById("form");
let title = document.getElementById("title");
let description = document.getElementById("description");
let msg = document.getElementById("errorMsg");
let todos = document.getElementById("todos");
let submit = document.getElementById("submit");
let update = document.getElementById("update");
let hiddenInput = document.querySelector(".id");
update.setAttribute("style","display:none");

form.addEventListener("submit",(event)=>{
	event.preventDefault();
	//console.log(title.value);
	validateInputs();
})

let validateInputs = ()=>{
	if(title.value==='' || description.value===""){
		msg.innerHTML="Title or Description can not be empty.";
	}
	else{
		console.log("good");
		acceptData();
		msg.innerHTML="";
	}
}

let data = [];

let acceptData = ()=>{
	data.push({
		title:title.value,
		description:description.value
	})
	localStorage.setItem("data",JSON.stringify(data));
	creatTodo();

	console.log('accept data ',data);
}

let deleteData = (e)=>{
	e.parentElement.parentElement.remove();
	data.splice(e.parentElement.parentElement.id,1);
	localStorage.setItem("data",JSON.stringify(data));
	console.log(data, localStorage)
}

let editData = (e)=>{
	let selectedTodo = e.parentElement.parentElement;
	title.value = selectedTodo.children[0].innerHTML;
	description.value = selectedTodo.children[1].innerHTML;
	e.parentElement.parentElement.remove();
	hiddenInput.value = selectedTodo.id;
	//deleteData(e);
    submit.remove();
	update.setAttribute("style","display:block");
	//updateData();
}

let creatTodo = ()=>{
	todos.innerHTML ="";
	data.map((value, index)=>{
		return (todos.innerHTML += 
			`<div id="${index}">
				<h4>${value.title}</h4>
				<p>${value.description}</p>
				<span class="options">
					<button onclick="editData(this)">Edit</button>
					<button onclick="deleteData(this);creatTodo()">Delete</button>
				</span>
			</div>`);
	})
	
	resetInputs();
}

function updateData(){

	data.splice(hiddenInput.value,1);
	console.log("id of the selected todo ",hiddenInput.value ,"data is ", data);
	form.appendChild(submit);
	update.setAttribute("style","display:none");

}

let resetInputs = ()=>{
	title.value="";
	description.value="";
}

// IIFE

(()=>{
	data=JSON.parse(localStorage.getItem("data")) || [];
	creatTodo();
	console.log(data);
})()