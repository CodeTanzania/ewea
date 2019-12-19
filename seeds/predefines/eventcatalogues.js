const eventcatalogues = [
  {
    namespace: 'EventCatalogue',
    populate: {
      'relations.function': {
        match: { 'strings.code': 'DC' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.code': 'DC0001' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventCatalogue',
    populate: {
      'relations.function': {
        match: { 'strings.code': 'DC' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.code': 'DC0002' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventCatalogue',
    populate: {
      'relations.function': {
        match: { 'strings.code': 'DC' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.code': 'DC0003' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventCatalogue',
    populate: {
      'relations.function': {
        match: { 'strings.code': 'DC' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.code': 'DC0004' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventCatalogue',
    populate: {
      'relations.function': {
        match: { 'strings.code': 'DC' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.code': 'DC0005' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = eventcatalogues;
