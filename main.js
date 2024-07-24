let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("errorMsg");
let todos = document.getElementById("todos");



form.addEventListener("submit",(event)=>{
	event.preventDefault();
	//console.log(input.value);
	validateInput();
})

let validateInput = ()=>{
	if(input.value===''){
		msg.innerHTML="Input can not be empty";
	}
	else{
		console.log("good");
		acceptData();
		creatTodo();
	}
}

let data = {};

let acceptData = ()=>{
	data['title']=input.value;
	console.log(data);
}

let deleteData = (e)=>{
	e.parentElement.parentElement.remove();
}

let updateData = (e)=>{
	input.value = e.parentElement.previousElementSibling.innerHTML;
	deleteData(e);
}

let creatTodo = ()=>{
	todos.innerHTML += 
	`<div>
		<p>${data.title}</p>
		<span class="options">
			<button onclick="updateData(this)">Edit</button>
			<button onclick="deleteData(this)">Delete</button>
		</span>
	</div>`;
	input.value="";
}