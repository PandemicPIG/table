class InsertForm {
    constructor(id, parent, config, catalogue, button_text){
    
        /* 
            creates a form with the id provided,
            in the parent specified,
            with the inputs from the config
        */
        this.id = id;
        this.parent = parent;
        this.config = config;
        this.catalogue = catalogue;
        this.button_text = button_text || 'Add data';
        
        this.form = document.createElement('form');
        
        var element;

        this.config.header.map( row => {
            element = '';
            element += '<label for="'+this.id+'_'+row.field+'">'+row.name+'</label>';
            element += '<input type="'+row.type+'" name="'+row.field+'" id="'+this.id+'_'+row.field+'" />';
            this.form.innerHTML += element;
        });

        this.form.innerHTML += '<a id="'+this.id+'_submit">'+this.button_text+'</a>';

        this.form.setAttribute('id',this.id);         
        document.querySelectorAll(this.parent)[0].appendChild(this.form);

        //check and add data on submit
        document.getElementById(this.id+'_submit').addEventListener('click',() => {
            var data = this.getFormData();
            this.addNewRow(data);
        });
        
        //check and add data on enter
        document.querySelectorAll('#'+this.id+' input').forEach(item => item.addEventListener('keyup', elm => {
            if( elm.keyCode == 13 ){
                var data = this.getFormData();
                this.addNewRow(data);
            }
        }));
    }
    
    getFormData(){
        
        var data = {};
        this.config.header.map( row => {
            data[row.field] = document.getElementById(this.id+'_'+row.field).value;
        });
        return data
    }
    
    addNewRow(data){
        /*
            checks and adds a new "row" in the catalogue
        */
        
        var valid = true;
        
        var RFC_2822_email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        
        //clear errors
        this.clearErrors();
        
        //check if data is valid
        this.config.header.map( (row,i) => {
            if( !row.optional ){
                if( row.type == 'text' && data[row.field].length < 1 ){
                    valid = false;
                    this.throwError(row.field, row.name + ' is invalid');
                }

                if(row.type == 'email' && !data[row.field].match(RFC_2822_email_regex) ){
                    valid = false;
                    this.throwError(row.field, 'invalid email format');
                }

                if(row.type == 'date' && !data[row.field] ){
                    valid = false;
                    this.throwError(row.field, 'no date');
                }

                if(row.type == 'number' && data[row.field] != parseInt(data[row.field]) ){
                    valid = false;
                    this.throwError(row.field, 'not a valid integer');
                }
            }
        });
        
        //if data vaild push to catalogue
        if( valid ){
            console.info('success');
            
            //IPORTANT - use push methode as the table viewer uses listener on this methode in relation to the catalogue
            this.catalogue.push(data);
            
            document.querySelectorAll('#' + this.id + ' input').forEach( elm => elm.value = '' );
        }
    }
    
    throwError(elm,text){
        var input = document.getElementById(this.id+'_'+elm);
        
        //add any error dsiplay options here
        input.classList.add('error');
        console.error(text);
    }
    
    clearErrors(){
        //clear error display options here
        document.querySelectorAll('#' + this.id + ' input').forEach( elm => elm.classList.remove('error') );
    }
}