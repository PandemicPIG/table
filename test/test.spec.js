/*global describe, it*/

describe('test to check', () => {
    
    it('test tabel randerer', () => {
        catalogue = [
            {
                name: 'vasile',
                date: '2910-07-22',
                email: 'aaaa@bbb.cc',
                children: '4'
            },
            {
                name: 'gigi',
                date: '2908-07-22',
                email: 'aaab@bbb.cc',
                children: '2'
            },
            {
                name: 'gherghina',
                date: '2912-07-22',
                email: 'aaac@bbb.cc',
                children: '3'
            }
        ];
        table = new TableView('myTableId', 'body', tableConfig, catalogue);
        expect(document.getElementById('myTableId').innerHTML.length);
    });
    
    it('test if adding a filter works', () => {
        table.addFilter('name', 'gi');
        table.addFilter('email', 'a');
        expect(tableConfig.filters.name).to.deep.equal('gi');
        expect(tableConfig.filters.email).to.deep.equal('a');
    });
    
    it('test if setting order works', () => {
        
        //first click selects the column
        table.order('email');
        expect(tableConfig.sortCol).to.equal('email');
        expect(tableConfig.descending).to.equal(false);
        
        table.order('name');
        expect(tableConfig.sortCol).to.equal('name');
        expect(tableConfig.descending).to.equal(false);
        
        //second click changes direction
        table.order('name');
        expect(tableConfig.sortCol).to.equal('name');
        expect(tableConfig.descending).to.equal(true);
        
    });
    
    it('test filters', () => {
        var newArray = table.filterData(catalogue);
        expect(newArray).to.deep.equal(
            [
                {
                    name: 'gigi',
                    date: '2908-07-22',
                    email: 'aaab@bbb.cc',
                    children: '2'
                }
            ]
        );
    });
    
    it('test sort', () => {
        tableConfig.filters = {};
        table.order('name');
        var newArray = table.filterData(catalogue);
        expect(newArray).to.deep.equal(
            [
                {
                    name: 'gherghina',
                    date: '2912-07-22',
                    email: 'aaac@bbb.cc',
                    children: '3'
                },
                {
                    name: 'gigi',
                    date: '2908-07-22',
                    email: 'aaab@bbb.cc',
                    children: '2'
                },
                {
                    name: 'vasile',
                    date: '2910-07-22',
                    email: 'aaaa@bbb.cc',
                    children: '4'
                }
                
            ]
        );
    });
    
    it('test form data', () => {
        form = new InsertForm('myFormId', 'body', tableConfig, catalogue, 'Add new');
        
        document.getElementById('myFormId_name').value = 'new_name';
        document.getElementById('myFormId_date').valueAsDate = new Date('2911-09-06');
        document.getElementById('myFormId_email').value = 'new@name.com';
        document.getElementById('myFormId_children').value = '3';
        
        data = form.getFormData('myFormId',tableConfig);
        
        expect(data).to.deep.equal({
                    name: 'new_name',
                    date: '2911-09-06',
                    email: 'new@name.com',
                    children: '3'
                });
    });
    
    it('test add data', () => {
        form.addNewRow(data, catalogue);
        expect(catalogue.findIndex(e => { 
            return e.name == 'new_name' && e.date == '2911-09-06' && e.email == 'new@name.com' && e.children == '3'
        }) != -1);
    });
});