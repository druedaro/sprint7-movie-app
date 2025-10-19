import { useEffect, useRef } from 'react';

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean,
  loading: boolean
) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = loaderRef.current;
    if (!currentElement) return;


    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, loading]);

  return loaderRef;
}

