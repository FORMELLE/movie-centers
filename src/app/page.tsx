import Sidebar from '../components/Sidebar';
import Map from '../components/CustomMap';
import "mapbox-gl/dist/mapbox-gl.css";

import { getPostBySlug, getSortedPostsData } from '../lib/posts';

export default async function Home() {
  const allPostsData = getSortedPostsData();
  const firstPostRaw = (allPostsData ?? []).pop()
  const firstPost = firstPostRaw ? await getPostBySlug(firstPostRaw.slug) : null

  return (
    <div className="flex">
      <Sidebar post={firstPost} />
      <Map />
    </div>
  );
}