const database = require('./js/database');

window.onload = function() {
  populateTable();
}

function populateTable() {

  // Retrieve the items
  database.getItems(function(items) {

    // Generate the table body
    var itemsButtonGroupBody = '';
    for (i = 0; i < items.length; i++) {
        itemsButtonGroupBody += '<div class="col s6 m4"><button class="col s12 m12 btn btn-large waves-effect waves-light orange" onclick="findItem(\'' + items[i]._id + '\')">'+ items[i].itemname +'</button><br/><br/><br/></div>';
    }

    // Fill the table content
    document.getElementById('itemsinhomepage').innerHTML = itemsButtonGroupBody;
  });
}

function findItem(id) {
    database.findItem(id);
}