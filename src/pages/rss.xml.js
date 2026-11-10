import rss from '@astrojs/rss';
import { siteDescription, siteName } from '../data/site';

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
		title: siteName,
		description: siteDescription,
		site: context.site,
		stylesheet: '/rss/styles.xsl',
		items,
		customData: '<language>en</language>',
	});
}
