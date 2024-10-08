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
    name: 'dashed-line',
    icon: 'hugeicons:dashed-line-01',
    pattern: [
      [2, 0],
      [2, 0],
      [2, 0]
    ]
  },
  {
    name: 'box',
    icon: 'hugeicons:square',
    pattern: [
      [0, 2],
      [2, 0],
      [0, -2]
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
    name: 'down-right',
    icon: 'hugeicons:arrow-move-down-right',
    pattern: [
      [0, 1],
      [1, 1],
      [1, 0]
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
    name: 'checkmark',
    icon: 'iconamoon:check',
    pattern: [
      [1, 1],
      [1, -1],
      [1, -1]
    ]
  },
  {
    name: 'wave',
    icon: 'ph:wave-sine-bold',
    pattern: [
      [1, -1],
      [2, 2],
      [1, -1]
    ]
  },

];

export const sizes = [
  {
    name: '1x',
    value: 1
  },
  {
    name: '2x',
    value: 2
  },
  {
    name: '3x',
    value: 3
  },
  {
    name: '4x',
    value: 4
  },
  {
    name: '5x',
    value: 5
  }
];

export const durations = [
  { name: 'sprint', icon: 'mdi:flash', value: 0.5 },
  { name: 'steady', icon: 'mdi:rabbit', value: 0.7 },
  { name: 'cruise', icon: 'mdi:horse', value: 1 },
  { name: 'turtle', icon: 'mdi:turtle', value: 1.3 },
  { name: 'snail', icon: 'mdi:snail', value: 1.5 }
];

export type Controls = {
  textColor: string;
  angle: string;
  size: number;
  colorList: Color[];
  pattern: number[][];
  position: string;
  positionHover: string;
  duration: number;
}

export const cssString = ({ angle, colorList, textColor, position, size, positionHover, duration }: Controls) => `.brand-gradient {
  background-image: linear-gradient(
    to ${angle},
    ${colorList.map((c) => c.color).join(', ')}
  );
  color: ${textColor};
  background-size: ${size * 100}% ${size * 100}%;
  background-position: ${position};
  transition: 
    background-position 0.7s,
    translate ${duration}s;

  &:hover {
    translate: 0 -0.25rem;
    background-position: ${positionHover};
  }
}`;