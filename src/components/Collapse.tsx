import { useState, ReactNode } from 'react';
import styles from './Collapse.module.css';

// Define a type for the component props
type CollapseProps = {
  children: { props: { children: string }};
};

const Collapse = ({ children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const excerpt = children?.props.children.length > 150 ? children?.props.children.substring(0, 150) + '...' : children?.props.children;

  return (
    <div className={styles.collapse}>
      {!isOpen && <div className={styles.collapseHeader}>
        <span>{excerpt}</span>
        <span className={styles.readMoreLink} onClick={toggleCollapse}>
          {isOpen ? 'Read Less' : 'Read More'}
        </span>
      </div>}
      {isOpen && <div className={styles.collapseContent}>{children as ReactNode}</div>}
    </div>
  );
};

export default Collapse;
