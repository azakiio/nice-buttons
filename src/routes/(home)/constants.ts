import type { Color } from "$lib/colors";

export const directions = [
  {
    name: 'top left',
    positions: [1, 1, 0, 0],
    icon: 'hugeicons-arrow-up-left-01'
  },
  {
    name: 'top',
    positions: [1, 1, 0, 0],
    icon: 'hugeicons:arrow-up-02'
  },
  {
    name: 'top right',
    positions: [0, 1, 1, 0],
    icon: 'hugeicons:arrow-up-right-01'
  },
  {
    name: 'left',
    positions: [1, 1, 0, 0],
    icon: 'hugeicons:arrow-left-02'
  },
  {
    name: 'reset',
    positions: [0, 0, 1, 1],
    icon: 'carbon:dot'
  },
  {
    name: 'right',
    positions: [0, 0, 1, 1],
    icon: 'hugeicons:arrow-right-02'
  },
  {
    name: 'bottom left',
    positions: [1, 0, 0, 1],
    icon: 'hugeicons:arrow-down-left-01'
  },
  {
    name: 'bottom',
    positions: [0, 0, 1, 1],
    icon: 'hugeicons:arrow-down-02'
  },
  {
    name: 'bottom right',
    positions: [0, 0, 1, 1],
    icon: 'hugeicons:arrow-down-right-01'
  }
];


export const patterns = [
  {
    name: 'box',
    icon: 'hugeicons:square',
    pattern: [
      [0, -2],
      [2, 0],
      [0, 2]
    ]
  },
  {
    name: 'line',
    icon: 'hugeicons:arrow-right-02',
    pattern: [
      [1, 0],
      [1, 0],
      [1, 0]
    ]
  },
  {
    name: 'diamond',
    icon: 'hugeicons:diamond',
    pattern: [
      [1, -1],
      [-1, -1],
      [-1, 1]
    ]
  },
  {
    name: 'sweep',
    icon: 'hugeicons:arrow-move-up-right',
    pattern: [
      [0, -1],
      [1, -1],
      [1, 0]
    ]
  },
  {
    name: 'camel',
    icon: 'hugeicons:camel',
    pattern: [
      [1, -1],
      [1, 0],
      [1, 1]
    ]
  },
  {
    name: 'tetris',
    icon: 'hugeicons:tetris',
    pattern: [
      [1, 0],
      [0, -1],
      [1, 1]
    ]
  },
  {
    name: 'joker',
    icon: 'hugeicons:joker',
    pattern: [
      [-1, -3],
      [4, 1],
      [-1, 2]
    ]
  },

];

type Controls = {
  textColor: string;
  angle: string;
  size: number;
  colorList: Color[];
  pattern: number[][];
  position: string;
  positionHover: string;
}

export const cssString = ({ angle, colorList, textColor, position, size, positionHover }: Controls) => `.brand-gradient {
  background-image: linear-gradient(
    to ${angle},
    ${colorList.map((c) => c.color).join(',')}
  );
  color: ${textColor};
  background-size: ${size}% ${size}%;
  background-position: ${position};
  transition: background-position 0.7s, translate 0.5s;

  &:hover {
    translate: 0 -0.25rem;
    background-position: ${positionHover};
  }
}`;