import type { ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  size?: "md" | "sm";
  tone?: "dark" | "light";
};

type LinkButton = Common & {
  href: string;
  target?: string;
  rel?: string;
  type?: never;
};

type ActionButton = Common & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
};

type ShinyButtonProps = LinkButton | ActionButton;

export default function ShinyButton({
  children,
  className = "",
  size = "md",
  tone = "dark",
  ...props
}: ShinyButtonProps) {
  const classes = [
    "shiny",
    tone === "light" ? "shiny-light" : "",
    size === "sm" ? "shiny-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    return (
      <a href={props.href} target={props.target} rel={props.rel} className={classes}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      <span>{children}</span>
    </button>
  );
}
