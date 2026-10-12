"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type LenisScroll = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; force?: boolean; offset?: number }
  ) => void;
};

export default function SectionLink({
  hash,
  children,
  className,
}: {
  hash: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const href = pathname === "/" ? `#${hash}` : `/#${hash}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(hash);
    if (!el) return;

    event.preventDefault();
    const scroller = (window as unknown as { __lenis?: LenisScroll }).__lenis;
    const header = document.querySelector(".site-header");
    const offset = header instanceof HTMLElement ? -(header.offsetHeight + 12) : -88;

    if (scroller) scroller.scrollTo(el, { offset });
    else el.scrollIntoView({ block: "start" });

    if (window.location.hash !== `#${hash}`) {
      history.pushState(null, "", `#${hash}`);
    }
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
