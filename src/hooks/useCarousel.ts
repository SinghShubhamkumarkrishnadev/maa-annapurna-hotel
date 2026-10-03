import { useState, useRef, useEffect, useCallback } from "react";

interface UseCarouselOptions {
  cardWidthDefault?: number;
  cardWidthMobile?: number;
}

export function useCarousel(dependencies: unknown[] = [], options: UseCarouselOptions = {}) {
  const { cardWidthDefault = 370, cardWidthMobile = 300 } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScrollPosition = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition, { passive: true });
    }
    window.addEventListener("resize", checkScrollPosition);
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkScrollPosition, ...dependencies]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (!scrollRef.current) return;
      const cardWidth = scrollRef.current.clientWidth < 640 ? cardWidthMobile : cardWidthDefault;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    },
    [cardWidthDefault, cardWidthMobile]
  );

  const scrollToStart = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.4;
      scrollRef.current.scrollLeft = scrollLeftState - walk;
    },
    [isDragging, startX, scrollLeftState]
  );

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    isDragging,
    scroll,
    scrollToStart,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
}
