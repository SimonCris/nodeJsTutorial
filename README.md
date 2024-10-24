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
In questo modo stiamo dicendo che vogliamo sincronizzare a DB la tabella relativa a User che abbiamo creato mediante model lato applicazione. \
Per la prima volta conviene lanciare la sync dei singoli model. Quando tutte le tabelle sono state create si può
abbreviare questo procedimento chiamando il metodo sync() di sequelize, in questo modo: \

async function initModelsDBTables(isFirstCreation) {

    if (isFirstCreation) {
        await User.sync();
        await List.sync();
        await Todo.sync();
    } else {
        const created = await sequelize.sync();
        if (created) {console.log('CREATED')};
    }

}

SEEDERS \
I seeders sono degli "alimentatori" che forniscono dei dati per riempire il DB per motivi di test o altre operazioni. Si possono creare e lanciare tramite i comandi "sequelize-cli" lanciati dal terminale (sequelize-cli -h per vedere tutti i comandi che si possono utilizzare). Si può utilizzare la librearia "faker" per creare dei dati fake realistici. \

FE \
Per la parte FE, ci sono varie possibilità di sviluppare app FE con node e in questo tutorial vedremo express-handlebars che possiamo installare con "npm i express-handlebars". \
Nell'index.js bisogna inizializzare l'istanza di express-handlebars in modo tale che riconosca quali sono i file FE che deve gestire e la cartella dove sono contenuti (ovviamente si possono passare altre configurazioni). Per fare questo bisogna aggiungere il seguente codice: \


/** Inizializzazione di express-handlebars per la gestione delle pagine FE */ \
const {engine} = require('express-handlebars'); \
app.engine(
'hbs',
engine({
extname: 'hbs', /** Estensione dei file FE da gestire */
layoutsDir: './views/layouts' /** Cartella nella quale si trovano i file da gestire */
})); \
app.set('view engine', 'hbs'); /** Set dell'engine che si occuperà delle views */

/** res.render indica che quando si naviga al path '/' viene renderizzato il template html "index.hbs" (bisogna crearlo manualmente) nella cartella views */ \
  app.get('/', (req, res) => {
  res.render('index');
  }); 

Tutte le componenti FE sono state create e implementate nella directory "src/views". \
Nello specifico, nella cartella "layouts" è presente il file "main.hbs" che rappresenta il nodo di origine della parte FE. Nella cartella "partials" invece ci sono i file ".hbs" che compongono i vari componenti HTML che si vogliono inserire nell'applicativo. Infine, il file "index.hbs" rappresenta il body dell'applicazione FE. \
I componenti partials che si aggiungono devono stare tutti nella cartella partials



