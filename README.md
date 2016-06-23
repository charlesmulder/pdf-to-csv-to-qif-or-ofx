# pdf to csv to qif or ofx

When downloading statements from Standard Bank website we prefer OFX.
When converting from pdf to csv we prefer QIF

## pdf to csv
Download [Tabula](http://tabula.technology/)
```bash
$ java -Dfile.encoding=utf-8 -Xms256M -Xmx1024M -jar tabula.jar
```

## csv format for input into CSV Converter
```bash
$ node personal/fix-tabula-cheque-account.js your-file.csv
$ node personal/fix-tabula-credit-card.js your-file.csv
```

## csv to qif
[Online CSV Converter](http://www.csvconverter.biz/)


