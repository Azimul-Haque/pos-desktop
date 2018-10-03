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

function findItemPrice(id) {
    database.findItemPrice(id);
}

// function to supply the data to sync data online...
function getDataToSync() {
  database.getReceipts(function(receipts) {
    //console.log(JSON.stringify(receipts));
    //console.log(receipts[0]['receiptdata']['items']);
    // $.ajax({
    //   url: "http://localhost/pos_api/syncapi_local.php",
    //   type: "POST",
    //   data: JSON.stringify(receipts),
    //   success: function(response) {
    //     console.log(response);
    //     M.toast({html: JSON.parse(response).totalcreated + ' rows are synced locally!', classes: 'rounded'});
    //   },
    //   error: function(jqXHR, textStatus, errorThrown) {
    //     console.log(textStatus, errorThrown);
    //   }
    // });
    $.ajax({
      url: "http://queenislandkitchen.com/pos_api/syncapi.php",
      type: "POST",
      data: JSON.stringify(receipts),
      success: function(response) {
        console.log(response);
        M.toast({html: JSON.parse(response).totalcreated + ' rows are synced!', classes: 'rounded'});
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });
}