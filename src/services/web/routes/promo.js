import { createCrudApi } from './shared';

const router = createCrudApi({
  table: 'promo',
  createProcedure: 'CALL promoInsert(@new_id, ?, ?)',
  updateProcedure: 'CALL promoUpdate(?, ?, ?)',
});

// may patch pa to. apply or remove to a user or service

export default router;
