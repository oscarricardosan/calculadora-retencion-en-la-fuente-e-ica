
var MigrationRepository= (function () {

    var collection_name= 'migrations';
    /**
     * Carga los datos si ya estan en localstorage
     */
    db.collection(collection_name).load();

    /**
     * @returns {boolean}
     */
    var collectionExists= function(){
        return db.collection(collection_name).find().length > 0;
    }

    /**
     * @param migration_id
     * @returns {boolean}
     */
    var migrationWasExecuted = function(migration_id){
        return !db.collection(collection_name).find({_id: migration_id}).length === 0;
    }

    /**
     * @param migration_id
     * @param description
     */
    var store = function(migration_id, description){
        db.collection(collection_name).insert({
            _id: migration_id,
            descripcion: description
        });

        db.collection(collection_name).save();
    }

    function construct(){//Funcion que controla cuales son los metodos publicos
        return {
            collectionExists    : collectionExists,
            migrationWasExecuted    : migrationWasExecuted,
            store    : store
        }
    };
    return {construct:construct};//retorna los metodos publicos
})().construct();
