import mysql, { Connection, createConnection, MysqlError } from 'mysql';

export default class MySQL {

    private static _instance: MySQL;

    connection: Connection;

    constructor() {
        this.connection = createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.connectDatabase();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static executeQuery(query: string, callback: Function) {
        this.instance.connection.query(query, (err, results: any[], fields) => {
            if (err) {
                console.log(err);
                return callback(err);
            }

            if (results.length === 0) {
                return callback('No data available');
            }

            callback(null, results);
        });
    }

    private connectDatabase() {
        this.connection.connect((err: MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            console.log('Connected to database');
        });
    }

}
