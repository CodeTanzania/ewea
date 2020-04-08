const areas = [
  {
    namespace: 'AdministrativeArea',
    strings: {
      name: { en: 'Dar es Salaam' },
    },
    populate: {
      'relations.level': {
        match: { 'strings.name.en': 'Region' },
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
        match: { 'strings.name.en': 'District' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = areas;
