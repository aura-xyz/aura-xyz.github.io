import AppWindow from "./AppWindow";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { useI18n } from "../i18n/context";

export default function Screenshot() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t.screenshot.eyebrow}
        heading={t.screenshot.heading}
        desc={t.screenshot.desc}
      />
      <AppWindow />
    </Section>
  );
}
