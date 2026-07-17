import pool from "../config/db.js";

export const createContactMessage = async ({
    fullName,
    email,
    subject,
    message
}) => {
    const query = `
        INSERT INTO contact_messages (
            full_name,
            email,
            subject,
            message
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [
        fullName,
        email,
        subject,
        message
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};