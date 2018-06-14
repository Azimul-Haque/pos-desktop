// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/persons.db', autoload: true });

// Adds an item
exports.addItem = function(itemname, itemprice) {

  // Create the item object
  var item = {
    "itemname": itemname,
    "itemprice": itemprice,
    "created_at": Date.now(),
  };

  // Save the item to the database
  db.insert(item, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all items
exports.getItems = function(fnc) {

  // Get all items from the database
  db.find({}).sort({ created_at: 1 }).exec(function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

// Returns a single item
exports.findItem = function(id) {
  db.findOne({ _id: id }, function (err, doc) {
    var table = document.getElementById("dynamicItems");
    var row = table.insertRow(0);

    if(document.getElementById(doc._id)) {
      var oldQty = document.getElementById('qty'+doc._id).value;
      var oldPrice = document.getElementById('price'+doc._id).innerHTML;
      if(oldQty == '') {
        oldQty = 0;
      }
      oldQty = parseInt(oldQty);
      oldPrice = parseInt(oldPrice);

      var newQty = oldQty + 1;
      document.getElementById('qty'+doc._id).value = newQty;
      var newPrice = oldPrice + parseInt(doc.itemprice);
      document.getElementById('price'+doc._id).innerHTML = newPrice;
    } else {
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = "<span id='"+doc._id+"'>" + doc.itemname + "</span>";
      cell2.innerHTML = "<input type='number' min='1' value='1' id='qty"+doc._id+"' onchange='incrItemPrice(\"" + doc._id + "\",\"" + doc.itemprice + "\")' style='width: 35px !important; height: 20px !important;'>";
      cell3.innerHTML = "<span id='price"+doc._id+"' class='classPrice'>"+ doc.itemprice +"</span>";
      cell4.innerHTML = "<input type='button' value='x' onclick='deleteRow(this, \"" + doc._id + "\")' class='btn btn-small red accent-4' style='height:24px !important; width:24px !important; line-height: 24px; !important;padding: 0 0.1rem !important;'>";
    }
    
    sumOfColumns();
  });
  
}

function sumOfColumns(){
  var totalPrice = 0;
  $(".classPrice").each(function(){
      totalPrice += parseInt($(this).html());
      $("#totalPrice").html(totalPrice);
  });
}

// Edits an item
exports.editItem = function(id) {

  // edit the item
}

// Deletes an item
exports.deleteItem = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}