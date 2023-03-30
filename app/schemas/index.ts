import { Joi, Segments } from 'celebrate';
const schemas = {
    userPOST: {
        [Segments.BODY]: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            birthDate: Joi.string().required(),
        })
    },
    groupPOST: {
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
        })
    },
    groupPUT: {
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
        }),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required(),
        }),
    },
    groupPARAM: {
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required(),
        }),
    },
    groupAssignPOST: {
        [Segments.BODY]: Joi.object().keys({
            userId: Joi.number().required(),
            groupId: Joi.number().required(),
        }),
    }
};
export default schemas;
