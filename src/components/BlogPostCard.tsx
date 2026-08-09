import type { FunctionalComponent } from 'preact';
import './BlogPostCard.css';

interface BlogPostCardProps {
  title: string;
  date: Date;
  slug: string;
  excerpt?: string;
}

const BlogPostCard: FunctionalComponent<BlogPostCardProps> = ({
  title,
  date,
  slug,
  excerpt
}) => {
  const hash = slug.substring(0, 7);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);

  return (
    <article class="blog-post-card">
      <a href={`/posts/${slug}`} class="post-link">
        <div class="commit-header">
          <span class="commit-label">commit</span>{' '}
          <span class="commit-hash">{hash}</span>
        </div>
        <div class="commit-meta">
          Author: Miguel Palau &lt;hola@mpz.im&gt;
        </div>
        <div class="commit-meta">
          Date:{'   '}{formattedDate}
        </div>
        <div class="commit-message">
          {'    '}{title}
        </div>
        {excerpt && (
          <div class="commit-body">
            {'    '}{excerpt}
          </div>
        )}
      </a>
    </article>
  );
};

export default BlogPostCard;
