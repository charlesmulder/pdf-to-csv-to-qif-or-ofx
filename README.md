# pdf to csv to qif or ofx

[Manual](http://www.gnucash.org/docs/v2.6/C/gnucash-guide/index.html)

## Installing
```bash
$ sudo apt-get install libdbd-sqlite3 gnucash
```

## Tips
When downloading statements from Standard Bank website we prefer OFX.

When converting from pdf to csv we prefer QIF

In asset and expense accounts, debits increase the balance and credits decrease the balance. In liability, equity and income accounts, credits increase the balance and debits decrease the balance.

In traditional double-entry accounting, the left column in the register is used for debits, while the right column is used for credits. Accountants record increases in asset and expense accounts on the debit (left) side, and they record increases in liability, revenue, and equity accounts on the credit (right) side. GnuCash follows this convention in the register.

Opening balances are linked to Equity::Opening Balance Account
Income is linked to Income Account

*Salary should be split as follows:*
In this example, choose the deposit account (Assets:Checking) and then enter the amount that is being deposited into it (e.g. $670). Follow this by entering the amounts for the various taxes: Expenses:Taxes:Federal account, $180; Expenses:Taxes:Medicare account, $90; and Expenses:Taxes:Social Security account, $60. Finally, enter the gross total of your paycheck ($1,000 in this example) as a withdrawal transfer from Income:Salary.

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

### csv format for input into CSV Converter
```bash
$ node personal/fix-tabula-cheque-account.js your-file.csv
$ node personal/fix-tabula-credit-card.js your-file.csv
```

### csv to qif
[Online CSV Converter](http://www.csvconverter.biz/)


