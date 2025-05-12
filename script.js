

document.addEventListener('DOMContentLoaded', function() {
    const taskbtn = document.getElementById("add-task-btn");
const todoinput = document.getElementById("todo-input");
const listItem = document.getElementById("todo-list");
let tasks= JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => rendertask(task));
taskbtn.addEventListener("click", function () {
    tasktext=todoinput.value.trim();
    if(tasktext.length==0){
        alert("Please enter a task");
        return;
    }
    else{
        const newTask={
            id: Date.now(),
            text:tasktext,
            completed:false
        }
        tasks.push(newTask);

        savetask();
        rendertask(newTask);
        todoinput.value="";
        
    }
});

function rendertask(task){
    const li = document.createElement("li");
    if(task.completed) li.classList.add("completed");
    li.setAttribute('data-id',task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`;
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        savetask();
    })
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the li element
        tasks = tasks.filter(t => t.id !== task.id);// filter method creates a new array with all elements that pass the test implemented by the provided function.
        li.remove();
        savetask();
    });
    listItem.appendChild(li);

}

function savetask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));//using local storage api , setItems:can store data in key-value pairs and values should be array key may any thing
                                                         //getItems:can retrieve data from local storage 
}
});