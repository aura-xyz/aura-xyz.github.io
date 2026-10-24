import { useI18n } from "../i18n/context";

/**
 * 首屏产品窗口下方的信任横条（官网惯例 trust bar）。
 * 聚焦隐私/开源等信任信号，与 Hero 信息条（技术栈/获取方式）内容不重复；
 * 每个条目前置品牌点作为签名，整体落在浅底带里制造轻微分区。
 */
export default function TrustBar() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-card border border-line bg-surface-sunken px-6 py-4">
        {t.trust.items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-xs text-subtle"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
