import ShinyButton from "@/components/ShinyButton";

interface PlateButtonProps {
  href: string;
  children: React.ReactNode;
  note?: string;
}

export default function PlateButton({ href, children, note }: PlateButtonProps) {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <ShinyButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tone="light"
        className="w-full sm:w-auto"
      >
        {children}
      </ShinyButton>
      {note && <p className="text-sm text-acciaio">{note}</p>}
    </div>
  );
}
