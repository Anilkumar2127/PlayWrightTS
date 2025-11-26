import winston from 'winston';

export const logger= winston.createLogger(
    {transports:[
        new winston.transports.Console({
            level:'info',
            format:winston.format.combine(
                winston.format.uncolorize(),
                winston.format.timestamp({format:'YYYY-MM_DD HH:MM:SS'}),
                winston.format.align(),
                winston.format.printf((info)=>`${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({
            level:'info',
            dirname:'execution/log',
            format:winston.format.combine(
                winston.format.uncolorize(),
                winston.format.timestamp({format:'YYYY-MM_DD HH:MM:SS'}),
                winston.format.align(),
                winston.format.printf((info)=>`${info.timestamp} ${info.level} :${info.message}`)
            )
        }),
        
    ]}
)