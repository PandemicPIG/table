## dynamic generated table and form


The table app can take any table structure as log as it is 
provided as an array of objects (can be empty) and an config. 

In the array of objects, each object is one row of the table.
Also each element of the row should be defined by a key that 
markes the column.

Ex:
```js
var my_tabel = [
  {
      firstname: 'alex',
      lastname: 'lion',
      date: '1985-07-22',
      email: 'alex@bbb.cc',
      children: '1',
      postcode: 'EC1M 9AF'
  }
];
```
The config should follow the model of the table or it should
set a model for an empty table.

The config.header array will contain objects with settings
for each column:
```
name: the display name
field: the column key
type: the input type for the input form
filter: will add filter input for the column
optional: will make the field optional in the input form
```
Also the default filters for the first rander of the table
can be added in the config:
```
sortCol: is the key of the column the table will be sort by
descending: true - for arranging bottom to up

filters: will apply filters for the table for each column 
provided by the model of columnName:'toMatchInColumn'
```

Ex:
```js
var config = {
    header:[
        { name:'first name', field:'firstname', type:'text', filter:true },
        { name:'last name', field:'lastname', type:'text', filter:true },
        { name:'date of birth', field:'date', type:'date', optional:true },
        { name:'email addres', field:'email', type:'email', filter:true },
        { name:'number of children', field:'children', type:'number' },
        { name:'postcode', field:'postcode', type:'text', filter:true, optional:true }
    ],
    sortCol: 'firstname',
    descending: true,
    filters: { name:'al' }
};
```

In order to rander a table in page based on the data 
provided above, we need to be initiat a new object
of class TableView.

It will take the folowing mandatory parameters
```
  [id of table to be created],
  [css selector of the parent in which the table will be placed],
  [the config object seted above],
  [the table array to be used]
```
Ex:
```js
var table = new TableView('myTableId', '.table_wrapper', config, my_table);
```

To rander a form in the page based on the data 
provided above, we need to be initiat a new object
of class InsertForm.

It will take the folowing mandatory parameters
```
  [id of form to be created],
  [css selector of the parent in which the form will be placed],
  [the config object seted above],
  [the table array to be used]
```  
it can also take a fifth optional parameter
``` 
  [the text to be displayed on the form button] //default is 'Add new'
```
Ex:
```js
var form = new InsertForm('myFormId', '.form_wrapper', config, my_table, 'Add new row');
```

Styleling can be ajusted if necesary, the table
and form will adjust to the whole area of their
parent by default
