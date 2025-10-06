let texte=document.getElementById('text');
let btn=document.getElementById('btnsubmit');
let taskList=document.getElementById('taskList');

btn.addEventListener('click',(e)=>{
    
    e.preventDefault();

    //Création des éléments
    let tr=document.createElement("tr");
    let td=document.createElement('td');
    let btnDelete=document.createElement('button');
    let btnUpdate=document.createElement('button');

    // Ajouter des éléments
    tr.appendChild(td);
    tr.appendChild(btnDelete);
    tr.appendChild(btnUpdate);
    taskList.appendChild(tr);

    //Affecter des valeurs
    td.textContent=texte.value;
    btnDelete.textContent="Delete";
    btnUpdate.textContent="Update";

    //Style des bouttons 
    btnDelete.style.backgroundColor="#8531B6";
    btnDelete.style.color="white";
    
    btnUpdate.style.backgroundColor="#8531B6";
    btnUpdate.style.color="white";

    btnDelete.addEventListener('click',()=>{
        tr.remove();
    });


    btnUpdate.addEventListener('click',()=>{
        let inputEdit=document.createElement("input");
        inputEdit.type="text";
        inputEdit.value=td.textContent;

        tr.replaceChild(inputEdit,td);

        //'blur' pour la perte du focus
        inputEdit.addEventListener('blur',()=>{
            td.textContent=inputEdit.value;
            tr.replaceChild(td,inputEdit);
        });

    });

    //Rendre le champs input vide
    texte.value="";
});