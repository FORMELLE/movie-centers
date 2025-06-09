"use client"

import { useState } from 'react';
import styles from './Sidebar.module.css';
import BlogExcerpt from './BlogExcerpt';
import Collapse from './Collapse';
import Link from 'next/link';
import { Post } from '@/lib/posts';

const Sidebar = ({ post }: { post: null|Post }) => {
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
            "Dans toute vie nous trouverions des continents, des îles, des déserts, des marais, des territoires surpeuplés et des *terrae incognitae*. 
            De cette mémoire nous pourrions dessiner la carte, extraire des images avec plus de facilité (et de vérité) que des contes et légendes. 
            Que le sujet de cette mémoire se trouve être un photographe et un cinéaste ne veut pas dire que sa mémoire est en soi plus intéressante 
            que celle du monsieur qui passe (et encore moins de la dame), mais simplement qu'il a laissé, lui, des traces sur lesquelles on peut travailler,
            et des contours pour dresser ses cartes." — Chris Marker, Immemory
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
          <div><div className={styles.legendColor} style={{backgroundColor: 'green'}}></div> Content accessible</div>
          <div><div className={styles.legendColor} style={{backgroundColor: 'orange'}}></div> Institutional only</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
