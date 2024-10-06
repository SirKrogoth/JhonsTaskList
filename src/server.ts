import app from './app';
import logger from './config/logger';

(async () => {
    try {
        const port = parseInt(`${process.env.PORT}`);

        app.listen(port, () => {
            logger.warn("Serviço Jhons Task List sendo executado na porta: " + port);
        })
    } catch (error) {
        logger.error("Não foi executar o serviço Jhons Task List. Contate o admin: " + error);
    }
})();