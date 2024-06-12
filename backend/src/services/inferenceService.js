const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictRegression(model) {
    // //TODO: Implementasikan fungsi yang diperlukan

    // // import dataset
    // const dataset = require('../../data/test.json');
    // const data = dataset.data;

    // // ambil input
    // const input = data.map((item) => item.input);

    // // scaling input
    // const inputTensor = tf.tensor2d(input);
    // const inputMax = inputTensor.max();
    // const inputMin = inputTensor.min();
    // const inputScaled = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));

    // // input dikirim ke model regresi pake model.json
    // const prediction = model.predict(inputScaled);

    // //hasil multiple regression dimapping dengan list kode talent seperti ini  [{Talent: strength}, {},{},…]
    // const talent = dataset.meta.map((item) => item.Talent);
    // const result = prediction.arraySync().map((item, index) => {
    //     return {
    //         [talent[index]]: item[0]
    //     }
    // });

    // return result;

    //dari hasil multiple regression,  ambil 10 nilai terbesar dan 5 nilai terkecil

    

    // Proses 2
    // ambil 10 nilai terbesar, lalu join dengan dataset talent
    // ambil kolom positive description dan gabung semua nilai menjadi satu string
    // chunks
    // lakukan modeling dengan model.json dari hasil chunks


    // Proses 3
     // ambil 5 nilai terkecil, lalu join dengan dataset talent
    // ambil kolom negative description dan gabung semua nilai menjadi satu string
    // chunks
    // lakukan modeling dengan model.json dari hasil chunks

    // Proses 4

}

module.exports = predictRegression;