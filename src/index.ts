import { envs } from './config/envs';
import { MongoDatabase } from './database/mongo/mongo.database';
import { AppRoutes } from './presentation/routes';
import { AppServer } from './presentation/server';

(() => {
    main().catch(error => {
        console.log(error);
    });
})();

async function main(): Promise<void> {
    await new MongoDatabase({
        connectionUrl: envs.DATABASE_CONNECTION_URL,
        dbName: envs.DATABASE_NAME
    }).connect();
    await new AppServer({
        port: envs.PORT,
        routes: new AppRoutes().routes
    }).start();
}
