import joi from 'joi';

const newTaskSchema = joi.object({
    title: 
        joi.string()
        .min(3)
        .max(255)
        .required(),
    description:
        joi.string()
        .min(3)
        .max(255)
        .required(),
    completed: 
        joi.boolean()
        .default(false)
        .required()        

});

export { newTaskSchema }