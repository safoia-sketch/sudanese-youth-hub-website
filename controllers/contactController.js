import { validationResult } from "express-validator";
import { createContactMessage } from "../models/contactModel.js";

const emptyNewsletterData = {
    newsletterSuccessMessage: null,
    newsletterErrorMessage: null,
    newsletterErrors: [],
    newsletterFormData: {}
};

export const submitContactForm = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("contact", {
                successMessage: null,
                errorMessage: "Please correct the contact form errors.",
                errors: errors.array(),
                formData: req.body,

                ...emptyNewsletterData
            });
        }

        const { name, email, subject, message } = req.body;

        await createContactMessage({
            fullName: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim()
        });

        return res.status(201).render("contact", {
            successMessage:
                "Thank you! Your message has been received.",
            errorMessage: null,
            errors: [],
            formData: {},

            ...emptyNewsletterData
        });
    } catch (error) {
        console.error("Contact form submission error:", error);

        return res.status(500).render("contact", {
            successMessage: null,
            errorMessage:
                "We could not send your message. Please try again.",
            errors: [],
            formData: req.body,

            ...emptyNewsletterData
        });
    }
};