interface Props {
  eyebrow: string;
  heading: string;
  desc?: string;
  /** 对齐方式；全站不再一律居中，由各段按节奏需要选择 */
  align?: "center" | "left";
}

/**
 * 区块眉题。
 * 居中用于统领交替分屏，左对齐用于双栏型区块——两者交替即构成节奏差。
 */
export default function SectionHeader({
  eyebrow,
  heading,
  desc,
  align = "center",
}: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <p className="eyebrow-pill mb-3">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      {desc && (
        <p
          className={`mt-4 text-balance text-lg text-subtle ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
