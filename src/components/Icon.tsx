/** 手绘 SVG 图标组件；路径表见同目录 iconPaths.ts */
export default function Icon({
  d,
  size = 14,
  className = "",
}: {
  d: string | readonly string[];
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {(typeof d === "string" ? [d] : d).map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
