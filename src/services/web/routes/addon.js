import express from 'express';

const router = express.Router();

/*

    GET /addon/{filter} (get active addons by filter. PUBLIC)
    GET /addon/{id} (get addon by id. PUBLIC)
    POST /addon (create new addon. ADMIN ONLY)
    PUT /addon/{id} (update addon. ADMIN ONLY)
    PATCH (pano yung add as service addon of gantong service)
    DELETE /addon/{id} (disable addon. ADMIN ONLY)

*/

export default router;
