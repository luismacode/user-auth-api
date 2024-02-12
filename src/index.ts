import { envs } from './config/envs';
import { AppServer } from './presentation/server';

(() => {
    main().catch(error => {
        console.log(error);
    });
})();

async function main(): Promise<void> {
    await new AppServer({ port: envs.PORT }).start();
}
