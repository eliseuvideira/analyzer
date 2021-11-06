import Joi from "joi";

export const websitesPostOneBody = Joi.object()
  .keys({
    url: Joi.string().uri().required(),
  })
  .required();

export const websitesPostOneQuery = Joi.object()
  .keys({
    output: Joi.string().valid("text", "json").default("text"),
  })
  .required();
