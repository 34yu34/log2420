let addTableElement = (row, text,display) => {
  let column = document.createElement('td');
  let nameText = document.createTextNode(text);
  column.className = 'border-color';
  if (!display) {
    column.className = "border-color hidden-row"
  }
  column.appendChild(nameText);
  row.appendChild(column);
}

let addRow = (material, table, display) => {
  const tableHeader = ['libelle', 'concentration', 'conditions']
  const tableConditionHeader = ['temperature', 'pression', 'type', 'a']
  let row = document.createElement('tr');
  for (let header of tableHeader) {
    if (header != 'conditions') {
      let text = material[header]
      addTableElement(row, text, display)
    } else {
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

const table1 = document.getElementById('table1');
const table2 = document.getElementById('table2')
let req = new XMLHttpRequest();
req.responseType = 'json';
req.open('GET', 'data-output.json', true);
req.onload = function() {
  let table = req.response;
  let materials = table.output1;
  for (let i = 0; i < materials.length; i++) {
    addRow(materials[i], table1, materials[i].concentration > 0.1E-4)
  }
  let solutions = table.output2;
  let table2Head = document.createElement('tr');
  let table2Body = document.createElement('tr');
  for (let i = 0; i< solutions.length; i++) {
    text = solutions[i].libelle + " (" + solutions[i].unite + ")";
    addTableElement(table2Head, text, true);
    addTableElement(table2Body, solutions[i].valeur, true);
  }
  table2.appendChild(table2Head);
  table2.appendChild(table2Body);
};
req.send(null);
