//var catalogue = [];
var catalogue = [
            {
                name: 'alex',
                date: '1985-07-22',
                email: 'alex@bbb.cc',
                children: '1'
            },
            {
                name: 'victor',
                date: '1991-02-02',
                email: 'victor@bbb.cc',
                children: '0'
            },
            {
                name: 'monika',
                date: '1989-11-08',
                email: 'moky@bbb.cc',
                children: '1'
            }
        ];

/*
    sets up the filter and table default settings
*/

var tableConfig = {
    header:[
        { name:'name', field:'name', type:'text', filter:true },
        //{ name:'class', field:'class', type:'text', filter:true, optional:true },
        { name:'date of birth', field:'date', type:'date' },
        { name:'email addres', field:'email', type:'email', filter:true },
        { name:'number of children', field:'children', type:'number' }
    ],
    //descending: false,
    //sortCol: 'name',
    //filters: { name:'gi' }
};


onload = () => {
    var form = new InsertForm('myFormId', '.form_wrapper', tableConfig, catalogue, 'Add new row');
    var table = new TableView('myTableId', '.table_wrapper', tableConfig, catalogue);
    //var form2 = new InsertForm('mySecondFormId', 'body', tableConfig, catalogue, 'Add new');
}