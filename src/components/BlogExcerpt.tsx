'use client'
import { Post } from '@/lib/posts';
import Link from 'next/link';

const BlogExcerpt = ({ post }: { post: Post }) => {
  const { frontMatter, contentHtml, slug } = post
  const { date, title } = frontMatter

  return (
    <article className='bg-white rounded p-4'>
        <Link href={`/blog/${slug}`}>
        <h3 className='mb-0'>{title}</h3>
        <div className='text-sm'>{date}</div>
        <div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </Link>
    </article>
  );
}


export default BlogExcerpt;
