/* eslint-disable max-len */

/*
 this is our HOMEMADE error handler middleware.
 Purpose of creating this is for having a functionality of
 defining different errors like when your API can't connect to your database,
 when the user's request didn't match your schema, and when an external API failed.
*/

import { boomify, isBoom } from 'boom';

const errorHandler = () => (err, req, res) => {
  let _err = err;
  if (!isBoom(_err)) _err = boomify(err);

  // if (process.env.NODE_ENV === 'production') {
  //   if (err.isServer) logger.error(err.message);
  //   else logger.debug(err.output.payload.message);
  // } else logger.error(err.message);

  res.status(_err.output.statusCode).json({ success: false, payload: _err.output.payload });
};

export default errorHandler;
