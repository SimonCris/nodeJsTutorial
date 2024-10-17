# NodeJs Tutorial

SEQUELIZE \
Per inizializzare le configurazioni per il DB installare sequelize-cli tramite npm e lanciare il comando "sequelize cli" che genera le cartelle config, migrations, models e seeders.

CREAZIONE TABELLE E MODEL CON SEQUELIZE \
Dopo aver lanciato (solo per la prima volta) il comando sequelize init, per creare un model basta lanciare il comando "sequelize-cli model:generate --name NOME_DEL_MODEL --attributes LISTA_ATTRIBUTI_SPECIFICANDO_IL TIPO" (ad es. sequelize-cli model:generate --name User --attributes name:string,email:string,password:string). Questo comando va lanciato nella cartella principale del progetto e non in una specifica ad esempio non va lanciato dentro la cartella models creata con sequelize init. \
\
Quando vengono creati dei model, dentro la cartella migrations viene generato automaticamente un file che contiene i dati e le info appena create (ad es. la creazione di un model) e dentro questa cartella viene tenuta traccia, automaticamente, di tutte le operazioni che vengono effettuate per il DB in tutto il ciclo di vita dello sviluppo dell'applicazione. \
Lanciando il comando "sequelize-cli migration --help", abbiamo tutti i comandi che possono essere eseguiti. I più usati sono "sequelize db:migrate" che sincronizza il DB con tutto quello che è presente attualmente nella cartella migrations e "sequelize db:undo u sequelize db:undo:all" che effettuano rispettivamente il rollback alla migrazione precedente e il rollback allo stato iniziale. \
Un altro modo per sincronizzare il DB è mediante i model che sono stati creati nell'applicazione e questo lo si può fare semplicemente importando il model che si vuole sincronizzare (nell'index.js del progetto) e su di esso lanciare il medoto sync(), come ad esempio: \
const User = require('./models').User;\
User.sync();\
In questo modo stiamo dicendo che vogliamo sincronizzare a DB la tabella relativa a User che abbiamo creato mediante model lato applicazione.

