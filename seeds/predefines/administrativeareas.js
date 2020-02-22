const areas = [
  {
    namespace: 'AdministrativeArea',
    strings: {
      name: { en: 'Dar es Salaam' },
    },
    populate: {
      'relations.level': {
        match: { 'strings.name.en': 'City' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'AdministrativeArea',
    strings: {
      name: { en: 'Ilala' },
    },
    populate: {
      'relations.parent': {
        match: { 'strings.name.en': 'Dar es Salaam' },
        model: 'Predefine',
      },
      'relations.level': {
        match: { 'strings.name.en': 'Municipality' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = areas;
