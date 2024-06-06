const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'application/json',
        // maxBytes: 1000000, // Batas maksimum ukuran payload 1 MB
        output: 'data',
        parse: true,
        // failAction: async (request, h, err) => {
        //   if (err.output.statusCode === 413) {
        //     return h.response({
        //       status: 'fail',
        //       message: 'Payload content length greater than maximum allowed: 1000000'
        //     }).code(413).takeover();
        //   }
        //   throw err;
        // }
      }
    }
  }
];

module.exports = routes;
