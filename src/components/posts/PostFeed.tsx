import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Fallback from '@/components/Fallback.tsx';
import Loader from '@/components/Loader.tsx';
import PostItem from '@/components/posts/PostItem.tsx';

import { useInfinitePostsDataQuery } from '@/queries/posts/use-infinite-posts-data-query.ts';

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } = useInfinitePostsDataQuery();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) void fetchNextPage();
  }, [inView, fetchNextPage]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) => page.map((post) => <PostItem key={post.id} {...post} />))}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
