import { useState, useEffect, useCallback } from 'react';

export function useInfiniteScroll(items, itemsPerPage = 10) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMore = useCallback(() => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const newItems = items.slice(start, end);
    
    if (newItems.length > 0) {
      setDisplayedItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    }
    
    if (end >= items.length) {
      setHasMore(false);
    }
  }, [items, itemsPerPage, page]);

  useEffect(() => {
    loadMore();
  }, []);

  return { displayedItems, hasMore, loadMore };
} 