import Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    firstName: Joi.string().required(), 
    userName: Joi.string().required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({'any.only': '{{#label}} does not match'})
})

export const options = {
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}

export const loginUserSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

export const addMovieSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    description: Joi.string().lowercase().required(),
    image: Joi.string().required(),
    price: Joi.number().positive().required()
});

export const updateMovieSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    description: Joi.string().lowercase(),
    image: Joi.string(),
    price: Joi.number().positive()
});
