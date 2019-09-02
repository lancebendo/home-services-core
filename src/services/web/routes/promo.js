import { getDomainRouter } from 'express-mysql-helpers';


const router = getDomainRouter({
  viewTable: 'promo',
  createProcedure: {
    query: 'CALL promoInsert(@new_id, ?, ?)',
  },
  updateProcedure: {
    query: 'CALL promoUpdate(?, ?, ?)',
  },
});

// may patch pa to. apply or remove to a user or service

export default router;
