let texte = document.getElementById('text');
let btn = document.getElementById('btnsubmit');
let taskList = document.getElementById('taskList');

// ---- Charger les tâches déjà sauvegardées ----
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fonction pour afficher toutes les tâches depuis "tasks"
function renderTasks() {
    taskList.innerHTML = ""; // reset affichage 
    tasks.forEach((task, index) => {
        createTaskRow(task, index);
    });
}

// Fonction pour créer une ligne
function createTaskRow(taskText, index) {
    let tr = document.createElement("tr");
    let td = document.createElement('td');
    let btnDelete = document.createElement('button');
    let btnUpdate = document.createElement('button');

    // contenu
    td.textContent = taskText;
    btnDelete.textContent = "Delete";
    btnUpdate.textContent = "Update";

    // style
    btnDelete.style.backgroundColor = "#8531B6";
    btnDelete.style.color = "white";
    btnUpdate.style.backgroundColor = "#8531B6";
    btnUpdate.style.color = "white";

    // suppression
    btnDelete.addEventListener('click', () => {
        tasks.splice(index, 1); // retire la tâche
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    });

    // update
    btnUpdate.addEventListener('click', () => {
        let inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = td.textContent;

        tr.replaceChild(inputEdit, td);

        inputEdit.addEventListener('blur', () => {
            tasks[index] = inputEdit.value; // met à jour le tableau
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });
    });

    // assemble
    tr.appendChild(td);
    tr.appendChild(btnDelete);
    tr.appendChild(btnUpdate);
    taskList.appendChild(tr);
}

// ---- Ajout d'une nouvelle tâche ----
btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (texte.value.trim() === "") return;

    tasks.push(texte.value); // ajoute la nouvelle tâche
    localStorage.setItem("tasks", JSON.stringify(tasks)); // sauvegarde
    renderTasks(); // réaffiche
    texte.value = ""; // vide input
});

// ---- Affiche les tâches au chargement ----
renderTasks();
