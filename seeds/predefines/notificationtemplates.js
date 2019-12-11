const templates = [
  {
    namespace: 'NotificationTemplate',
    strings: {
      name: {
        en:
          'A {event} alert has been issued for {areas}. For more information call {phone}.',
        sw:
          'Ilani ya {event} imetolewa kwa {areas}. Kwa taarifa zaidi piga {phone}.',
      },
      description: {
        en:
          'A {event} alert has been issued for {areas}. For more information call {phone}.',
        sw:
          'Ilani ya {event} imetolewa kwa {areas}. Kwa taarifa zaidi piga {phone}.',
      },
      booleans: { default: true },
    },
  },
];

module.exports = templates;
