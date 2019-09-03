import { getDomainRouter } from 'express-mysql-helpers';


const router = getDomainRouter({
  viewTable: 'promo',
  createProcedure: {
    query: 'CALL promoInsert(@new_id, ?, ?)',
    paramsHandler: ({ name, description }) => [name, description],
  },
  updateProcedure: {
    query: 'CALL promoUpdate(?, ?, ?)',
    paramsHandler: ({ id, name, description }) => [id, name, description],
  },
  deleteProcedure: {
    query: 'CALL isActiveUpdate(?, ?, ?)',
    paramsHandler: ({ id }) => ['promo', id, 0],
  },
  // middlewares here.
});

// may patch pa to. apply or remove to a user or service (promoApply and promoDelete)
// update start and end date of applied promo (promoDomainUpdate) update lang to ng promoApply
// update promo rate (promoRateInsert)

export default router;
