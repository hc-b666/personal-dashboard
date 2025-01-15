import {
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTypescript,
} from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { type IconType } from "react-icons/lib";

type IconsType = {
  [key: string]: IconType;
};

export const icons: IconsType = {
  typescript: BiLogoTypescript,
  javascript: BiLogoJavascript,
  react: BiLogoReact,
  nextjs: RiNextjsFill,
};
