const eventcatalogues = [
  {
    namespace: 'EventActionCatalogue',
    strings: {
      name: {
        en: 'Consolidating information on deaths.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.name.en': 'Consolidating information on deaths.' },
        model: 'Predefine',
      },
      'relations.groups': {
        match: { 'strings.name.en': 'Hospitals' },
        model: 'Predefine',
        array: true,
      },
      'relations.roles': {
        match: {
          'strings.name.en': 'Regional Disaster Management Coordinator',
        },
        model: 'Predefine',
        array: true,
      },
    },
  },
  {
    namespace: 'EventActionCatalogue',
    strings: {
      name: {
        en: 'Locating and notifying relatives.',
      },
    },
    populate: {
      'relations.type': {
        match: { 'strings.name.en': 'Flood' },
        model: 'Predefine',
      },
      'relations.area': {
        match: { 'strings.name.en': 'Ilala' },
        model: 'Predefine',
      },
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
      'relations.action': {
        match: { 'strings.name.en': 'Locating and notifying relatives.' },
        model: 'Predefine',
      },
      'relations.groups': {
        match: { 'strings.name.en': 'Hospitals' },
        model: 'Predefine',
        array: true,
      },
      'relations.roles': {
        match: {
          'strings.name.en': 'Regional Disaster Management Coordinator',
        },
        model: 'Predefine',
        array: true,
      },
    },
  },
];
module.exports = eventcatalogues;
