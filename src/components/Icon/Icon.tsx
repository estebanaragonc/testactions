import { iconNames } from './iconNames';

type Props = {
  size?: number;
  color?: string;
  viewBox?: string;
  name: keyof typeof iconNames;
};

export const Icon = ({
  name,
  size = 18,
  color = 'black',
  viewBox = '0 0 24 24',
}: Props) => {
  const iconSvg = iconNames[name];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      width={size}
      height={size}
      fill={color}
    >
      {iconSvg}
    </svg>
  );
};
