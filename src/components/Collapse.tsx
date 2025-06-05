// components/Collapse.js
import { useState } from 'react';
import styles from './Collapse.module.css';

const Collapse = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const excerpt = children.props.children.length > 150 ? children.props.children.substring(0, 150) + '...' : children.props.children;

  return (
    <div className={styles.collapse}>
      {!isOpen && <div className={styles.collapseHeader}>
        <span>{excerpt}</span>
        <span className={styles.readMoreLink} onClick={toggleCollapse}>
          {isOpen ? 'Read Less' : 'Read More'}
        </span>
      </div>}
      {isOpen && <div className={styles.collapseContent}>{children}</div>}
    </div>
  );
};

export default Collapse;
