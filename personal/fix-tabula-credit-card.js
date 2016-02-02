var fs = require('fs');
var file = process.argv[2];
var csv = require('csv');
var util = require('util');
var moment = require('moment');
var numeral = require('numeral');

moment.locale('af', {
    monthsShort : [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Des"
    ]
});

fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      csv.parse(data, {}, function(err, arr) {
          csv.transform(arr, (row) => {
              //console.log(row);
              // fix date format
              if(row[0]) {
                  // [ '31 Mar 14', '31', 'Mar', '14', index: 0, input: '31 Mar 14 ' ]
                  var matches = row[0].match(/(\d+)\s(\w+)\s(\d{2})/);
                  if(matches[1].length === 1) {
                      var day = moment(matches[1], 'D').format('DD');
                  } else {
                      var day = matches[1];
                  }
                  var month = moment(matches[2], 'MMM').format('MM');
                  var year = moment(matches[3], 'YY').format('YYYY');
                  //row[0] = row[0].replace(/(\d+)\s(\w+)\s(\d{2})/, '$1 $2 2014');
                  row[0] = util.format('%s/%s/%s', month, day, year);
              }
              //remove commas
              if(row[1]) {
                  row[1] = row[1].replace(/[, ]+/g, ' ').trim();
              }
              // move purchases to right
              if(row[2]) {
                  if( ! /-/.test(row[2])) {
                      //console.log('positive');
                      row[3] = numeral(row[2]).format('0.00');
                      row[2] = 0;
                  } else {
                      //console.log('negative');
                      var negative = numeral(row[2]).format('0.00') 
                      var positive = negative *= -1;
                      row[2] = positive;
                      row[3] = 0;
                  }
              }
              //console.log(row);
              //console.log("\n")
              return row;
          }, (err, output) => {
              if (err) throw err;
              // add headings for csv converter
              output.unshift(['date', 'description', 'payment', 'charge']);
              csv.stringify(output, function(err, string){
                  var newFile = file.replace(/(.*)\.(.*)/, '$1-edited.$2');
                  fs.writeFile(newFile, string, (err) => {
                      if (err) throw err;
                      console.log('It\'s saved!');
                  });
              });
          });
      });
      
});
