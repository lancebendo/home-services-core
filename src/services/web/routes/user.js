import express from 'express';

const router = express.Router();

/**

    GET /user/{filter} (get users by filter. ADMIN ONLY)
    GET /user/{id} (get user by id. doable to ADMIN or the user itself.)
    POST /user (create new user. doable to ADMIN or un-authenticated user.)
    PUT /user/{id} (update user. doable to ADMIN or the user itself.)
    DELETE /user/{id} (disable user. ADMIN ONLY)

[[[[ADDRESSES]]]]]
    GET /user/{id}/address/{filter or no filter}
                (get user's addresses. doable to ADMIN or the user itself.)
    GET /user/{id}/address/{id} (get user's address by id. doable to ADMIN or the user itself.)
    POST /user/{id}/address (create new user address. doable to ADMIN or the user itself.)
    PUT /user/{id}/address/{id} (update user address. doable to ADMIN or the user itself.)
    PATCH /user/{id}/address/{id}
                (switch user address to default. doable to ADMIN or the user itself.)
    DELETE /user/{id}/address/{id} (disable user address. doable to ADMIN or the user itself.)

 */

export default router;
