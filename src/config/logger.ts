import * as winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),  // Para exibir stack trace nos erros
        winston.format.timestamp(),              // Inclui timestamp nos logs
        winston.format.json()                    // Formato JSON nos logs
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),  // Arquivo para logs de erro
        new winston.transports.File({ filename: 'info.log', level: 'info' }),    // Arquivo para logs de info
        new winston.transports.Console()                                         // Logs no console
    ]
});

export default logger;
