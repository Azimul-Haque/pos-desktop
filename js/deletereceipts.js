// AS THE LINE BELOW IS DECLARED ON THE HOMEPAGE.JS FILE THE LINE IS BEING COMMENTED OUT
const database = require('./js/database');

window.onload = function() {
  
}


function deleteReceiptsBeforeTenDays() {
    database.deleteReceipts();
}