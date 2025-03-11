import React from 'react';
import styles from './home.module.sass';
import Image from 'next/image';
import thomas from '@/app/assets/thomas.webp';
const Home = () => {
  return (
    <div className={styles.container}>
      <h1>
        GRAMOWSKI <p>Ltd.</p>
      </h1>
      <div className={styles.wrapper}>
        <div>
          <p>Full-stack developer</p>
          <p>Based in Vienna, Austria</p>
        </div>

        <Image src={thomas} width={350} height={500} alt="Thom Shelb" />

        <div>
          <p>Full-stack developer</p>
          <p>Based in Vienna, Austria</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
