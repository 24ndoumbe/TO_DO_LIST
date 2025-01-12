
var taches = [];
var TableauTermine = []; 





function ajouterTache() {
  
  var champTache = document.getElementById('champTache');
  var description = champTache.value.trim();

 
  if (description === '') {
    alert('Veuillez entrer une description de tâche.');
    return;
  }

  
  taches.push(description);

 
  TableauTermine.push(false);
  

  
  alert('Tâche ajoutée : ' + description);

  
  champTache.value = '';

    
    const selectedFilter = document.getElementById("taskFilter").value;
    filterTasks(selectedFilter);

  
  AjouterTacheHTML(description);

  
  console.log('Liste des tâches :', taches);
  console.log('État des tâches :', TableauTermine);
}


function Cocher(event) {
    var checkbox = event.target;
    var id = checkbox.id;
    var isChecked = checkbox.checked;
  
    if (isChecked) {
        console.log("La tâche avec l'ID " + id + " a été cochée.");
    } else {
        console.log("La tâche avec l'ID " + id + " a été décochée.");
    }
    
    
    var index = parseInt(id.split('_')[1]);  
    TableauTermine[index] = isChecked;
    console.log("L'état des tâches : ", TableauTermine);
    
    var lignes = document.querySelectorAll('tr');  

    if (lignes.length > index) {
        var ligne = lignes[index + 1];  
        console.log(ligne);

        var tdDescription = ligne.cells[2];  

        
        var texteBrut = tdDescription.innerText;

        
        if (isChecked) {
            tdDescription.innerHTML = "<s>" + texteBrut + "</s>";
        } else {
            tdDescription.innerHTML = texteBrut;
        }
    } else {
        console.error("Ligne introuvable pour l'index " + index);
    }
}



function AjouterTacheHTML(description) {
    var tableBody = document.getElementById('tableTaches').getElementsByTagName('tbody')[0];
    var table = document.querySelector('table');
  
    
    if (!table) {
        
        table = document.createElement('table');
        
        
        document.body.appendChild(table);

        
        var caption = document.createElement('caption');
        caption.textContent = "Liste des tâches";  
        
        table.appendChild(caption);

        
        var thead = document.createElement('thead');
        
        
        var trHead = document.createElement('tr');

        
        var th1 = document.createElement('th');
        th1.textContent = "Numéro";
        th1.style.width = "10px"; 
        trHead.appendChild(th1);

        
        var th2 = document.createElement('th');
        th2.textContent = "Libellé";
        trHead.appendChild(th2);

        
        var thCheckbox = document.createElement('th');
        thCheckbox.textContent = 'Terminée';
        trHead.appendChild(thCheckbox);

        
        thead.appendChild(trHead);

        
        table.appendChild(thead);

        
        var tbody = document.createElement('tbody');
        
        
        table.appendChild(tbody);
    }

    
    var tbody = table.querySelector('tbody');
    
    
    tbody.innerHTML = '';

    
    taches.forEach(function(tache, index) {
        var trBody = document.createElement('tr');

        
        var tdCheck = document.createElement('td');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; 
        checkbox.id = "checkbox_" + index; 
        checkbox.checked = TableauTermine[index]; 
        checkbox.style.textAlign = "center"; 
        
        
        checkbox.addEventListener('change', Cocher);
        tdCheck.appendChild(checkbox); 
        trBody.appendChild(tdCheck); 

        
        var td1 = document.createElement('td');
        td1.textContent = index + 1; 
        td1.style.textAlign = "center";  
        td1.style.verticalAlign = "middle";  
        trBody.appendChild(td1);

        
        var td2 = document.createElement('td');
        td2.textContent = tache;  
        trBody.appendChild(td2);


        
        var tdSupprimer = document.createElement('td');
        var boutonSupprimer = document.createElement('button');
        boutonSupprimer.textContent = "Supprimer";
        boutonSupprimer.dataset.index = index; 
        boutonSupprimer.addEventListener('click', supprimerTache); 
        tdSupprimer.appendChild(boutonSupprimer);
        trBody.appendChild(tdSupprimer);

        
        tbody.appendChild(trBody);
    });

    console.log("Tableau mis à jour avec les tâches !");
}



var bouton = document.getElementById('ajouterTache');


bouton.addEventListener('click', ajouterTache);

document.addEventListener("DOMContentLoaded", function() {
    
    let taches = [];

    
    function afficherTaches(filtre) {
        const container = document.getElementById('tasksContainer');
        container.innerHTML = ""; 
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = "Liste des Tâches";
        table.appendChild(caption);

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        trHead.innerHTML = "<th>Tâche</th><th>État</th>";
        thead.appendChild(trHead);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');

        
        let tachesFiltrees = taches;
        if (filtre === 'completed') {
            tachesFiltrees = taches.filter(tache => tache.termine === true);
        } else if (filtre === 'uncompleted') {
            tachesFiltrees = taches.filter(tache => tache.termine === false);
        }

        
        tachesFiltrees.forEach(tache => {
            const tr = document.createElement('tr');
            const tdDescription = document.createElement('td');
            tdDescription.textContent = tache.description;
            const tdEtat = document.createElement('td');
            tdEtat.textContent = tache.termine ? "Terminée" : "Non terminée";
            tr.appendChild(tdDescription);
            tr.appendChild(tdEtat);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    }

    
    afficherTaches('all');

    
    const filterSelect = document.getElementById('taskFilter');
    filterSelect.addEventListener('change', function() {
        const filtre = filterSelect.value;
        afficherTaches(filtre);
    });
});


function filterTasks(filterType) {
    const tasksContainer = document.getElementById("tasksContainer");  
    tasksContainer.innerHTML = "";  

    
    let filteredTasks = [];

    if (filterType === "completed") {
        
        filteredTasks = taches.filter((task, index) => TableauTermine[index] === true);
    } else if (filterType === "uncompleted") {
        
        filteredTasks = taches.filter((task, index) => TableauTermine[index] === false);
    } else {
        
        filteredTasks = taches;
    }

    
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Liste des Tâches";
    table.appendChild(caption);

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    trHead.innerHTML = "<th>Tâche</th><th>État</th>";
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    
    filteredTasks.forEach((task, index) => {
        const tr = document.createElement("tr");

        const tdDescription = document.createElement("td");
        tdDescription.textContent = task;

        const tdEtat = document.createElement("td");
        tdEtat.textContent = TableauTermine[index] ? "Terminée" : "Non terminée";

        tr.appendChild(tdDescription);
        tr.appendChild(tdEtat);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tasksContainer.appendChild(table);  
}



const filterSelect = document.getElementById("taskFilter");

filterSelect.addEventListener("change", function() {
    const selectedFilter = filterSelect.value;  
    filterTasks(selectedFilter);  

});

function supprimerTache(event) {
    
    const boutonSupprimer = event.target;
    
    const index = parseInt(boutonSupprimer.dataset.index);

    
    taches.splice(index, 1);
    TableauTermine.splice(index, 1);
    const ligneHTML = boutonSupprimer.closest('tr');
    ligneHTML.remove();

    console.log('Tâche supprimée, index :', index);
    console.log('Liste des tâches mise à jour :', taches);

    
    AjouterTacheHTML();
}


