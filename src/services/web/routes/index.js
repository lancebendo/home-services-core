import completed from './completed';
import promo from './promo';
import reservation from './reservation';
import service from './service';
import user from './user';

export {
  completed, promo, reservation, service, user,
};

export default [
  { controller: completed, baseUrl: '/completed' },
  { controller: promo, baseUrl: '/promo' },
  { controller: reservation, baseUrl: '/reservation' },
  { controller: service, baseUrl: '/service' },
  { controller: user, baseUrl: '/user' },
];
