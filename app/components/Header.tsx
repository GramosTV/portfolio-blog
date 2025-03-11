'use client';
import React, { useEffect, useState } from 'react';
import styles from './header.module.sass';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isAtTop = latest < 10;

    setHidden(!isAtTop);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme =
        localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      setIsDark(savedTheme === 'dark');
      document.body.classList.add(`${savedTheme}-theme`);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    const newTheme = newIsDark ? 'dark' : 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${newTheme}-theme`);
    localStorage.setItem('theme', newTheme);
  };

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    hidden: {
      y: '-100%',
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <motion.header
      className={styles.header}
      variants={headerVariants}
      animate={hidden ? 'hidden' : 'visible'}
      initial="visible"
    >
      <h2>
        Mikołaj<sup>™</sup> Gramowski®
      </h2>
      <div>
        <ul>
          <li>
            <Link href={'about-me'}>About Me</Link>
          </li>
          <li>
            <Link href={'portfolio'}>Portfolio</Link>
          </li>
          <li>
            <Link href={'blog'}>Blog</Link>
          </li>
          <li>
            <Link href={'contact'}>Contact</Link>
          </li>
        </ul>
        <button
          onClick={toggleTheme}
          className={`${styles.themeToggle} ${isDark ? styles.darkMode : styles.lightMode}`}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
        >
          {isDark ? '☀️' : '🌙'}
          <span>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
