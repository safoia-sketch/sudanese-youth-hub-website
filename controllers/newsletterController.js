import crypto from "crypto";
import { validationResult } from "express-validator";
import {
    createSubscriber,
    findSubscriberByEmail
} from "../models/newsletterModel.js";

export const subscribeToNewsletter = async (req, res) => {
    try {
        const errors = validationResult(req);

        const newsletterFormData = {
            fullName: req.body.fullName || "",
            email: req.body.email || ""
        };

        if (!errors.isEmpty()) {
            return res.status(400).render("contact", {
                successMessage: null,
                errorMessage: null,
                errors: [],
                formData: {},

                newsletterSuccessMessage: null,
                newsletterErrorMessage:
                    "Please correct the newsletter form errors.",
                newsletterErrors: errors.array(),
                newsletterFormData
            });
        }

        const fullName = req.body.fullName?.trim() || "";
        const email = req.body.email.trim().toLowerCase();

        const existingSubscriber = await findSubscriberByEmail(email);

        if (existingSubscriber) {
            let message = "This email is already subscribed.";

            if (existingSubscriber.status === "pending") {
                message =
                    "This email is already waiting for confirmation.";
            }

            if (existingSubscriber.status === "unsubscribed") {
                message =
                    "This email was previously unsubscribed.";
            }

            return res.status(409).render("contact", {
                successMessage: null,
                errorMessage: null,
                errors: [],
                formData: {},

                newsletterSuccessMessage: null,
                newsletterErrorMessage: message,
                newsletterErrors: [],
                newsletterFormData
            });
        }

        const confirmationToken = crypto.randomBytes(32).toString("hex");
        const unsubscribeToken = crypto.randomBytes(32).toString("hex");

        await createSubscriber({
            fullName,
            email,
            confirmationToken,
            unsubscribeToken
        });

        return res.status(201).render("contact", {
            successMessage: null,
            errorMessage: null,
            errors: [],
            formData: {},

            newsletterSuccessMessage:
                "Thank you for subscribing. Your subscription has been received.",
            newsletterErrorMessage: null,
            newsletterErrors: [],
            newsletterFormData: {}
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);

        if (error.code === "23505") {
            return res.status(409).render("contact", {
                successMessage: null,
                errorMessage: null,
                errors: [],
                formData: {},

                newsletterSuccessMessage: null,
                newsletterErrorMessage:
                    "This email is already subscribed or awaiting confirmation.",
                newsletterErrors: [],
                newsletterFormData: {
                    fullName: req.body.fullName || "",
                    email: req.body.email || ""
                }
            });
        }

        return res.status(500).render("contact", {
            successMessage: null,
            errorMessage: null,
            errors: [],
            formData: {},

            newsletterSuccessMessage: null,
            newsletterErrorMessage:
                "We could not complete your subscription. Please try again.",
            newsletterErrors: [],
            newsletterFormData: {
                fullName: req.body.fullName || "",
                email: req.body.email || ""
            }
        });
    }
};