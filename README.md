# pdf to csv to qif or ofx

[Manual](http://www.gnucash.org/docs/v2.6/C/gnucash-guide/index.html)

## Installing
```bash
$ sudo apt-get install libdbd-sqlite3 gnucash
```

## Tips

- Use process dates for credit card transactions.
- Use posting dates for CSV imports

> Salary should be split as follows: In this example, choose the deposit account (Assets:Checking) and then enter the amount that is being deposited into it (e.g. $670). Follow this by entering the amounts for the various taxes: Expenses:Taxes:Federal account, $180; Expenses:Taxes:Medicare account, $90; and Expenses:Taxes:Social Security account, $60. Finally, enter the gross total of your paycheck ($1,000 in this example) as a withdrawal transfer from Income:Salary.

### Depreciation
[write off table](http://www.sars.gov.za/AllDocs/LegalDoclib/Rulings/LAPD-IntR-R-BGR-2012-07%20-%20Wear%20And%20Tear%20Depreciation%20Allowance.pdf)

Asset type |  Rate
:--- | ---:
Air-conditioners | 16,6%
Burglar alarms (removable) | 10%
Computers (PC) | 33,3%
Computer Software | 50%
Fax machines | 33,3%
Furniture and fittings | 16,6%
Motorcycles | 25%
Passenger Cars | 20%
Photocopying Equipment | 20%
Power tools (hand-operated) | 20%
Shop fittings | 16,6%
Telephone equipment | 20%
Trucks (heavy duty) | 33,3%
Trucks (other) | 25%
Workshop equipment | 20%

### Reconciliation
At the bottom of the Reconcile window there is a Difference field, which should show 0.00 when you are done reconciling. If it shows some other value, then either you have missed transactions, or some amounts may be incorrect in GnuCash. (Or, less likely, the bank may have made an error.)

#### Starting Balance
This is a non-editable item which displays the balance from the previous reconciliation. It should match the starting balance in your statement.

#### Ending Balance
This field should be filled with the ending balance as it appears in the statement.

## Converting

### pdf to csv

Download [Tabula](http://tabula.technology/)

```bash
$ java -Dfile.encoding=utf-8 -Xms256M -Xmx1024M -jar tabula.jar
```

## Editing CSV in Libre Calc

### Merging columns

```excel
# D1 E1 F1
=D1&" "&E1&" "&F1
```

### Text to dates

Ensure locale is set to UK

`Tools > Options > Language Settings > Locale setting = English (UK)`

Add a new column of `Date` type

```
Format > Cells > Catergory > Date > Format = 31/12/99
                                    Language = Default - English (UK)
```

Call `DATEVALUE()` function from cells of new date column using textual date representation as input argument.

```excel
=DATEVALUE(A1)
```


