# pdf to csv to qif or ofx

## pdf to csv
Download [Tabula](http://tabula.technology/)
```bash
$ java -Dfile.encoding=utf-8 -Xms256M -Xmx1024M -jar tabula.jar
```

## csv format for input into CSV Converter
```bash
$ node fix-tabula-cheque-account-export.js your-file.csv
$ node fix-tabula-credit-card.js your-file.csv
```

## csv to qif
[Online CSV Converter](http://www.csvconverter.biz/)


