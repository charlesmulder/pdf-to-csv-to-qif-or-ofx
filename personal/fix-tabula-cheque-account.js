var fs = require('fs');
var file = process.argv[2];
var year = process.argv[3];
var csv = require('csv');
var util = require('util');


fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    csv.parse(data, {}, function(err, arr) {

        var queue = [];

        csv.transform(arr, (row) => {

            // fix date format
            if(row[3]) {
                row[3] = row[3].replace(/(\d{2})\s(\d{2}).*/, '$1/$2/'+year);
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

            /**
             * overflowing description
             * append to previous line description 
             * and return
             */
            if( ! row[4] && queue.length) { 
                var previous = queue[0];
                queue = [];
                previous[0] += row[0];
                //console.log(previous);
                return previous;
            } else { 
                /**
                 * normal or balance brought forward entry
                 */
                if(! row[1] && ! row[2]) {  // balance brought forward line

                    if(row[3]) { //first balance brought forward line
                        //console.log(row);
                        return row;
                    } else { //balance brought forward line later on
                        return false;
                    }

                } else { 
                    /**
                     * normal entry 
                     * if item in queue
                     * then dump queue to var, assign current entry to new queue, return var
                     * else
                     * assign current entry to queue
                     */
                    if(queue.length) {
                        var previous = queue[0];
                        queue[0] = row;
                        //console.log(previous);
                        return previous;
                    } else {
                        queue.push(row);
                        return false;
                    }
                }
            }
            //console.log(row);
            //return row;
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
