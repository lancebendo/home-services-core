import { getDomainRouter, getApi, procedureApi } from 'express-mysql-helpers';


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


// update promo rate (promoRateInsert)
router.get('/:id(\\d+)/rate', procedureApi({
  query: 'SELECT * FROM promo_rate where promo_id = ?',
  paramsHandler: ({ id }) => [id],
}));
router.get('/:id(\\d+)/rate/history', procedureApi({
  query: 'SELECT * FROM promo_rate where last_date IS NULL AND promo_id = ? LIMIT 1',
  paramsHandler: ({ id }) => [id],
}));
router.patch('/:id(\\d+)', procedureApi({
  query: 'CALL promoRateInsert(@new_id, ?, ?, ?, ?); SELECT * FROM promo_rate where id = LAST_INSERT_ID() LIMIT 1',
  paramsHandler: ({
    id, rate, operator, byPercentage,
  }) => [id, rate, operator, byPercentage === 'true' ? 1 : 0],
  resultHandler: result => result[1],
}));


// may patch pa to. apply or remove to a user or service (promoApply and promoDelete)
// update start and end date of applied promo (promoDomainUpdate) update lang to ng promoApply
router.get('/:id(\\d+)/:domain(/^[A-Za-z]+$/)', getApi({
  query: ({ id, domain }) => `SELECT * FROM ${domain}_promo WHERE promo_id = ${id}`,
}));

router.post('/:promoId(\\d+)/:domain(/^[A-Za-z]+$/)/:domainId(\\d+)', procedureApi({
  query: 'CALL promoApply(@new_id, ?, ?, ?, ?, ?); SELECT * FROM ?_promo where id = LAST_INSERT_ID() LIMIT 1',
  paramsHandler: ({
    domain, domainId, promoId, start_date: startDate, end_date: endDate,
  }) => [domain, domainId, promoId, startDate, endDate, domain],
  resultHandler: result => result[1],
  responseCode: 201,
}));

router.put('/:id(\\d+)/:domain(/^[A-Za-z]+$/)', procedureApi({
  query: 'CALL promoDomainUpdate(?, ?, ?, ?); SELECT * FROM ?_promo WHERE id = ?',
  paramsHandler: ({
    id, domain, start_date: startDate, end_date: endDate,
  }) => [id, domain, startDate, endDate, domain, id],
  resultHandler: result => result[1],
}));

router.delete('/:id(\\d+)/:domain(/^[A-Za-z]+$/)', procedureApi({
  query: 'CALL promoDelete(?, ?)',
  paramsHandler: ({ promoId, domain }) => [promoId, domain],
}));


export default router;
