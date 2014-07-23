var fs = require('fs');
var db = [];
db._dbArray;
db._dbPath;
db.options = {
    dbName: 'baseDB',
    writeAccess:false
};
(function(){
    // Convert array to object
    var convArrToObj = function(array){
        var thisEleObj = new Object();
        if(typeof array == "object"){
            for(var i in array){
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        }else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function(input){
        if(oldJSONStringify(input) == '[]')
            return oldJSONStringify(convArrToObj(input));
        else
            return oldJSONStringify(input);
    };
})();
db._search = function(col, data, optionalArray, notEqual) {
    var actionArray;
    if(optionalArray === undefined) {
        actionArray = this._dbArray;
    }else{
        actionArray = optionalArray;
    }
    var obj = actionArray.filter(function ( obj ) {
        if(notEqual) {
            return obj[col] !== data;
        }else{
            return obj[col] === data;
        }
    });
    return obj
};
db.search = function(obj, optionalArray, notEqual) {
    var keys = Object.keys(obj);
    var result; 
    if(optionalArray===undefined) {
        result = this._dbArray;
    }else{
        result = optionalArray;
    }
    for(var i=0;i<keys.length;i++) {
        result = this._search(keys[i],obj[keys[i]],result, notEqual);
    }
    return result;
};
db._saveDB = function() {
    if(!this.options.writeAccess) {
        console.log('You have write access turned off. You cannot modify this database');
        return false;
    }
    var saveDB = JSON.stringify(this._dbArray);
    if(saveDB === "{}") {
        saveDB = "[]";
    }
    if(fs.writeFileSync(this._dbPath, saveDB)){
        console.log('Problem saving database');
        return false;
    }else{
        return true;
    }
};
db._DBObj = function() {
    if(this._dbArray === undefined) {
       console.log('You must open a database.');
       return false;
    }else{
        return true;
    }
}
db.openDatabase = function(options) {
    if(options !== undefined) {
        this.options.dbName = options.dbName !== undefined ? options.dbName : this.options.dbName;
        this.options.writeAccess = options.writeAccess !== undefined ? options.writeAccess : this.options.writeAccess;
    }
    this._dbPath = __dirname + '/' + db.options.dbName + '.json';
    var createDB = !fs.existsSync(this._dbPath);
    if(createDB) {
        fs.writeFileSync(this._dbPath, '[]');
    }
    this._dbArray = require(this._dbPath);
};
db.viewRecordByID = function(id) {
    if(!this._DBObj()){return false;}
    var record = this._search('id',id);
    if(record.length>0) {
        return record;
    }else{
        return false;
    }
};
db._getNextRowID = function() {
    var self = this;
    if(self._dbArray.length===0) {
        return 1;
    }else{
        return (self._dbArray[self._dbArray.length-1].id + 1);
    }
}
db.insert = function(row) {
    if(!this._DBObj()){return false;}
    var rowID = this._getNextRowID();
    row.id = rowID;
    this._dbArray.push(row);
    this._saveDB();
    return true;
};
db.remove = function(obj) {
    if(!this._DBObj()){return false;}
    var newArray = this.search(obj, this._dbArray, true);
    if(JSON.stringify(newArray) === "{}") {
        newArray = [];
    }
    this._dbArray = newArray;
    console.log(this._dbArray);
    this._saveDB();
    return true;
};
module.exports = db;
