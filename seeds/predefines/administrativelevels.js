const levels = [
  {
    namespace: 'AdministrativeLevel',
    strings: {
      name: { en: 'Nation' },
    },
    numbers: { level: 0 },
  },
  {
    namespace: 'AdministrativeLevel',
    strings: {
      name: { en: 'Region' },
    },
    numbers: { level: 1 },
  },
  {
    namespace: 'AdministrativeLevel',
    strings: {
      name: { en: 'District' },
    },
    numbers: { level: 2 },
  },
  {
    namespace: 'AdministrativeLevel',
    strings: {
      name: { en: 'Ward' },
    },
    numbers: { level: 3 },
  },
  {
    namespace: 'AdministrativeLevel',
    strings: {
      name: { en: 'Subward' },
      description: { en: 'Street/Village' },
    },
    numbers: { level: 4 },
  },
];
module.exports = levels;
