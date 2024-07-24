let form = document.getElementById("form");
let title = document.getElementById("title");
let description = document.getElementById("description");
let msg = document.getElementById("errorMsg");
let todos = document.getElementById("todos");

form.addEventListener("submit",(event)=>{
	event.preventDefault();
	//console.log(title.value);
	validatetitle();
})

let validatetitle = ()=>{
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
	// data['title']=title.value;
	// data['description']=description.value;
	data.push({
		title:title.value,
		description:description.value
	})
	localStorage.setItem("data",JSON.stringify(data));
	creatTodo();

	console.log(data);
}

let deleteData = (e)=>{
	e.parentElement.parentElement.remove();
	data.splice(e.parentElement.parentElement.id,1);
	localStorage.setItem("data",JSON.stringify(data));
	console.log(data, localStorage)
}

let updateData = (e)=>{
	let selectedTodo = e.parentElement.parentElement;
	title.value = selectedTodo.children[0].innerHTML;
	description.value = selectedTodo.children[1].innerHTML;
	// console.log(selectedTodo);
	deleteData(e);
}

let creatTodo = ()=>{
	todos.innerHTML ="";
	data.map((value, index)=>{
		return (todos.innerHTML += 
			`<div id="${index}">
				<h4>${value.title}</h4>
				<p>${value.description}</p>
				<span class="options">
					<button onclick="updateData(this)">Edit</button>
					<button onclick="deleteData(this);creatTodo()">Delete</button>
				</span>
			</div>`);
	})
	
	resetInputs();
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