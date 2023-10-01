import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

interface CommonProps {
  children: string;
  className?: string;
  type?: "button" | "link";
  isBlogPost?: boolean;
}

interface LinkProps {
  href: string;
  type?: "link";
  target?: HTMLAttributeAnchorTarget;
}

interface ButtonProps {
  onClick: () => void;
  type: "button";
}

type Props = CommonProps & (LinkProps | ButtonProps);

export default function slink(props: Props) {
  return (
    <Link
      href={
        !props.type || props.type == "link" ? props.href : "javascript:void(0);"
      }
      onClick={props.type == "button" ? props.onClick : undefined}
      className={`hover:underline ${
        props.className && props.className.indexOf("hover:text-") >= 0
          ? props.className
          : props.className + (props.isBlogPost ? "" : " hover:text-lime-200")
      } hover:-translate-y-[0.08rem] transition-all`}
      target={!props.type || props.type == "link" ? props.target : undefined}
    >
      {props.children}
    </Link>
  );
}
