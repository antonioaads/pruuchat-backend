/*CONSTANTS*/

require('babel-core/register')










// Routes
var routes = require('./api/routes/app.js');
routes.listen();


// database.query('SELECT * FROM COUNTRY');

// var readline = require('readline');
// var fs = require('fs');
// var rl = readline.createInterface({
//   input: fs.createReadStream('./script.sql'),
//   terminal: true
//  });
//
// rl.on('line', function(chunk){
//     con.query(chunk.toString('ascii'), function(err, sets, fields){
//      if(err) console.log(err);
//     });
// });
//
// rl.on('close', function(){
//   console.log("finished");
//   con.end();
// });
//
// con.connect(function(err){
//   if (err) throw err;
//   con.query("SELECT * FROM Country", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });