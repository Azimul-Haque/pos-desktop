const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var itemname = document.getElementById('itemname');
    var itemprice = document.getElementById('itemprice');

    // Save the item in the database
    if((itemname.value == '') | (itemprice.value == '')) {
      console.log(itemname.value);
    } else {
      database.addItem(itemname.value, itemprice.value);
    }

    // Reset the input fields
    itemname.value = '';
    itemprice.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the items table
function populateTable() {

  // Retrieve the items
  database.getItems(function(items) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < items.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + items[i].itemname + '</td>';
      tableBody += '  <td>' + items[i].itemprice + '</td>';
      tableBody += '  <td><a class="btn btn-small disabled" onclick="editItem(\'' + items[i]._id + '\')"><i class="material-icons">edit</i></a>';
      tableBody += '  <a class="btn btn-small disabled" onclick="deleteItem(\'' + items[i]._id + '\')"><i class="material-icons">delete</i></a></td>';
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Edits an item
function editItem(id) {

  // Edit the item from the database
  database.editItem(id);

  // Repopulate the table
  populateTable();
}

// Deletes an item
function deleteItem(id) {

  // Delete the item from the database
  database.deleteItem(id);

  // Repopulate the table
  populateTable();
}