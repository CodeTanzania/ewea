const templates = [
  {
    _id: '5d535a0a62b47901d3294ff8',
    namespace: 'NotificationTemplate',
    strings: {
      name: {
        // title
        en: '{event} - Notification',
        sw: 'Ilani ya {event}',
      },
      description: {
        // template
        en:
          'A {event} alert has been issued for {areas}. For more information call {phone}.',
        sw:
          'Ilani ya {event} imetolewa kwa {areas}. Kwa taarifa zaidi piga {phone}.',
      },
    },
    booleans: { default: true },
  },
];

module.exports = templates;
