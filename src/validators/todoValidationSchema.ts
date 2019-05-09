import * as joi from '@hapi/joi';


export const todoValidationSchema = joi.object({
    value: joi.string().required().min(3),
    favorite: joi.boolean()
})