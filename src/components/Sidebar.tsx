"use client"

import { useState } from 'react';
import styles from './Sidebar.module.css';
import BlogExcerpt from './BlogExcerpt';
import Collapse from './Collapse';
import Link from 'next/link';

const Sidebar = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <div className={styles.sidebarHeader} onClick={toggleSidebar}>
            <h1 style={{ fontWeight: 'bold' }}>WORLD FILM ARCHIVE</h1>
            <span className={styles.sidebarClose}>
              {isExpanded ? '⨯' : '➕'}
            </span>
          </div>
          <Collapse>
            <p>
              Welcome to the World Film Archive, a digital gateway to the world&apos;s 
              most treasured film collections.
              This interactive website showcases a dynamic map highlighting film archive
              institutes across the globe.
              Discover where iconic reels are preserved, view detailed profiles of each institute,
              explore digitized collections, and learn about their history and cultural impact.
              Whether you&apos;re a researcher, filmmaker, or cinephile, this platform connects you
              to the institutions safeguarding the legacy of cinema.
            </p>
          </Collapse>
          <div className={styles.sidebarFeatured}>
            <h2 className='font-bold mb-3'>Featured</h2>
            <BlogExcerpt post={post} />
            <Link href="/blog" className='block mt-3 underline'>
              Visit the Blog
            </Link>
          </div>
        </div>
        <div className={styles.sidebarLegend}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '.75em' }}>Legend</h2>
          <div><div className={styles.legendColor} style={{backgroundColor: 'green'}}></div> Content accessible ✅</div>
          <div><div className={styles.legendColor} style={{backgroundColor: 'orange'}}></div> Institutional only</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
