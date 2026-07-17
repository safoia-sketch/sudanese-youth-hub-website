import express from "express";
import { body } from "express-validator";
import { submitContactForm } from "../controllers/contactController.js";

const router = express.Router();

router.post(
    "/",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Full name is required.")
            .isLength({ min: 2, max: 100 })
            .withMessage(
                "Full name must be between 2 and 100 characters."
            ),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Enter a valid email address.")
            .normalizeEmail(),

        body("subject")
            .trim()
            .notEmpty()
            .withMessage("Subject is required.")
            .isLength({ min: 3, max: 150 })
            .withMessage(
                "Subject must be between 3 and 150 characters."
            ),

        body("message")
            .trim()
            .notEmpty()
            .withMessage("Message is required.")
            .isLength({ min: 10, max: 2000 })
            .withMessage(
                "Message must be between 10 and 2000 characters."
            )
    ],
    submitContactForm
);

export default router;