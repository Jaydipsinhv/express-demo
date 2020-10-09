const baseSample = {
  name: 'CAR',
  rules: [
    'NOT ([an003] AND [tou001])',
  ],
  components: [{
    id: 'tou001',
    name: 'SunRoof',
    option: true,
  }],
};

const wheels = {
  id: 'ch001',
  name: 'Wheel',
  rules: [
    '([ja001] AND ([pn003] OR [pn004] OR [pn002]))',
    '([ja002] AND ([pn002] OR [pn005]))',
  ],
  components: [
    {
      id: 'pn001',
      name: 'Tyre',
      variants: [],
    },
    {
      id: 'ja000',
      name: 'Rim',
      variants: [],
    },
  ],
};
const rimVariant = [
  {
    id: 'ja001',
    name: 'Steel Rim',
    available: true,
  },
  {
    id: 'ja002',
    name: 'Alu Rim',
    available: true,
  },
];

const tyreVariants = [
  {
    id: 'pn005',
    name: 'Tyre 18 inches',
    criteria: [],
    available: true,
  },
  {
    id: 'pn002',
    name: 'Tyre 20 inches',
    criteria: [],
    available: true,
  },
  {
    id: 'pn003',
    name: 'Tyre 22 inches',
    available: true,
  },
  {
    id: 'pn004',
    name: 'Tyre 24 inches',
    available: true,
  },
];

const antenna = {
  id: 'an001',
  name: 'antenna',
  option: true,
  variants: [],
};

const antennaVariant = [
  {
    id: 'an002',
    name: 'classic antenna',
    available: true,
  },
  {
    id: 'an003',
    name: 'roof antenna',
    available: true,
  },
];

module.exports = {
  baseSample,
  wheels,
  tyreVariants,
  rimVariant,
  antenna,
  antennaVariant,
};
