const roles = [
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Region Disaster Committee' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Regional Disaster Management Coordinator' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'District Disaster Committee' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'District Disaster Management Coordinator' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Ward Disaster Committee' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Ward Management Team' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Village Disaster Committee' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Village Management Team' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Ward Executive Officer' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Village Executive Officer' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'ICT Officer' } },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Unknown' } },
    booleans: { default: true },
  },
  {
    namespace: 'PartyRole',
    strings: { name: { en: 'Administrator' } },
    populate: {
      'relations.permissions': { model: 'Permission', match: {}, array: true },
    },
  },
];

module.exports = roles;
