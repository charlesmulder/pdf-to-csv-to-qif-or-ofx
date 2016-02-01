var fs = require('fs');
var file = process.argv[2];
var csv = require('csv');
var util = require('util');


fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    csv.parse(data, {}, function(err, arr) {
        var line = [];
        csv.transform(arr, (row) => {
            if( ! row[4]) { // then description from previous line 

            } else { // normal line entry or balance brought forward line

                if(! row[1] && ! row[2]) {  // balance brought forward line

                    if(row[3]) { //first balance brought forward line

                    } else { //balance brought forward line later on
                        
                    }
                } else { //normal line

                }
            }
            // fix date format
            if(row[3]) {
                row[3] = row[3].replace(/(\d{2})\s(\d{2}).*/, '$1/$2/2014');
            }
            //format numbers
            if(row[2]) {
                row[2] = row[2].replace(/[\.]+/g, '').trim();
                row[2] = row[2].replace(/[,]+/g, '.').trim();
            }
            if(row[4]) {
                row[4] = row[4].replace(/[\.]+/g, '').trim();
                row[4] = row[4].replace(/[,]+/g, '.').trim();
            }
            // move debits to previous column
            if(row[2]) {
                if( ! /-/.test(row[2])) {
                    row[1] = row[2]
                    row[2] = 0.00;
                } else {
                    row[1] = 0.00;
                    row[2] = row[2].replace(/[-]/, '').trim();
                }
            }
            console.log(row);
            return row;
        }, (err, output) => {
            if (err) throw err;
            csv.stringify(output, function(err, string){
                var newFile = file.replace(/(.*)\.(.*)/, '$1-edited.$2');
                fs.writeFile(newFile, string, (err) => {
                    if (err) throw err;
                    console.log('It\'s saved!');
                    console.log('Date is hard coded to 2014 make sure its correct');
                });
            });
        });
    });

});
