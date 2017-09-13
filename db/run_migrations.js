if(!MigrationRepository.collectionExists()){
    MigrationRepository.store(1, 'Primer Migracion. Se guarda tabla de migraciones.');
}

if(!MigrationRepository.migrationWasExecuted(2)){
    console.log('Migraciones 2 no han sido ejecutadas');
}