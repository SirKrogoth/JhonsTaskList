import app from './app';

(async () => {
    try {
        const port = parseInt(`${process.env.PORT}`);

        app.listen(port, () => {
            console.log("Serviço Jhons Task List sendo executado na porta: " + port);
        })
    } catch (error) {
        console.error("Não foi executar o serviço Jhons Task List. Contate o admin: " + error);
    }
})();