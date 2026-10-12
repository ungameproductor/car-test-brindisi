import type { ReactNode } from "react";

interface IconFrameProps {
  children: ReactNode;
  small?: boolean;
}

/** Riquadro arrotondato con icona a tratto, come nelle card di Automize. */
export default function IconFrame({ children, small = false }: IconFrameProps) {
  return <span className={small ? "icon-frame icon-frame-sm" : "icon-frame"}>{children}</span>;
}
