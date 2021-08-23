import { SvgIconProps } from "../types";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`GR_landing_page_poc/img/svg/${src}`} alt={src} width={width} height={height} />
);
