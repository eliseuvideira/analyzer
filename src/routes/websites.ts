import { body } from "@ev-fns/validation";
import { Router } from "express";
import { websitesPostOne } from "../endpoints/websites";
import { auth } from "../middlewares/auth";
import { websitesPostOneBody } from "../validations/websites";

const router = Router();

/**
 * POST /websites
 * @tag Websites
 * @security BearerAuth
 * @queryParam {OutputEnum} [output]
 * @bodyContent {WebsitePostRequestBody} application/json
 * @response 200
 * @responseContent {Website} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/websites", auth, body(websitesPostOneBody), websitesPostOne);

export default router;
