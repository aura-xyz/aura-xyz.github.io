import { useEffect, useRef, useState } from "react";

/**
 * 区块统一容器。
 *
 * tone 决定本段是白底还是通栏浅底色带。全站按「白 → 浅 → 白 → 浅」有意交替，
 * 取代原先"只有特性区套了一段灰底"的偶然分段——节奏由结构产生，而非靠装饰堆。
 * 色带是通栏的（带上下描边），内部内容仍受 max-w-6xl 约束。
 *
 * 进入视口时做一次淡入上移（prefers-reduced-motion 下由全局 CSS 立即完成）。
 */
export default function Section({
  children,
  className = "",
  id,
  tone = "plain",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "plain" | "sunken";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-20 ${
        tone === "sunken" ? "border-y border-line bg-surface-sunken" : ""
      } ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-6 py-20 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:py-24 ${
          shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
