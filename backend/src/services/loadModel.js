const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const { BertWordPieceTokenizer } = require('bert-tokenizer');

async function loadModel() {
    // const modelDirectory = path.join(__dirname, '../models');
    // console.log(modelDirectory)

    // // Load model configuration
    // const modelConfigPath = path.join(modelDirectory, 'config.json');
    // const modelGenerationConfigPath = path.join(modelDirectory, 'generation_config.json');
    // const modelWeightsPath = path.join(modelDirectory, 'assesmentModel.json'); // Assuming this is the main model file

    // const modelConfig = JSON.parse(fs.readFileSync(modelConfigPath, 'utf8'));
    // const modelGenerationConfig = JSON.parse(fs.readFileSync(modelGenerationConfigPath, 'utf8'));

    // // Initialize the model
    // const model = await tf.loadLayersModel('file://' + modelWeightsPath);

    // // Load tokenizer
    // const vocabPath = path.join(modelDirectory, 'vocab.json');
    // const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

    // // Initialize the tokenizer
    // const tokenizer = new BertWordPieceTokenizer({
    //     vocab: vocab,
    //     lowerCase: true,
    // });

    // return { model, tokenizer, modelConfig, modelGenerationConfig };
}

module.exports = loadModel;
