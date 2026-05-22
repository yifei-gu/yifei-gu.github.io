import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  images: GalleryImage[];
  title?: string;
}

export default function SoftwareGallery({ images, title = 'Gallery' }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, close, prev, next]);

  if (images.length === 0) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-deep-800 dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-ocean-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-4/3 rounded-lg overflow-hidden glass border border-ocean-500/10 hover:border-ocean-500/40 transition-all focus-visible:outline-2 focus-visible:outline-ocean-500"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-deep-900/0 group-hover:bg-deep-900/20 transition-colors flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
            {img.caption && (
              <p className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs text-white bg-linear-to-t from-deep-900/80 to-transparent truncate">
                {img.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-950/90 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute -top-12 right-0 text-deep-300 hover:text-white transition-colors p-2"
                aria-label="Close gallery"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 p-2 text-deep-300 hover:text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 p-2 text-deep-300 hover:text-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <img
                src={active.src}
                alt={active.alt}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              {(active.caption || active.alt) && (
                <p className="mt-3 text-center text-sm text-deep-300">
                  {active.caption || active.alt}
                </p>
              )}
              {images.length > 1 && (
                <p className="mt-1 text-center text-xs font-mono text-deep-500">
                  {activeIndex + 1} / {images.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
