import type { APIRoute } from 'astro';
import { getPosts, type MarkdownPost } from '../../data/site';
import { postSlug, renderOgImage } from '../../lib/og-image';

export function getStaticPaths() {
	const posts = getPosts(import.meta.glob('../posts/*.md', { eager: true }));

	return posts.map((post) => ({
		params: { slug: postSlug(post.url) },
		props: { post },
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage((props as { post: MarkdownPost }).post);

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
};
