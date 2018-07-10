// Initialize the database
var Datastore = require('nedb');
itemdb = new Datastore({ filename: 'db/items.db', autoload: true });
receiptdb = new Datastore({ filename: 'db/receipts.db', autoload: true });

// Adds an item
exports.addItem = function(itemname, itemprice) {

  // Create the item object
  var item = {
    "itemname": itemname,
    "itemprice": itemprice,
    "created_at": Date.now(),
  };

  // Save the item to the database
  itemdb.insert(item, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all items
exports.getItems = function(fnc) {

  // Get all items from the database
  itemdb.find({}).sort({ created_at: 1 }).exec(function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

// Returns a single item
exports.findItem = function(id) {
  itemdb.findOne({ _id: id }, function (err, doc) {
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
      document.getElementById('priceJson'+doc._id).value = doc.itemname + "," + newQty + "," + newPrice;
    } else {
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = "<span id='"+doc._id+"'>" + doc.itemname + "</span>";
      cell2.innerHTML = "<input type='number' min='1' value='1' id='qty"+doc._id+"' onchange='incrItemPrice(\"" + doc._id + "\",\"" + doc.itemprice + "\", \"" + doc.itemname + "\")' style='width: 35px !important; height: 20px !important;'>";
      cell3.innerHTML = "<span id='price"+doc._id+"' class='classPrice'>"+ doc.itemprice +"</span><input type='hidden' id='priceJson"+doc._id+"' class='itemJson' value='"+doc.itemname+","+ 1 +","+doc.itemprice+"'>";
      cell4.innerHTML = "<input type='button' value='x' onclick='deleteRow(this, \"" + doc._id + "\")' class='btn btn-small red accent-4 no-print' style='height:24px !important; width:24px !important; line-height: 24px; !important;padding: 0 0.1rem !important;'>";
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
  itemdb.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}


// Adds an receipt
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}
function formatMonth(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;

  return [month, year].join('-');
}

exports.addReceipt = function(receiptData, total) {
  // Create the receipt object
  var receipt = {
    "receiptno": Date.now(),
    "receiptdata": receiptData,
    "total": total,
    "created_at": Date.now(),
  };

  // Save the receipt to the database
  receiptdb.insert(receipt, function(err, newDoc) {
    // Do nothing
  });
  console.log('Receipt Added!');
}

// Returns all receipts
exports.getReceipts = function(fnc) {

  // Get all receipts from the database
  receiptdb.find({}).sort({ created_at:  -1 }).exec(function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

exports.findReceipt = function(receiptno) {
  var receipttable = '';
  receiptdb.findOne({ receiptno: receiptno }, function (err, doc) {
    console.log(doc.receiptdata);
    console.log(doc.receiptdata.items.length);
    receipttable += '<tr>';
    receipttable += '  <th>Name</th>';
    receipttable += '  <th>Qty</th>';
    receipttable += '  <th>Price</th>';
    receipttable += '</tr>';
    for(i = 0; i < doc.receiptdata.items.length; i++) {
      receipttable += '<tr>';
      receipttable += '  <td>' + doc.receiptdata.items[i].name + '</td>';
      receipttable += '  <td>' + doc.receiptdata.items[i].qty + '</td>';
      receipttable += '  <td>৳ ' + doc.receiptdata.items[i].price + '</td>';
      receipttable += '</tr>';
    }
    receipttable += '<tr>';
      receipttable += '  <td></td>';
      receipttable += '  <td><b>Total Price</b></td>';
      receipttable += '  <td><b>৳ ' + doc.total + '</b></td>';
    receipttable += '</tr>';
    document.getElementById('receipttable').innerHTML = receipttable;
  });
}

