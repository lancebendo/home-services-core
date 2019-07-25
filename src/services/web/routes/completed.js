import express from 'express';

const router = express.Router();

/*

    GET /completed/{filter} (get reservations by filter. ADMIN ONLY.)
    GET /completed/{id} (get reservation by id. ADMIN ONLY.)
    GET /user/{id}/completed/{filter} (get completed session of a user.
                                doable to ADMIN or the user itself.)
    GET /user/{id}/completed/{id} (get a completed session by of a user
                                by it's id. only ADMIN or user itself.)
    DELETE /completed/{id} (disable completed session. ADMIN ONLY)

*/

export default router;
