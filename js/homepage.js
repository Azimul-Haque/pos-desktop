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
        if(items[i].itempoint == undefined) {
          items[i].itempoint = 'No point assigned.';
        }
        itemsButtonGroupBody += '<button class="col s12 m12 btn btn-small waves-effect waves-light aqua" onclick="findItem(\'' + items[i]._id + '\')" style="font-size:10px; width: 32%; float: left; margin: 3px;" title="Point: '+ items[i].itempoint +'">'+ items[i].itemname +'</button>';
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
    // console.log(JSON.stringify(receipts));
    // console.log(receipts[0]['receiptdata']['items']);
    $.ajax({
      url: "http://localhost/pos_api/syncapi_local.php",
      type: "POST",
      data: JSON.stringify(receipts),
      success: function(response) {
        console.log(response);
        M.toast({html: JSON.parse(response).totalcreated + ' rows are synced locally!', classes: 'rounded'});
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
    // $.ajax({
    //   url: "mysitename.com/pos_api/syncapi.php",
    //   type: "POST",
    //   data: JSON.stringify(receipts),
    //   success: function(response) {
    //     console.log(response);
    //     M.toast({html: JSON.parse(response).totalcreated + ' rows are synced!', classes: 'rounded'});
    //   },
    //   error: function(jqXHR, textStatus, errorThrown) {
    //     console.log(textStatus, errorThrown);
    //   }
    // });
  });
}