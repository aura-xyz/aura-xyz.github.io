import { useEffect, useRef, useState } from "react";

/**
 * 区块内容统一容器；宽度阶梯对齐主应用对话区（xl → 2xl → 6xl）。
 * 进入视口时做一次淡入上移（prefers-reduced-motion 下由全局 CSS 立即完成）。
 */
export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
      className={`mx-auto w-full max-w-6xl px-6 py-20 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:py-24 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}
