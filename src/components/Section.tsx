/** 区块内容统一容器；宽度阶梯对齐主应用对话区（xl → 2xl → 6xl） */
export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-6 py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}
