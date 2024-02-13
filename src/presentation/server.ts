import express, { type Router } from 'express';
interface Options {
    port: number;
    routes: Router;
}
export class AppServer {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    constructor({ port, routes }: Options) {
        this.port = port;
        this.routes = routes;
    }

    async start(): Promise<void> {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Server running on port:${this.port}`);
        });
    }
}
