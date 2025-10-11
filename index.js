let texte=document.getElementById("text");
let btn=document.getElementById("btnsubmit");
let taskList=document.getElementById("taskList");
let btnClear=document.getElementById("btnClear");

//Mode Dark/Light
let btnMode = document.getElementById("btnmode");
let div = document.getElementById("div");
let title = document.querySelector("h1"); // cible le h1

btnMode.addEventListener('click', () => {
  if (btnMode.innerHTML === "White") {
    // Mode "Black" (tu montres "Black" après le clic)
    btnMode.innerHTML = "Black";
    btnMode.style.color = "white";
    btnMode.style.backgroundColor = "black";

    div.style.backgroundColor = "white";
    // => texte noir sur fond blanc
    div.style.color = "black";
    if (title) title.style.color = "black";
  } else {
    // Mode "White"
    btnMode.innerHTML = "White";
    btnMode.style.color = "black";
    btnMode.style.backgroundColor = "white";

    div.style.backgroundColor = "black";
    // => texte blanc sur fond noir
    div.style.color = "white";
    if (title) title.style.color = "white";
  }
});


let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){
    taskList.innerHTML="";
    tasks.forEach((task,index)=>{
        createTaskRow(task,index);
    });
}

function createTaskRow(taskText,index){
    //Créer les elts
    td=document.createElement("td");
    tr=document.createElement("tr");
    btnDelete=document.createElement("button");
    btnUpdate=document.createElement("button");

    //Assigner les contenues
    td.textContent=taskText;
    btnDelete.textContent="Delete";
    btnUpdate.textContent="Update";

    btnDelete.style.backgroundColor="#8531B6";
    btnUpdate.style.backgroundColor="#8531B6";
    btnDelete.style.color="white";
    btnUpdate.style.color="white";

    //Button supprimer
    btnDelete.addEventListener('click',()=>{
        tasks.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        renderTasks();
    });
    //Button update
    btnUpdate.addEventListener('click',()=>{
        let inputEdit=document.createElement("input");
        inputEdit.type="text";
        inputEdit.value=td.textContent;

        tr.replaceChild(inputEdit,td);

        inputEdit.addEventListener('blur',()=>{
            tasks[index]=inputEdit.value;
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        });

    });
    //Assembler les elts
    tr.appendChild(td);
    tr.appendChild(btnDelete);
    tr.appendChild(btnUpdate);
    taskList.appendChild(tr);


}

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    if (texte.value.trim() === "") return;

    tasks.push(texte.value);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
    texte.value="";
});

//Vider le stockage 
btnClear.addEventListener('click',(e)=>{
    e.preventDefault();
    tasks=[];
    localStorage.removeItem("tasks");
    renderTasks();
});

renderTasks();
