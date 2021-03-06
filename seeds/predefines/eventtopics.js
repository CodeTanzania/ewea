const indicators = [
  {
    namespace: 'EventTopic',
    strings: {
      name: { en: 'Water' },
      description: { en: 'Water' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Need' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventTopic',
    strings: {
      name: { en: 'Sanitation' },
      description: { en: 'Sanitation' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Need' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventTopic',
    strings: {
      name: { en: 'Food & Nutrition' },
      description: { en: 'Food & Nutrition' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Need' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventTopic',
    strings: {
      name: { en: 'Shelter' },
      description: { en: 'Shelter' },
    },
    populate: {
      'relations.indicator': {
        match: { 'strings.name.en': 'Need' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = indicators;
