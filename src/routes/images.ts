import { Router } from "express";
import { query, params } from "@ev-fns/validation";
import { imagesGetOneParams, imagesGetOneQuery } from "../validations/images";
import { imagesGetOne } from "../endpoints/images";

const router = Router();

/**
 * GET /images/{id}
 * @tag Images
 * @pathParam {string} id
 * @queryParam {boolean} [inline]
 * @response 200
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get(
  "/images/:id",
  params(imagesGetOneParams),
  query(imagesGetOneQuery),
  imagesGetOne,
);

export default router;
