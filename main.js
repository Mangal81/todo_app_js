let todoData = []; //create an empty array to store todo data in local storage

// function will run on loading of document 
window.onload = () =>{
    //let localStorageObject = false;
    let localStorageObjectName = Object.keys(localStorage)[0];
    // handle this 
    //note :=> the above line (line no 6) searches any item in localstorage but
    // you have to search only "todoData" in localstorage
    
    if(!localStorageObjectName){
        //this block will excute only if localstorege is empty or 
        // there is no any object named "todoData"
        localStorage.setItem("todoData",todoData);
        console.log("item stored successfully");
    }

    else console.log("already present");
}

function submitValue(){
    //get the value from input field

    let title = document.getElementById("title");
    let description = document.getElementById("description");

    // create an object 
    const data = {
        "title":title.value,
        "description":description.value
    }

    // fetch data from local storage
    let retriveData = localStorage.getItem("todoData");

    if(retriveData.length == 0){
        // if todoData object doesn't have any value
        todoData.push(data);
        localStorage.setItem("todoData",JSON.stringify(todoData));

        //making the input field empty
        title.value = "";
        description.value = "";

        console.log("it was empty and now it has items")
    }
    else {
        // if it has any value
        let dataStored = JSON.parse(retriveData);
        dataStored.push(data);
        localStorage.setItem("todoData",JSON.stringify(dataStored));

        //making the input field empty
        title.value = "";
        description.value = "";

        console.log("in else condition ",typeof dataStored);
    }
    
}






function fetchValue(){
    // console.log(JSON.parse(localStorage.getItem("todoData")));
    localStorage.setItem("user ccc",4)
    console.log(localStorage)
}










