import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import styles from './playground.module.sass';
import Home from './Home';

export default function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSections = 4;

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      <div className={styles.spacer} style={{ height: `${100 * (totalSections - 0.85)}vh` }} />

      <Section
        className={styles.sectionOne}
        isFirst={true}
        containerRef={containerRef}
        index={0}
        totalSections={totalSections}
      >
        <Home />
      </Section>

      <Section className={styles.sectionTwo} containerRef={containerRef} index={1} totalSections={totalSections}>
        <h2>Section Two</h2>
        <p>Building on previous ideas.</p>
      </Section>

      <Section className={styles.sectionThree} containerRef={containerRef} index={2} totalSections={totalSections}>
        <h2>Section Three</h2>
        <p>Adding another layer.</p>
      </Section>

      <Section className={styles.sectionFour} containerRef={containerRef} index={3} totalSections={totalSections}>
        <h2>Section Four</h2>
        <p>The top of our stack.</p>
      </Section>
    </div>
  );
}

const Section = ({
  containerRef,
  index,
  totalSections,
  children,
  style,
  className,
  isFirst = false,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  totalSections: number;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isFirst?: boolean;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start', 'end'],
  });

  const sectionProgress = useTransform(
    scrollYProgress,
    [isFirst ? 0 : Math.max(0, index - 0.7) / totalSections, (index + 0.25) / totalSections],
    [isFirst ? 1 : 0, 1]
  );

  const y = useTransform(sectionProgress, [0, 1], [isFirst ? '0vh' : '100vh', '0vh']);
  const scale = useTransform(sectionProgress, [0, 0.9, 1], [isFirst ? 1 : 0.96, 0.99, 1]);
  const yOffset = index * 2;

  const fadeOutProgress = useTransform(
    scrollYProgress,
    [
      isFirst ? 0.05 / totalSections : (index + 0.5) / totalSections,
      isFirst ? 0.65 / totalSections : (index + 1.1) / totalSections,
    ],
    [1, 0]
  );

  const opacity = index === totalSections - 1 ? 1 : fadeOutProgress;

  return (
    <motion.section
      className={`${styles.section} ${className || ''}`}
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
        translateY: yOffset,
        ...style,
      }}
      initial={isFirst ? { y: 0, opacity: 1, scale: 1 } : undefined}
    >
      <div className={styles.content}>{children}</div>

      <div className={styles.paperEdge} />
    </motion.section>
  );
};
