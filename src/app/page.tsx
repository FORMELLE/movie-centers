import Sidebar from '../components/Sidebar';
import Map from '../components/CustomMap';
import "mapbox-gl/dist/mapbox-gl.css";

import { getPostBySlug, getSortedPostsData } from '../lib/posts';

export default async function Home() {
  const allPostsData = getSortedPostsData();
  const firstPost = await getPostBySlug(allPostsData.pop().slug)

  return (
    <div className="flex">
      <Sidebar post={firstPost} />
      <Map />
    </div>
  );
}