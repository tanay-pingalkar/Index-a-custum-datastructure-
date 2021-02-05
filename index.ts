class Index{
    value:object;
    uuid:Array<string>;
    index:object;
    schema:Array<string>;
    constructor(schema?:Array<string>){
        this.value={};
        this.uuid=[];
        this.index={};
        if (schema){
            this.schema=schema
        }
    }
    makeSchema(schema:Array<string>):Array<string>{
        this.schema=schema;
        return this.schema
    }
    insert(data:object):string{
        if(this.schema){
            if(this.schemaCheck(data)){
                const uuid:string=this.create_UUID();
                this.value[uuid]= data;
                this.uuid.push(uuid);
                Object.keys(this.index).forEach((indexName)=>{this.useIndex(uuid,indexName,data)});
                return uuid;
            }
            else{
                console.error('provided data wont match to provided schema')
                return 'provided data wont match to provided schema';
            }
        }
        else{
            const uuid:string=this.create_UUID();
            this.value[uuid]= data;
            this.uuid.push(uuid);
            Object.keys(this.index).forEach((indexName)=>{this.useIndex(uuid,indexName,data)});
            return uuid;
        }
    }
    schemaCheck(data:object):boolean{
        if(JSON.stringify(Object.keys(data))===JSON.stringify(this.schema)){
            return true;
        }
        else return false;
    }
    noSchema(){
        this.schema=undefined;
    }
    create_UUID(){
        let dt: number = new Date().getTime();
        const uuid:string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c):string =>{
            let r:number = (dt + Math.random()*16)%16 | 0;
            dt= Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    delete(uuid:string):object{
        delete this.value[uuid];
        let index=this.uuid.indexOf(uuid);
        this.uuid.splice(index,1);
        return this.value;
    }
    deleteByIndex(index:number):object{
        let uuid=this.uuid[index];
        delete this.value[uuid];
        this.uuid.splice(index,1);
        return this.value;
    }
    getByIndex(index:number):object{
        let uuid=this.uuid[index];
        return this.value[uuid];
    }
    get(uuid:string):object{
        return this.value[uuid];
    }
    getByValue(key2:string,value:any):object | undefined{
        const obj:object=this.value;
        return obj[Object.keys(obj).find(key =>JSON.stringify(obj[key][key2])===JSON.stringify(value))];
    }
    getId(value:any):string | undefined{
        const obj:object=this.value;
        return Object.keys(obj).find(key =>JSON.stringify(obj[key])===JSON.stringify(value));
    }
    getAllOf(key2:string,value:any):Array<object>{
        const obj:object=this.value;
        const key:Array<string>=Object.keys(obj);
        const main:Array<object>=[];
        for(let i of key){
            if(JSON.stringify(obj[i][key2])===JSON.stringify(value)){
                main.push(obj[i]);
            }
        }
        return main;
    }
    getAll():object{
        return this.value;
    }
    getAllOrdered():Array<object>{
        const ar:Array<object>=[];
        this.uuid.forEach((value)=>{
            ar.push(this.value[value]);
        });
        return ar;
    }
    length():number{
        const key:Array<string>=Object.keys(this.value);
        return key.length;
    }
    getIdByIndex(index:number):string{
        return this.uuid[index];
    }
    //*custum indexes
    createIndex(keyName:string):string{
        this.index[keyName]={};
        return keyName
    }
    useIndex(uuid:string,indexName:string,data:object){
        if(this.index[indexName][data[indexName]]){
            this.index[indexName][data[indexName]].push(uuid);
        }
        else{
            this.index[indexName][data[indexName]]=[uuid];
        }
    }
    getIndex(){
        return this.index;
    }
    getByCustomIndex(indexName:string,indexValue:any){
        let value:Array<object>=[];
        this.index[indexName][indexValue].forEach(uuid => {
            value.push(this.value[uuid]);
        });
        return value;
    }
    deleteByCustomIndex(indexName:string,indexValue:any):void{
        this.index[indexName][indexValue].forEach(uuid => {
            this.delete(uuid);
        });
    }
    update(uuid:string, value:any,key?:string):void{
        if(key) this.value[uuid][key]=value;
        else this.value[uuid]=value;
    }
    updateByIndex(index:number,value:any,key?:string):void{
        if(key) this.value[this.uuid[index]][key]=value;
        else this.value[this.uuid[index]]=value;
    }
    updateAllOf(searchKey:string,searchValue:object | string, valuetoupdate:any, updatingKey?:string):void{
        for(let i of Object.keys(this.value)){
            if(JSON.stringify(this.value[i][searchKey])===JSON.stringify(searchValue)){
                if(!updatingKey) this.value[i]=valuetoupdate;
                else this.value[i][updatingKey]=valuetoupdate;
            }
        }
    }
    updateByCustomIndex(indexName:string,indexValue:any, valuetoupdate:any, updatingKey?:string):void{
        this.index[indexName][indexValue].forEach(uuid => {
            if(updatingKey) this.value[uuid][updatingKey]=valuetoupdate;
            else this.value[uuid]=valuetoupdate;
        });
    }
};
















