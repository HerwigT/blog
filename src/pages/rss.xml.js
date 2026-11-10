import rss from '@astrojs/rss';

const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));

export function GET(context) {
	const items = posts
		.map((post) => ({
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			pubDate: new Date(post.frontmatter.pubDate),
			link: post.url,
			categories: post.frontmatter.tags,
		}))
		.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: 'Herwig Teufer',
		description:
			'Personal site and blog of Herwig Teufer, a data engineer in Vienna. Notes on software, data, and working with computers.',
		site: context.site,
		items,
		customData: '<language>en</language>',
	});
}
