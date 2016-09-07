class TableView {
    constructor(id, parent, config, catalogue){
        /* 
            creates a table with the id provided,
            in the parent specified,
            with the data from the catalogue 
        */
        
        this.id = id;
        this.parent = parent;
        this.config = config;
        this.catalogue = catalogue;
        
        //basic checks
        if( this.config.header.length < 1 && !this.config.header[0].name ) console.error('wrong configuration');
        
        //if no filters or sort is set, set defaults;
        if(!this.config.filters) this.config.filters = {};
        if(!this.config.descending) this.config.descending = false;
        if(!this.config.sortCol) this.config.sortCol = this.config.header[0].name;
        
        //lunch the table
        this.randerTable();
        
        // add listener for changes in the catalogue
        this.addWatcher( this.catalogue );
        
        // add listener for changes in the filter settings
        this.lunchFilters();
    }
    
    randerTable(){
        //clear previos state of table if existing
        document.getElementById(this.id) && document.getElementById(this.id).remove();
        
        //make new table
        this.table = document.createElement('table');

        var tb_header = '<thead><tr>';
        this.config.header.map( col => {
            var addclass = '';
            if( col.field == this.config.sortCol ) addclass = 'class="' + (this.config.descending ? 'down' : 'up') + '"';
            tb_header += '<th><a data-field="'+col.field+'" '+addclass+' >' + col.name + '</a>';
            if( col.filter ){
                var filter = this.config.filters[col.field] ? this.config.filters[col.field] : '';
                tb_header += '<input type="'+col.type+'" data-field="'+col.field+'" value="'+filter+'" placeholder="filter '+col.field+'"/>';
            }
            tb_header += '</th>';
        });
        tb_header += '</tr></thead>';

        var tb_body = '<tbody></tbody>';

        this.table.setAttribute('id',this.id);
        this.table.innerHTML = tb_header;
        this.table.innerHTML += tb_body;

        document.querySelectorAll(this.parent)[0].appendChild(this.table);
        this.updateTable();
        this.setSort();
    }
    
    updateTable(){
        var tb_body = '';
        this.filterData(catalogue).map( row => {
            tb_body += '<tr>';
            this.config.header.map(item => tb_body += '<td>' + (row[item.field] ? row[item.field] : '') + '</td>');
            tb_body += '</tr>';
        });
        
        document.querySelectorAll('#'+this.id+' tbody')[0].innerHTML = tb_body;
    }
    
    addWatcher(cat, action){
        //creates new event to be called each time catalog gets a new element
        this.update = new Event('update');
        
        //attach element call to catalog push methode
        cat.push = (...args) => {
            args.map( elm => Array.prototype.push.call(cat, elm) );
            document.dispatchEvent(this.update);
        }
        
        document.addEventListener('update',() => {
            //triggers each time a new element is added via push method in the catalog
            this.updateTable();
        });
    }
    
    setSort(){
        document.querySelectorAll('#'+this.id+' th a').forEach(item => item.addEventListener('click',elm => {
            this.order(elm.srcElement.dataset.field);
            document.querySelectorAll('#'+this.id+' th a').forEach(item => {
                item.classList.remove('up');
                item.classList.remove('down');
            });
            elm.srcElement.classList.add( this.config.descending ? 'down' : 'up' );
            this.updateTable();
        }));
    }
    
    order(col){
        this.config.descending = this.config.sortCol === col ? !this.config.descending : false;
        this.config.sortCol = col;
    }
    
    lunchFilters(){
        document.querySelectorAll('#'+this.id+' th input').forEach(item => item.addEventListener('keyup',elm => {
            
            this.addFilter(elm.srcElement.dataset.field, elm.srcElement.value);
            
            this.updateTable();
        }));
    }
    
    addFilter(col, input){
        this.config.filters[col] = input;
    }
    
    filterData(cat){
        var c = this.config.sortCol;

        var new_cat = cat.filter(item => {

            //if all filters ar matching return true
            var match = true;
            //get all filters
            Object.keys(this.config.filters).map(filter => {
                var filterBy = this.config.filters[filter];
                match = match && item[filter].match( new RegExp( filterBy ) );
            });

            return match

        })

        return new_cat.sort((a,b) => {
            return this.config.descending ? b[c].localeCompare(a[c]) : a[c].localeCompare(b[c]); 
        })
    }
}