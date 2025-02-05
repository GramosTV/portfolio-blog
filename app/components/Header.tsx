'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/header.module.sass';
import Link from 'next/link';
const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    const newTheme = !isDark ? 'dark' : 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${newTheme}-theme`);
    localStorage.setItem('theme', newTheme);
  };
  return (
    <header className={styles.header}>
      <h2>Mikołaj Gramowski</h2>
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
        <button onClick={toggleTheme}>Switch to {isDark ? 'Light' : 'Dark'} Theme</button>
      </div>
    </header>
  );
};

export default Header;
