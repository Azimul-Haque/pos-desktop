const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var itemname = document.getElementById('itemname');
    var itemprice = document.getElementById('itemprice');
    var itemdiscountable = document.getElementById('itemdiscountable');

    // Save the item in the database
    if((itemname.value == '') | (itemprice.value == '') | (itemdiscountable.value == '')) {
      M.toast({html: 'কোন ঘর খালি রাখা যাবে না!'});
      //console.log('কিছুতো লেখেন!');
    } else {
      database.addItem(itemname.value, itemprice.value, itemdiscountable.value);
    }

    // Reset the input fields
    itemname.value = '';
    itemprice.value = '';
    itemdiscountable.value = '';
    // Repopulate the table
    populateTable();
  });
  
  // Add the edit button click event
  document.getElementById('update').addEventListener('click', () => {

    // Retrieve the input fields
    var itemid = document.getElementById('itemidEdit');
    var itemname = document.getElementById('itemnameEdit');
    var itemprice = document.getElementById('itempriceEdit');
    var itemdiscountable = document.getElementById('itemdiscountableEdit');

    // Save the item in the database
    if((itemname.value == '') | (itemprice.value == '') | (itemdiscountable.value == '')) {
      M.toast({html: 'কোন ঘর খালি রাখা যাবে না!'});
      //console.log('কিছুতো লেখেন!');
    } else {
      //console.log(itemid.value + itemname.value + itemprice.value + itemdiscountable.value);
      database.updateItem(itemid.value, itemname.value, itemprice.value, itemdiscountable.value);
      $('.modal').modal('close', "#modalEditItem");
    }
    
    // Reset the input fields
    itemname.value = '';
    itemprice.value = '';
    itemdiscountable.value = '';
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
      tableBody += '  <td>' + items[i].itemprice + '/-</td>';
      if(items[i].itemdiscountable == 0) {
        tableBody += '  <td> NO </td>';
      } else {
        tableBody += '  <td> YES </td>';
      }
      
      tableBody += '  <td><a class="btn btn-small waves-effect waves-light green modal-trigger" href="#modalEditItem" onclick="editItem(\'' + items[i]._id + '\')"><i class="material-icons">edit</i></a>';
      tableBody += '  <a class="btn btn-small waves-effect waves-light" onclick="deleteItem(\'' + items[i]._id + '\')"><i class="material-icons">delete</i></a></td>';
      tableBody += '</tr>';
    }
    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Edits an item
function editItem(id) {
  $('.modal').modal({
    dismissible: false
  });
  database.editItem(id);
  // Repopulate the table
  populateTable();
}

// Deletes an item
function deleteItem(id) {
  if (confirm("Want to delete?")) {
    database.deleteItem(id);
    M.toast({html: 'Deleted successfully!'});
  }
  // Repopulate the table
  populateTable();
}