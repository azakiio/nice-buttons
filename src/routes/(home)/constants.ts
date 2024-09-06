
export const directions = [
  {
    name: 'top left',
    positions: [1, 1, 0, 0],
    icon: 'carbon:arrow-up-left'
  },
  {
    name: 'top',
    positions: [1, 1, 0, 0],
    icon: 'carbon:arrow-up'
  },
  {
    name: 'top right',
    positions: [0, 1, 1, 0],
    icon: 'carbon:arrow-up-right'
  },
  {
    name: 'left',
    positions: [1, 1, 0, 0],
    icon: 'carbon:arrow-left'
  },
  {
    name: 'reset',
    positions: [0, 0, 1, 1],
    icon: 'carbon:dot'
  },
  {
    name: 'right',
    positions: [0, 0, 1, 1],
    icon: 'carbon:arrow-right'
  },
  {
    name: 'bottom left',
    positions: [1, 0, 0, 1],
    icon: 'carbon:arrow-down-left'
  },
  {
    name: 'bottom',
    positions: [0, 0, 1, 1],
    icon: 'carbon:arrow-down'
  },
  {
    name: 'bottom right',
    positions: [0, 0, 1, 1],
    icon: 'carbon:arrow-down-right'
  }
];


export const patterns = [
  {
    name: 'line-x',
    icon: 'mdi:horizontal-line',
    pattern: [
      [1, 0],
      [1, 0],
      [1, 0]
    ]
  },
  {
    name: 'diamond',
    icon: 'mdi:diamond',
    pattern: [
      [1, -1],
      [-1, -1],
      [-1, 1]
    ]
  },
  {
    name: 'box',
    icon: 'mdi:square',
    pattern: [
      [0, -2],
      [2, 0],
      [0, 2]
    ]
  },
  {
    name: 'right and back',
    icon: 'mdi:square',
    pattern: [
      [1, 0],
      [1, 0],
      [-3, -1]
    ]
  }
];

export const cssString = `
.brand-gradient {
background-image: linear-gradient(
  135deg,
  oklch(var(--s)),
  oklch(var(--p)),
  oklch(var(--a)),
  rgb(251 146 60)
);
color: oklch(var(--pc));
background-size: 400% 400%;
background-position: 0% 0%;
transition: background-position 1s, transform 0.5s;

&:hover {
  background-position: 100% 100%;
}
}`;