import { Fragment, useState } from "react";
import { useI18n } from "../i18n/context";
import { demoBlocks, demoUserMessage, type DemoBlock } from "../demoData";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

/** demo 正文只支持单层反引号内联代码，够用且免引库 */
function InlineText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="code-inline">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** 动作行样式复刻主应用 ActionRow：等宽小字、chevron、detail 折叠块 */
function DemoAction({ block }: { block: DemoBlock }) {
  const { lang } = useI18n();
  const detail = block.detail;
  const [open, setOpen] = useState(false);

  return (
    <div className="font-mono text-[13px] leading-relaxed">
      <div className="flex items-start gap-2">
        {detail ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "收起输出 / Collapse" : "展开输出 / Expand"}
            className="mt-1 shrink-0 text-subtle transition-transform hover:text-foreground"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={`transition-transform ${open ? "rotate-90" : ""}`}
            >
              <path
                d="M6 3l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
        <span className="min-w-0 break-all text-subtle">
          {block.text[lang]}
        </span>
      </div>
      {detail && open && (
        <pre className="ml-5 mt-1.5 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-tag border border-line bg-surface-sunken px-2.5 py-2 text-[12px] leading-relaxed text-subtle">
          {detail[lang]}
        </pre>
      )}
    </div>
  );
}

export default function ToolCallDemo() {
  const { lang, t } = useI18n();

  return (
    <Section>
      <SectionHeader
        eyebrow={t.demo.eyebrow}
        heading={t.demo.heading}
        desc={t.demo.desc}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* 用户气泡，样式复刻主应用 UserBubble */}
        <div className="flex justify-end">
          <div className="max-w-[75%] whitespace-pre-wrap break-words rounded-card bg-bubble px-4 py-3 text-[15px] leading-relaxed">
            {demoUserMessage[lang]}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {demoBlocks.map((block, i) =>
            block.kind === "action" ? (
              <DemoAction key={i} block={block} />
            ) : (
              <p key={i} className="text-[15px] leading-relaxed">
                <InlineText text={block.text[lang]} />
              </p>
            ),
          )}
        </div>
      </div>
    </Section>
  );
}
