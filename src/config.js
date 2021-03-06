'use strict';

const mongoose = require('mongoose');
const initData = require('../data/allData.json');
const materialModel = require('./model/material/material-schema');
const detailModel = require('./model/detail/detail-schema');

initData.data.forEach((material) => {
  const newMaterial = new materialModel({
    _id: new mongoose.Types.ObjectId(),
    name: material.name,
  });

  materialModel.findOne({name: material.name})
    .then((result) => console.log('DATABASE ALREADY POPULATED', result.name))
    .catch((e) => {
      newMaterial.save(function (error) {
        if (error) throw new Error(error);

        material.details.forEach((detail) => {
          const newDetail = new detailModel({
            reference: detail.reference,
            method: detail.method,
            value: detail.value,
            materialId: newMaterial._id,
          });

          newDetail.save(function (error) {
            if (error) throw new Error(error);
          });
        });
        console.log('CONFIG DONE');
      });
    });
});
