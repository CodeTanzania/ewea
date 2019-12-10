const actions = [
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Issuing operational guidelines to respond to emergencies that are consistent with the applicable legal framework',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Convening DarMAERT to assess the emergency',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing overall direction and coordination of emergency response operations',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Activating the Emergency Operations Center when required (fully or partially)',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Declaring a regional emergency when deemed necessary',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Working with the Regional Disaster Management Committee to request national assistance from Prime Minister’s Office when required',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Terminating the response operations when appropriate',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Direction and Control' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Receiving information on emergency situations from different sources',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Organizing the use of available communication systems during the emergency',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Activating backup or alternative communication systems',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Maintaining communications log of messages in and out of the Emergency Operations Centre',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Recording of the event and data keeping',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Alerting key regional officials and other non-governmental actors on potential emergency situations',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Disseminating warning information to the public through available communication means, such as public announcements, sirens, radio and television',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Disseminating the official released warning instructions to the public through a network of volunteers.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Receiving information on emergency situations from different sources.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Disseminating the official released warning instructions to the public through available communication means.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Issuing weather forecasts and warnings for weather related hazards rests',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Issuing warnings for health-related risks',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Recording of the event and data keeping.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Disseminating the official released warning information and instructions to the public through a network of volunteers.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing equipment and personnel for supporting the dissemination of warnings to the public.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Broadcasting the official released warning and emergency information and instructions to the public.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Relaying officially released information to their customers through bulk messages.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Communication and Warning' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Releasing evacuation information to the public, emphasizing on the need to evacuate.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Developing the evacuation plan with primary and alternative evacuation routes on map and activation of such a plan.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Estimating the number of people to be evacuated and identifying means to transport them.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Identifying potential challenges (e.g. narrow bridges) of using the selected routes.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Estimating the time needed to accomplish the evacuation.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Informing the public about the need to evacuate.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing traffic control and keeping evacuation routes open and secure.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Issuing evacuation order and instructions',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Releasing evacuation information to the public, emphasizing on the need to evacuate',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing transport of evacuees to the reception sites',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Evacuating patients from affected hospitals, health centers and dispensaries.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Assisting in evacuating the most vulnerable groups of the population, such as the elder, children, pregnant women and people with disabilities.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Evacuation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Preventing, detecting and controlling fire in the disaster area.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Firefighting' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing personnel and equipment for firefighting.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Firefighting' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating firefighting activities, including private firefighting companies responding to the disaster.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Firefighting' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Disconnecting power supply from the building on fire.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Firefighting' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Establishing cordons to facilitate the work of other emergency services in saving lives, protection of the public and care of survivors.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Law Enforcement' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing security to the affected population and its property, and critical facilities including the EOC and shelter facilities.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Law Enforcement' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Controlling the traffic and crowd.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Law Enforcement' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Protecting property in evacuated areas and limiting access to them.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Law Enforcement' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Directing government and partners’ (e.g. private hospitals) efforts to perform triage and provide treatment, stabilization and medical care to the affected population.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Conducting triage.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating deployment of health/medical personnel, drugs, equipment, and supplies at the disaster site, and/or retaining them at the hospital for the incoming patients.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating with emergency responders to isolate and decontaminate incoming patients at health facilities, if needed, to prevent spread of chemical or bacteria/virus agents to other patients and staff.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating with emergency responders to isolate and decontaminate incoming patients in the field, if needed, to prevent spread of chemical or bacteria/virus agents to other patients and staff.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing psychosocial support to the traumatized populating.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Coordinating immunization and quarantine when required.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing life support services.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing first aid services to the affected people.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Health and Medical Services' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Coordinating search and rescue activities during a disaster.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Search and Rescue' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Detecting and extracting people trapped, lost or at risk.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Search and Rescue' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing transport of the rescued persons to safer areas and health facilities.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Search and Rescue' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Quantifying and registering of people located and rescued.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Search and Rescue' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Planning and opening of shelter facilities',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Constructing temporary shelters',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Managing and coordinating of shelter facilities',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Maintaining key information about the disaster affected people (e.g. names, ages and sex)',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Performing family reunification',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing psychosocial support to the affected people  ',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing health and medical services to the disaster victims and injured ones',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Establishing preventive health services including control of communicable diseases in the shelters',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Supplying necessary equipment for running shelter facilities and mass care',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Handling logistics of relief items',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Terminating shelter operations and closing facilities',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Maintaining order and security.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing water, sanitaion and hygiene services',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Maintaning order and security.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing water services',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing electricity to the shelters.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Ensuring the provision of water services to the shelters.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing waste water management services to the shelters',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Providing needed relief items.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Promoting water sanitation and hygiene practices to the evacuees in established shelters.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Shelter and Mass Care' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Preparing and releasing disaster-related information to the public in regular media briefs.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Controlling rumor',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Establishing Media Liaison Point and Media Liaison Officer to monitor information released by the media and ensuring flow of accurate information.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Collaborating with disaster experts to develop public information related to risks and protective actions.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Responding to public information inquiries.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Broadcasting official released information about the disaster to the public.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Emergency Public Information' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Coordinating damage assessment exercise',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Damage Assessment' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Assigning regional damage assessment teams and equipping them with the necessary resources (e.g. transport, tools, equipment and personnel)',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Damage Assessment' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Conducting damage assessment',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Damage Assessment' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Sharing damage assessment with the Regional Disaster Management Team',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Damage Assessment' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Assigning regional damage assessment teams and equipping them with the necessary resources (e.g. transport, tools, equipment and personnel).',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Damage Assessment' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating all public works activities during disaster response that relate to emergency repair to the infRegional Administrative Secretarytructure and restoration of utility services.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Coordinating debris removal.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Inspecting, designating and demolishing public hazardous structures.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Supervising emergency road damage repair.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Restoring road communications.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Providing alternative route to the traffic while road is under repair.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Executing emergency repair to restore public infrastructure.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Lending out required working machinery and equipment during disaster response.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Public Works and Engineering' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating all emergency repair activities to restore utilities’ services.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Utilities' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Deploying technical emergency response teams',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Utilities' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Restoring the damaged electricity public infrastructure.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Utilities' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Monitoring the repair work.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Utilities' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Arranging the provision of emergency power from other sources to hospitals, emergency shelters, other critical facilities and people.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Utilities' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Identifying specific goods, services and personnel and communicating for resource mobilization and allocation ',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Resources Management and Supply' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Soliciting required resources from within and outside the government',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Resources Management and Supply' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Coordinating logistics for relief supplies (procurement, transportation, storage, distribution and inventory management of relief items), donations, medical staff and equipment',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Resources Management and Supply' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Determining available transport networks and alternative means and modes to move people and goods within the disaster affected area',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Identifying and coordinating allocation of transportation resources per requirements',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Transporting relief items, volunteers and affected population to the intended destination',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Dispatching ambulance for transportation of the disaster affected victims to the health facilities.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Controlling the traffic.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Controlling the crowd',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Transportation' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Establishing temporary mortuary at a designated site for caring of human remains.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Identifying and collecting dead bodies.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Transporting dead bodies to the mortuary.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Quantifying and registering dead bodies that have been handled or require handling.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Determining causes of deaths.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
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
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en: 'Locating and notifying relatives.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
  {
    namespace: 'EventAction',
    strings: {
      name: {
        en:
          'Conducting burial of unidentified bodies or of those who pose a health risk.',
      },
    },
    populate: {
      'relations.function': {
        match: { 'strings.name.en': 'Dead Bodies Management' },
        model: 'Predefine',
      },
    },
  },
];
module.exports = actions;
