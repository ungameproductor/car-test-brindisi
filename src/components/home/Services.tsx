import { Bike, Car, ClipboardCheck, Cpu, Thermometer, Wind, Wrench } from "lucide-react";
import IconFrame from "@/components/IconFrame";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/content/site";

const ICONS = {
  ClipboardCheck,
  Wrench,
  Cpu,
  Wind,
  Thermometer,
} as const;

export default function Services() {
  const featured = SERVICES.find((service) => service.featured);
  const others = SERVICES.filter((service) => !service.featured);

  return (
    <section id="servizi" className="wrap py-16 sm:py-24">
      <h2 className="mb-8 text-ghiaccio sm:mb-12">Cosa facciamo</h2>

      <div className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {featured && (
          <Reveal className="h-full min-[1024px]:col-span-2" delay={0}>
            <article className="panel lift chamfer-lg flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
              <div>
                <ServiceIcon name={featured.icon} />
                <h3 className="mt-5 mb-3 text-2xl text-ghiaccio sm:text-3xl">{featured.title}</h3>
                <p className="max-w-xl text-acciaio">{featured.description}</p>
              </div>
              <div aria-hidden="true" className="h-px w-16 bg-azzurro/70" />
            </article>
          </Reveal>
        )}

        {others.map((service, index) => (
          <Reveal key={service.id} className="h-full" delay={80 + index * 70}>
            <article className="panel lift chamfer flex h-full flex-col gap-4 p-5 sm:p-6">
              <ServiceIcon name={service.icon} />
              <div>
                <h3 className="mb-2 text-ghiaccio">{service.title}</h3>
                <p className="text-sm leading-relaxed text-acciaio sm:text-base">{service.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="panel mt-4 overflow-hidden">
          <p className="border-b border-acciaio/15 px-4 py-3 text-sm text-acciaio">Lavoriamo su auto e moto</p>
          <div className="grid grid-cols-2">
            <p className="flex min-h-16 items-center justify-center gap-3 border-r border-acciaio/15 text-ghiaccio">
              <IconFrame small>
                <Car size={18} strokeWidth={1.75} aria-hidden="true" />
              </IconFrame>
              Auto
            </p>
            <p className="flex min-h-16 items-center justify-center gap-3 text-ghiaccio">
              <IconFrame small>
                <Bike size={18} strokeWidth={1.75} aria-hidden="true" />
              </IconFrame>
              Moto
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Wrench;
  return (
    <IconFrame>
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
    </IconFrame>
  );
}
