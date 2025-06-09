'use client'
import { Post } from '@/lib/posts';
import Link from 'next/link';

const BlogExcerpt = ({ post }: { post: null|Post }) => {
  if (!post) { 
    return null;
  }
  
  const { frontMatter, contentHtml, slug } = post;
  const { date, title } = frontMatter;

  // Créer un extrait sûr du contenu HTML
  const createExcerpt = (html: string) => {
    // Enlever les balises HTML et prendre les premiers 150 caractères
    const textContent = html.replace(/<[^>]*>/g, '');
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...' 
      : textContent;
  };

  return (
    <article className='bg-white rounded p-4'>
      <Link href={`/blog/${slug}`} className="block hover:opacity-80 transition-opacity">
        <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
        <div className='text-sm text-gray-600 mb-3'>{date}</div>
        <div className="text-gray-800 line-clamp-3">
          {createExcerpt(contentHtml)}
        </div>
      </Link>
    </article>
  );
}


export default BlogExcerpt;
