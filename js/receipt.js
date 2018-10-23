// AS THE LINE BELOW IS DECLARED ON THE HOMEPAGE.JS FILE THE LINE IS BEING COMMENTED OUT
const database = require('./js/database');

window.onload = function() {
  populateTable();
  getTodaysCollection();
}

function populateTable() {
  // Retrieve the items
  database.getReceipts(function(receipts) {
    // Generate the table body
    var tableBody = '';
    var modals = '';
    var dateTime = '';

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    var dateTenDaysBefore = new Date();
    dateTenDaysBefore.setHours(0,0,0,0);
    dateTenDaysBefore = dateTenDaysBefore.addDays(-10);
    //console.log(dateTenDaysBefore.getTime());
  
    for (i = 0; i < receipts.length; i++) {
      if(dateTenDaysBefore <= (new Date(receipts[i].created_at))) {
        //console.log(new Date(receipts[i].created_at));
        dateTime = dateFormat(new Date(receipts[i].created_at), "mmmm dd, yyyy, HH:MM TT");
        tableBody += '<tr>';
        tableBody += '  <td>' + receipts[i].receiptno + '</td>';
        tableBody += '  <td>৳ ' + receipts[i].total + '</td>';
        tableBody += '  <td> ' + receipts[i].discount + '%</td>';
        tableBody += '  <td>৳ ' + receipts[i].discounted_total + '</td>';
        tableBody += '  <td>' + dateTime + '</td>';
        tableBody += '  <td><a class="waves-effect waves-light btn btn-small" onclick="showDetailedReceipt(' + receipts[i].receiptno + ')"><i class="material-icons">view_list</i></a>';
        tableBody += '  <a class="btn btn-small disabled" onclick="#"><i class="material-icons">delete</i></a></td>';
        tableBody += '</tr>';
      //console.log(receipts[i].receiptdata.items);
      }
      
    }
    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

function getTodaysCollection() {
  // Retrieve the items
  database.getReceipts(function(receipts) {
    // Generate the table body
    var totalCollection = 0;
    for (i = 0; i < receipts.length; i++) {
      today = dateFormat(new Date(), "mmmm dd, yyyy");
      today_database = dateFormat(new Date(receipts[i].created_at), "mmmm dd, yyyy");
      if(today == today_database) {
        totalCollection = totalCollection + receipts[i].total;
      }
    }
    // Fill the table content
    document.getElementById('todaysCollection').innerHTML = totalCollection;
  });
}

function showDetailedReceipt(receiptno) {
  database.findReceipt(receiptno);
}



    


// function findItem(id) {
//     database.findItem(id);
// }

// function findItemPrice(id) {
//     database.findItemPrice(id);
// }