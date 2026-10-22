import { useI18n } from "../i18n/context";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

/** 卡片配图的 lucide 风格手写路径，顺序与字典 items 一一对应 */
const ICONS: (string | readonly string[])[] = [
  [
    "M3 5v14a9 3 0 0 0 18 0V5",
    "M3 12a9 3 0 0 0 18 0",
    "M3 5a9 3 0 0 1 18 0 9 3 0 0 1-18 0z",
  ],
  [
    "M9 2v2",
    "M15 2v2",
    "M9 20v2",
    "M15 20v2",
    "M2 9h2",
    "M2 15h2",
    "M20 9h2",
    "M20 15h2",
    "M6 6h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
    "M10 10h4v4h-4z",
  ],
  ["M12 2 2 7l10 5 10-5-10-5z", "m2 12 10 5 10-5", "m2 17 10 5 10-5"],
  [
    "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0",
    "M2 12h20",
    "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  ],
];

function CardIcon({ d }: { d: string | readonly string[] }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {(typeof d === "string" ? [d] : d).map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

export default function FeatureGrid() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t.features.eyebrow}
        heading={t.features.heading}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {t.features.items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-card border border-line p-6 transition-colors hover:border-subtle"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-tag bg-bubble text-foreground">
              <CardIcon d={ICONS[i % ICONS.length]} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-subtle">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
