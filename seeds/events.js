const events = [
  {
    _id: '5d535a0a62b47901d3294ff8',
    stage: 'Event',
    number: 'FL-2018-000033-TZA',
    causes: 'Heavy rainfall',
    description: 'Overflowing water from the dam',
    places: 'Ilala, Temeke, Dar es Salaam',
    instructions: 'Continue monitor the situation',
    interventions: 'Affected victims were evacuated and relocated',
    impacts: '55 people affected, 72 houses destroyed and 9 schools damaged',
    remarks: 'Relief items should be provided to the victims',
    startedAt: '2019-10-17T07:53:32.831Z',
    endedAt: '2019-10-19T07:53:32.831Z',
    populate: {
      group: {
        match: { 'strings.name.en': 'Hydrological' },
        model: 'Predefine',
      },
      type: {
        match: { namespace: 'EventType', 'strings.name.en': 'Flood' },
        model: 'Predefine',
      },
      level: {
        match: { namespace: 'EventLevel', 'strings.name.en': 'Orange' },
        model: 'Predefine',
      },
      severity: {
        match: { namespace: 'EventSeverity', 'strings.name.en': 'Extreme' },
        model: 'Predefine',
      },
      certainty: {
        match: { namespace: 'EventCertainty', 'strings.name.en': 'Possible' },
        model: 'Predefine',
      },
      status: {
        match: { namespace: 'EventStatus', 'strings.name.en': 'Actual' },
        model: 'Predefine',
      },
      urgency: {
        match: { namespace: 'EventUrgency', 'strings.name.en': 'Immediate' },
        model: 'Predefine',
      },
    },
  },
];

module.exports = events;
