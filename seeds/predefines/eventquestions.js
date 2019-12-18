const questions = [
  {
    namespace: 'EventQuestion',
    strings: {
      name: { en: 'Deaths' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Damages and Losses' },
        model: 'Predefine',
      },
      'relations.unit': {
        match: { 'strings.name.en': 'person' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventQuestion',
    strings: {
      name: { en: 'Affected' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Damages and Losses' },
        model: 'Predefine',
      },
      'relations.unit': {
        match: { 'strings.name.en': 'person' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventQuestion',
    strings: {
      name: { en: 'Evacuated' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Damages and Losses' },
        model: 'Predefine',
      },
      'relations.unit': {
        match: { 'strings.name.en': 'person' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = questions;
