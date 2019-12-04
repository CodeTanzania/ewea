const { get } = require('lodash');
const { readShapefile, isFeature } = require('@lykmapipo/geo-tools');
const { Predefine } = require('../src/database');

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
    if (isFeature(feature)) {
      // prepare feature seed
      const region = {
        namespace: 'AdministrativeArea',
        strings: {
          name: { en: get(feature, 'properties.Region_Nam') },
        },
        geos: { geometry: get(feature, 'geometry') },
        properties: get(feature, 'properties'),
      };
      // seed feature
      return Predefine.seed(region, (err, seeded) => {
        return next(err, seeded);
      });
    }
    // request next chunk from stream
    return next();
  });
};

exports.seedDistricts = done => {
  const path = `${__dirname}/../data/administrativeareas/Dar_District_Polygon.shp`;
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
    if (feature && next) {
      // prepare feature seed
      const district = {
        namespace: 'AdministrativeArea',
        strings: {
          name: { en: get(feature, 'properties.Name') },
        },
        // geos: { geometry: get(feature, 'geometry') },
        properties: get(feature, 'properties'),
      };
      // seed feature
      return Predefine.seed(district, (err, seeded) => {
        return next(err, seeded);
      });
    }
    // request next chunk from stream
    return next && next();
  });
};

exports.seedWards = done => {
  const path = `${__dirname}/../data/administrativeareas/Dar_Wards_Polygon.shp`;
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
    if (feature && next) {
      // prepare feature seed
      const ward = {
        namespace: 'AdministrativeArea',
        strings: {
          name: { en: get(feature, 'properties.Ward_Name') },
        },
        // geos: { geometry: get(feature, 'geometry') },
        properties: get(feature, 'properties'),
      };
      // seed feature
      return Predefine.seed(ward, (err, seeded) => {
        return next(err, seeded);
      });
    }
    // request next chunk from stream
    return next && next();
  });
};

exports.seedSubWards = done => {
  const path = `${__dirname}/../data/administrativeareas/Dar_Subwards_Polygon.shp`;
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
    if (feature && next) {
      // prepare feature seed
      const subward = {
        namespace: 'AdministrativeArea',
        strings: {
          name: { en: get(feature, 'properties.Vil_Mtaa_N') },
        },
        // geos: { geometry: get(feature, 'geometry') },
        properties: get(feature, 'properties'),
      };
      // seed feature
      return Predefine.seed(subward, (err, seeded) => {
        return next(err, seeded);
      });
    }
    // request next chunk from stream
    return next && next();
  });
};
