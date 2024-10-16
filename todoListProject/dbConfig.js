/** File contenente le configurazione ai puntamenti del DB (Laragon in locale) */
const mysql = require('mysql2/promise');

const dbConnectionsPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expressjstodo_list',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = dbConnectionsPool;
