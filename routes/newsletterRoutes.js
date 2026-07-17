import express from "express";
import { body } from "express-validator";
import { subscribeToNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

router.post(
    "/",
    [
        body("fullName")
            .optional({ checkFalsy: true })
            .trim()
            .isLength({ max: 100 })
            .withMessage("Full name cannot exceed 100 characters."),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email address is required.")
            .isEmail()
            .withMessage("Enter a valid email address.")
            .normalizeEmail()
    ],
    subscribeToNewsletter
);

export default router;