import Joi from "joi";

export const imagesGetOneParams = Joi.object()
  .keys({
    id: Joi.string().required(),
  })
  .required();

export const imagesGetOneQuery = Joi.object()
  .keys({
    inline: Joi.boolean().default(true),
  })
  .required();
