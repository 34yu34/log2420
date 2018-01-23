/*********************************************************************
*  Add a table element (td) to a give row with the text text
*********************************************************************/
let addTableElement = (row, text,display) => {
  let column = document.createElement('td');
  let nameText = document.createTextNode(text);
  if (!display) {
    column.className = "hidden-row"
  }
  column.appendChild(nameText);
  row.appendChild(column);
}
/*********************************************************************
*	Add a row elements from the data-Output to a table
*********************************************************************/
let addRow = (material, table, display) => {
  // les titres des entete afin d'iterer au travers
  const tableHeader = ['libelle', 'concentration', 'conditions']
  const tableConditionHeader = ['temperature', 'pression', 'type', 'a']
  let row = document.createElement('tr');
  for (let header of tableHeader) {
    // on ajoute les elements du premier header
    if (header != 'conditions') {
      let text = material[header]
      addTableElement(row, text, display)
    } else {
      // lorsque on rentre dans condition on ajoutes les elements du second header
      for (let condition of tableConditionHeader) {
        let item = material[header][condition]
        if (item.unite && item.valeur) {
          let text = item['valeur']
          text += item['unite']
          addTableElement(row, text, display)
        } else {
          text = item
          addTableElement(row, text, display)
        }
      }
    }
  }
  table.appendChild(row);
}
/*********************************************************************
*	The onclick function for the button1 that shows the display none
*********************************************************************/
let isShow = false
let showHiddenRow = () => {
  let button1 = document.getElementById('button1');
  let rows = document.getElementsByClassName('hidden-row');
   for (let row of rows) {
     if (!isShow) {
       row.style.display = 'table-cell';
     } else {
       row.style.display = 'none';
     }
   }
   if (!isShow) {
     button1.innerHTML = "Hide Small C";
   } else {
     button1.innerHTML = "Show All";
   }
   isShow = !isShow;
}

/*********************************************************************
*  Main loop
*********************************************************************/
const table1 = document.getElementById('table-constante');
const table2 = document.getElementById('table-solution')
let req = new XMLHttpRequest();
req.responseType = 'json';
req.open('GET', 'db/data-output.json', true);
req.onload = function() {
  let table = req.response;
  //on popule la table des constantes
  let materials = table.output1;
  for (let i = 0; i < materials.length; i++) {
    addRow(materials[i], table1, materials[i].concentration > 0.1E-4)
  }
  //on popule la table des solutions
  let solutions = table.output2;
  let table2Head = document.createElement('tr');
  let table2Body = document.createElement('tr');
  // On ajoute une colone pour chaque element de output2
  for (let i = 0; i< solutions.length; i++) {
    text = solutions[i].libelle + " (" + solutions[i].unite + ")";
    addTableElement(table2Head, text, true);
    addTableElement(table2Body, solutions[i].valeur, true);
  }
  // On ajoute les lignes dans la table des solution
  table2.appendChild(table2Head);
  table2.appendChild(table2Body);
};
req.send(null);
