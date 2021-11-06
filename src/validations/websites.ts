import Joi from "joi";

export const websitesPostOneBody = Joi.object()
  .keys({
    url: Joi.string().uri().required(),
  })
  .required();
