import pool from "../config/db.js";

export const createSubscriber = async ({
    fullName,
    email,
    confirmationToken,
    unsubscribeToken
}) => {
    const query = `
        INSERT INTO newsletter_subscribers (
            full_name,
            email,
            confirmation_token,
            unsubscribe_token
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            subscriber_id,
            full_name,
            email,
            status,
            subscribed_at
    `;

    const values = [
        fullName,
        email,
        confirmationToken,
        unsubscribeToken
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const findSubscriberByEmail = async (email) => {
    const query = `
        SELECT
            subscriber_id,
            full_name,
            email,
            status,
            subscribed_at
        FROM newsletter_subscribers
        WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};