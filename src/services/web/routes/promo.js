import express from 'express';

const router = express.Router();

/*

    GET /promo/{filter} (get active promos by filter. PUBLIC)
    GET /promo/{id} (get promo by id. PUBLIC)
    POST /promo (create new promo. ADMIN ONLY)
    PUT /promo/{id} (update promo. ADMIN ONLY)
    PATCH /promo/{id}/{condition. apply/remove, mngmnt-domain-type,
                        domain-id} (apply/remove promo. ADMIN ONLY)
    DELETE /promo/{id} (disable promo. ADMIN ONLY)

*/

export default router;
