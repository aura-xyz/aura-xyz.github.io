interface Props {
  eyebrow: string;
  heading: string;
  desc?: string;
}

/** 各区块统一的居中小标题 */
export default function SectionHeader({ eyebrow, heading, desc }: Props) {
  return (
    <div className="mb-14 text-center">
      <p className="eyebrow-pill mb-3">{eyebrow}</p>
      <h2 className="text-balance font-semibold tracking-tight text-foreground text-3xl sm:text-4xl">
        {heading}
      </h2>
      {desc && (
        <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-subtle">
          {desc}
        </p>
      )}
    </div>
  );
}
