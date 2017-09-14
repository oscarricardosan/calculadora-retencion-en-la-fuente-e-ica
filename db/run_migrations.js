(function verifyExistenceOfCollection_migrations(){
    if(!MigrationModel.collectionExists()){
        MigrationModel.store(1, 'Primer Migracion. Se guarda colección de migraciones.');
    }
})();

/**
if(!MigrationModel.migrationWasExecuted(2)){
    console.log('Migraciones 2 no han sido ejecutadas');
}
 **/