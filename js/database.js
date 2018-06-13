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
  // Get all items from the database
  db.findOne({ _id: id }, function (err, doc) {
    console.log(doc);
    document.getElementById('testItem').innerHTML = doc.itemname + ' - tk. ' + doc.itemprice;
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