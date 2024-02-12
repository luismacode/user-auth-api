import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { AppServer } from './presentation/server';

(() => {
    main().catch(error => {
        console.log(error);
    });
})();

async function main(): Promise<void> {
    await new AppServer({
        port: envs.PORT,
        routes: new AppRoutes().routes
    }).start();
}
