// app/blog/page.js
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-bold">Blog World Film Archive</h1>
      <p>A selection of highlights. Updated sometimes.</p>

      <Link href="/" style={{ color: 'aqua', textDecoration: 'underline'}}>
        Back to the map
      </Link>
      
      <ul className="mt-4">
        {allPostsData.map(({ slug, date, title }) => (
          <Link key={slug} href={`/blog/${slug}`}>
          <li style={{ backgroundColor: 'rgba(256, 256, 256, 0.2)'}} className='p-4 rounded'>
              {title}
            <br />
            <small>{date}</small>
            <div className='underline'>Read more</div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
