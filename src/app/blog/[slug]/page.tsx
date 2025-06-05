import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import Link from 'next/link';

interface BlogPageProps {
  params: { slug: string };
}


export async function generateStaticParams() {
  // Replace this with your actual data fetching logic
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug: slug.params.slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontMatter, contentHtml } = post;

  return (
    <main className="container mx-auto p-5">
    <Link href="/blog" style={{ color: 'blue'}} className="mb-3 underline">Back to blog</Link>
    <article>
      <h1>{frontMatter.title}</h1>
      <time>{frontMatter.date}</time>
      <hr />

      <div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
    </main>
  );
}
