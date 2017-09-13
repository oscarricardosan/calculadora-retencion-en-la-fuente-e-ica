
var Default_valueRepository= (function () {

    var collection_name= 'defaults';
    /**
     * Carga los datos si ya estan en localstorage
     */
    db.collection(collection_name).load();

    /**
     * @param data
     */
    var insertOrUpdate = function(data){
        if(db.collection(collection_name).find().length === 0){
            store(data)
        }else{
            update(1, data);
        }
    }

    /**
     * @param _id
     * @param data
     */
    var update = function(_id, data){
        db.collection(collection_name).update({
            _id: _id
        }, data);
        db.collection(collection_name).save();
    }

    /**
     * @param data
     */
    var store = function(data){
        data._id= 1;
        db.collection(collection_name).insert(data);
        db.collection(collection_name).save();
    }

    var get = function(){
        var records= db.collection(collection_name).find();
        if(records.length===0)
            return {};
        else
            return records[0];
    }

    function construct(){//Funcion que controla cuales son los metodos publicos
        return {
            insertOrUpdate    : insertOrUpdate,
            get    : get
        }
    };
    return {construct:construct};//retorna los metodos publicos
})().construct();
