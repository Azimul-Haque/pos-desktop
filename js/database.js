// Initialize the database
var Datastore = require('nedb');
itemdb = new Datastore({ filename: 'db/items.db', autoload: true });
receiptdb = new Datastore({ filename: 'db/receipts.db', autoload: true });

// Adds an item
exports.addItem = function(itemname, itemprice, itempoint, itemdiscountable) {

  // Create the item object
  var item = {
    "itemname": itemname,
    "itemprice": itemprice,
    "itempoint": itempoint,
    "itemdiscountable": itemdiscountable,
    "created_at": Date.now(),
  };

  // Save the item to the database
  itemdb.insert(item, function(err, newDoc) {
    // Do nothing
    M.toast({html: 'Added!'});
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
    var tableP = document.getElementById("dynamicItemsPrint");
    var row = table.insertRow(0);
    var rowP = tableP.insertRow(0);

    var discountyes = parseInt($("#discountyes").text());
    var discountno = parseInt($("#discountno").text());
    
    if(doc.itemdiscountable == 0) {
      discountno = discountno + parseInt(doc.itemprice);
      document.getElementById('discountno').innerHTML = discountno;
    } else if(doc.itemdiscountable == 1) {
      discountyes = discountyes + parseInt(doc.itemprice);
      document.getElementById('discountyes').innerHTML = discountyes;
    }
    console.log(discountyes + discountno);


    if(document.getElementById(doc._id)) {
      var oldQty = document.getElementById('qty'+doc._id).value;
      var oldPrice = document.getElementById('price'+doc._id).innerHTML;
      var oldPoint = document.getElementById('point'+doc._id).innerHTML;
      if(oldQty == '') {
        oldQty = 0;
      }
      if(isNaN(oldPoint)) {
        oldPoint = 0;
      }
      oldQty = parseInt(oldQty);
      oldPrice = parseInt(oldPrice);
      oldPoint = parseInt(oldPoint);

      var newQty = oldQty + 1;
      document.getElementById('qty'+doc._id).value = newQty;
      document.getElementById('qtyP'+doc._id).innerHTML = newQty;
      var newPrice = oldPrice + parseInt(doc.itemprice);
      document.getElementById('price'+doc._id).innerHTML = newPrice;
      document.getElementById('priceP'+doc._id).innerHTML = newPrice;

      if(doc.itempoint == undefined) {
        doc.itempoint = 0;
      }
      var newPoint = oldPoint + parseInt(doc.itempoint);
      document.getElementById('point'+doc._id).innerHTML = newPoint;
      document.getElementById('pointP'+doc._id).innerHTML = newPoint;

      document.getElementById('priceJson'+doc._id).value = doc.itemname + "," + newQty + "," + newPrice;
    } else {
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      var cell1P = rowP.insertCell(0);
      var cell2P = rowP.insertCell(1);
      cell2P.className = "centeralign";
      var cell3P = rowP.insertCell(2);
      cell3P.className = "rightalign";

      if(doc.itempoint == undefined) {
        doc.itempoint = 0;
      }
      cell1.innerHTML = "<span id='"+doc._id+"'>" + doc.itemname +": </span><span id='point"+doc._id+"' class='classPoint'>"+ doc.itempoint + "</span>";
      cell1P.innerHTML = "<span id='P"+doc._id+"' style='font-size: 11px;'>" + doc.itemname +": </span><span id='pointP"+doc._id+"'>"+ doc.itempoint + "</span>";

      cell2.innerHTML = "<input type='number' min='1' value='1' id='qty"+doc._id+"' onchange='incrItemPrice(\"" + doc._id + "\",\"" + doc.itemprice + "\", \"" + doc.itempoint + "\", \"" + doc.itemname + "\", \"" + doc.itemdiscountable + "\")' style='width: 35px !important; height: 20px !important;'>";
      cell2P.innerHTML = "<span id='qtyP"+doc._id+"'>1</span>";
      
      cell3.innerHTML = "<span id='price"+doc._id+"' class='classPrice'>"+ doc.itemprice +"</span><input type='hidden' id='priceJson"+doc._id+"' class='itemJson' value='"+doc.itemname+","+ 1 +","+doc.itemprice+"'>";
      cell3P.innerHTML = "<span id='priceP"+doc._id+"'>"+ doc.itemprice +"</span>";
      
      cell4.innerHTML = "<input type='button' value='x' onclick='deleteRow(this, \"" + doc._id + "\", \"" + doc.itemdiscountable + "\")' class='btn btn-small red accent-4 noPrint' style='height:24px !important; width:24px !important; line-height: 24px; !important;padding: 0 0.1rem !important;'>";
    }
    
    sumOfColumns();
  });
  
}

function sumOfColumns(){
  var totalPrice = 0;
  $(".classPrice").each(function(){
      totalPrice += parseInt($(this).html());
      $("#totalPrice").html(totalPrice);
      $("#totalPriceP").html(totalPrice);
  });
  var totalPoint = 0;
  $(".classPoint").each(function(){
      totalPoint += parseInt($(this).html());
      $("#totalPoint").html(totalPoint);
      $("#totalPointP").html(totalPoint);
  });
  console.log(totalPrice);
}

// Edits an item
exports.editItem = function(id) {
  itemdb.findOne({ _id: id }, function (err, doc) {
    document.getElementById('itemidEdit').value = doc._id;
    document.getElementById('itemnameEdit').value = doc.itemname;
    document.getElementById('itempriceEdit').value = doc.itemprice;
    document.getElementById('itemdiscountableEdit').value = doc.itemdiscountable;
    console.log(doc.itempoint);
    if(doc.itempoint != undefined) {
      document.getElementById('itempointEdit').value = doc.itempoint;
    } else {
      document.getElementById('itempointEdit').value = 0;
    }
  });
}

// Update an item
exports.updateItem = function(itemid, itemname, itemprice, itempoint, itemdiscountable) {
  itemdb.update({ _id: itemid }, 
    { $set: { itemname: itemname, itemprice: itemprice, itempoint: itempoint, itemdiscountable: itemdiscountable } }, 
    { multi: true }, function (err, numReplaced) {
    // numReplaced = 3
    console.log(numReplaced);
    if(numReplaced > 0) {
      M.toast({html: 'Successfully updated!'});
    } else {
      M.toast({html: 'Problem occured! Try Later.'});
    }
    
  });
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

exports.addReceipt = function(receiptno, receiptData, total, discount, discountedTotal, customQty, tableNo) {
  // Create the receipt object
  var receipt = {
    "receiptno": receiptno,
    "receiptdata": receiptData,
    "total": total,
    "discount": discount,
    "discounted_total": discountedTotal,
    "customQty": customQty,
    "tableNo": tableNo,
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
    for(i = 0; i < doc.receiptdata.items.length; i++) {
      receipttable += '<tr>';
      receipttable += '  <td style="font-size: 11px;">' + doc.receiptdata.items[i].name + '</td>';
      receipttable += '  <td>' + doc.receiptdata.items[i].qty + '</td>';
      receipttable += '  <td class="rightalign">' + doc.receiptdata.items[i].price + '</td>';
      receipttable += '</tr>';
    }
    document.getElementById('tableNo').innerHTML = doc.tableNo;
    document.getElementById('customQty').innerHTML = doc.customQty;
    document.getElementById('receiptnoRP').innerHTML = doc.receiptno;
    document.getElementById('totalPriceRP').innerHTML = doc.total;
    document.getElementById('discountRP').innerHTML = doc.discount;
    document.getElementById('totalPriceFinalRP').innerHTML = doc.discounted_total;

    document.getElementById('receipttable').innerHTML = receipttable;
  });
}

