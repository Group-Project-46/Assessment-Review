// const { collection } = require("../server/models/bst");

async function loadNodes(){
  await fetch('/api/linkedlist')
    .then(res => res.json())
    .then(data => {

// this.node = document.createElement('div');
//     this.node.setAttribute('id', 'head');
//     el.appendChild(this.node);
      const list = document.getElementById('main');
      list.innerHTML ='';
      //map all data into htmlString;
      data.forEach(node => {
        const li = document.createElement('li');
        li.setAttribute('id', node._id);
        li.innerText = `value: ${node.value} next: ${node.next}`;
        // add in an update and delete button
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', node._id);
        deleteButton.className = 'deleteButton';
        deleteButton.innerText = 'Delete';
        const updateButton = document.createElement('button');
        updateButton.setAttribute('id', node._id);
        updateButton.innerText = 'Update';
        updateButton.className = 'updateButton';
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        list.appendChild(li);
      })
    })
    .then(() => {
      const deleteButtons = document.querySelectorAll('.deleteButton');
      console.log('DELETE BUTTON : ', deleteButtons);
      deleteButtonListener(deleteButtons);
    })
    .catch(err => console.log('CANNOT GET FETCH :', err));  
}

document.addEventListener('DOMContentLoaded', () => {

  loadNodes();

  const submitNode = document.getElementById('submitNode');

  submitNode.addEventListener('click', (e) => {
    const nodeValue = document.getElementById('nodeValue').value;
    
    fetch('/api/linkedlist',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({value: nodeValue})
    })
      .then(res => res.json())
      .then(nodeId => console.log('nodeId: ', nodeId))
      .catch((err) => console.log('CANNOT ADD NODE: ', JSON.stringify(err)));

    loadNodes();
      
  });


})

// function to add an eventlistener to every button
// takes an array of buttons
const deleteButtonListener = (deleteButtons) => {
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // fetch delete request here
      fetch(`/api/linkedlist/${button.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
        .then(()=> loadNodes())
        .catch(err => console.log('CANNOT DELETE : ', JSON.stringify(err)));
    })
  })
}