const { get } = require('lodash');
const { readShapefile } = require('@lykmapipo/geo-tools');
const { Predefine } = require('../src/database');

const isValid = feature =>
  feature && feature.type && feature.properties && feature.geometry;

const toSeed = feature => {
  return {
    namespace: 'AdministrativeArea',
    strings: {
      name: { en: get(feature, 'properties.Region_Nam') },
    },
    geos: { geometry: get(feature, 'geometry') },
    properties: get(feature, 'properties'),
  };
};

exports.seedRegions = done => {
  const path = `${__dirname}/../data/administrativeareas/Dar_Region.shp`;
  readShapefile(path, (error, { finished, feature, next }) => {
    // handle read errors
    if (error) {
      return done(error);
    }
    // handle read finish
    if (finished) {
      return done();
    }
    // process features
    if (isValid(feature)) {
      const data = toSeed(feature);
      Predefine.seed(data, next);
    }
    // request next chunk from stream
    return next();
  });
};
