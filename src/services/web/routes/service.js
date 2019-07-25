import express from 'express';

const router = express.Router();

/*

    GET /service/{filter} (get active services by filter. PUBLIC)
    GET /service/{id} (get service by id. PUBLIC)
    POST /service (create new service. ADMIN ONLY)
    PUT /service/{id} (update service. ADMIN ONLY)
    DELETE /service/{id} (disable service. ADMIN ONLY)

*/

export default router;
