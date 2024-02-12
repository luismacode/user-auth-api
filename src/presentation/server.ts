import express from 'express';
interface Options {
    port: number;
}
export class AppServer {
    private readonly app = express();
    private readonly port: number;
    constructor({ port }: Options) {
        this.port = port;
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => {
            console.log(`Server running on port:${this.port}`);
        });
    }
}
