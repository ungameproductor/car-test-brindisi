import { ImageOff } from "lucide-react";

interface PlaceholderProps {
  label?: string;
  className?: string;
}

/**
 * Segnaposto per foto ancora non fornite dal cliente.
 * Ha campitura in Lamiera + tratteggio diagonale + icona.
 * Brief §6.6
 */
export default function Placeholder({
  label = "Foto fornita dal cliente",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden ${className}`}
      style={{
        backgroundColor: "#17202A",
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(139,154,170,0.06) 8px, rgba(139,154,170,0.06) 9px)",
      }}
      aria-label={label}
    >
      <ImageOff
        size={32}
        className="text-acciaio/50"
        aria-hidden="true"
      />
      <span className="text-acciaio text-xs font-body tracking-wide px-4 text-center">
        {label}
      </span>
    </div>
  );
}
