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
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);

  return (
    <article class="blog-post-card">
      <a href={`/posts/${slug}`} class="post-link">
        <h2 class="post-title">{title}</h2>
        <time class="post-date" datetime={date.toISOString()}>
          {formattedDate}
        </time>
        {excerpt && <p class="post-excerpt">{excerpt}</p>}
      </a>
    </article>
  );
};

export default BlogPostCard;
