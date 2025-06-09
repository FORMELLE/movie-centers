import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import Link from 'next/link';

type Params = {
  slug: string;
};

type BlogPageProps = {
  params: Promise<Params>;
};

export async function generateStaticParams() {
  // Replace this with your actual data fetching logic
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug: slug.params.slug }));
}

export default async function BlogPage(props: BlogPageProps) {
  const { params } = props;
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontMatter, contentHtml } = post;

  return (
    <main className="container mx-auto p-5 text-[#f2cb07] bg-black min-h-screen">
      <Link
        href="/blog"
        className="mb-3 inline-block underline text-[#f2cb07] hover:text-yellow-400"
      >
        Back to blog
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
        <time className="text-sm text-[#f2cb07]">{frontMatter.date}</time>
        <hr className="my-4 border-[#f2cb07]/40" />

        <div
          className="mt-4 markdown"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
