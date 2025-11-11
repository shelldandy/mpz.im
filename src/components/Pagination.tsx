import type { FunctionalComponent } from 'preact';
import type { Page } from 'astro';
import './Pagination.css';

interface PaginationProps {
  page: Page;
}

const Pagination: FunctionalComponent<PaginationProps> = ({ page }) => {
  const { currentPage, lastPage, url } = page;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 || // Always show first page
        i === lastPage || // Always show last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show pages around current
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav class="pagination" aria-label="Pagination">
      <div class="pagination-info">
        Page {currentPage} of {lastPage}
      </div>

      <div class="pagination-controls">
        {url.prev ? (
          <a href={url.prev} class="pagination-link pagination-prev" aria-label="Previous page">
            ← Previous
          </a>
        ) : (
          <span class="pagination-link pagination-prev pagination-disabled" aria-disabled="true">
            ← Previous
          </span>
        )}

        <div class="pagination-numbers">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === '...') {
              return <span key={`ellipsis-${index}`} class="pagination-ellipsis">…</span>;
            }

            const pageNumber = pageNum as number;
            const pageUrl = pageNumber === 1 ? '/posts' : `/posts/${pageNumber}`;
            const isActive = pageNumber === currentPage;

            return (
              <a
                key={pageNumber}
                href={pageUrl}
                class={`pagination-number ${isActive ? 'active' : ''}`}
                aria-label={`Page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </a>
            );
          })}
        </div>

        {url.next ? (
          <a href={url.next} class="pagination-link pagination-next" aria-label="Next page">
            Next →
          </a>
        ) : (
          <span class="pagination-link pagination-next pagination-disabled" aria-disabled="true">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
