import path from 'path';
import express, { Application } from 'express';

export default class Server {

    public app: Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number) {
        return new Server(port);
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

}
