const types = [
  {
    namespace: 'EventType',
    strings: { name: { en: 'Flood' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Hydrological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Drought' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Climatological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Tropical Cyclones' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Meteorological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Earthquake' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Geophysical' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Lightning' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Meteorological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Landslides' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Hydrological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Tsunami' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Meteorological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Strong Winds' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Meteorological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Heavy Rains' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Meteorological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: {
      name: { en: 'Epidemics' },
      description: {
        en:
          'Cholera, Rift Valley Fever, Bird Flu, Food Poisoning, Swine Flu, etc',
      },
    },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Biological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'HIV / AIDS' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Biological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: {
      name: { en: 'Animal Disease Outbreak' },
      description: {
        en: 'Anthrax, Beak Quarter, Foot and Mouth disease, lumpy Skin etc',
      },
    },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Biological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Pest Infestations' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Biological' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Volcanic Eruptions' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Geophysical' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Fire Outbreak' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Fire' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Road Accidents' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Transport Accident' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Power Failure' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Safety' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Marine Accidents' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Transport Accident' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Collapse of Buildings' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Safety' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Oil Spill' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Pollution' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Civil Disorder' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Security' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Aircraft Accidents' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Transport Accident' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Industrial Disasters' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Industrial Accident' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventType',
    strings: { name: { en: 'Terrorism' } },
    populate: {
      'relations.group': {
        match: { 'strings.name.en': 'Security' },
        model: 'Predefine',
      },
    },
  },
];

module.exports = types;
