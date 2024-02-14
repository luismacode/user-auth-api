import mongoose from 'mongoose';

interface Options {
    connectionUrl: string;
    dbName: string;
}
export class MongoDatabase {
    private readonly options: Options;
    constructor(options: Options) {
        this.options = options;
    }

    async connect(): Promise<void> {
        const { connectionUrl, dbName } = this.options;
        try {
            await mongoose.connect(connectionUrl, { dbName });
            console.log('Database connection successful');
        } catch (error) {
            console.log('Database connection failed');
            throw error;
        }
    }
}
