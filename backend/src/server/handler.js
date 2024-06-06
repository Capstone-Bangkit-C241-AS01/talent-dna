const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  // TODO: Implementasikan fungsi-fungsi yang diperlukan
  const assessments = request.payload;

  const model = request.server.app.model;

  if (!Array.isArray(assessments) || assessments.length !== 180) {
    return h.response({
      status: 'fail',
      message: 'Invalid input: expected an array of 180 assessment values'
    }).code(400);
  }

  const tensor = tf.tensor2d([assessments]);
  const prediction = await predictClassification(model, tensor);
  const id = crypto.randomUUID();

  await storeData(id, {
    id,
    assessments,
    prediction
  });

  return h.response({
    status: 'success',
    data: {
      id,
      prediction
    }
  }).code(201);

  
}

module.exports = postPredictHandler;
