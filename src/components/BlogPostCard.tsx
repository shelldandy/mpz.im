import type { FunctionalComponent } from 'preact';
import './BlogPostCard.css';

interface BlogPostCardProps {
  title: string;
  date: Date;
  slug: string;
}

const BlogPostCard: FunctionalComponent<BlogPostCardProps> = ({
  title,
  date,
  slug,
}) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);

  return (
    <article class="blog-post-card">
      <a href={`/posts/${slug}`} class="post-link">
        <span class="post-title">{title}</span>
        <time class="post-date" datetime={date.toISOString()}>
          {formattedDate}
        </time>
      </a>
    </article>
  );
};

export default BlogPostCard;
