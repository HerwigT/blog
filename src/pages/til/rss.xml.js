import rss from '@astrojs/rss';
import { excerpt, getTils, siteName } from '../../data/site';

const tils = getTils(import.meta.glob('./*.md', { eager: true }));

export async function GET(context) {
	const feedUrl = new URL('/til/rss.xml', context.site).href;
	const items = await Promise.all(
		tils.map(async (til) => ({
			title: til.frontmatter.title,
			description: excerpt(til.rawContent(), 160),
			pubDate: new Date(til.frontmatter.pubDate),
			link: til.url,
			categories: til.frontmatter.tags,
			content: await til.compiledContent(),
		})),
	);

	return rss({
		title: `${siteName} — TIL`,
		description: "Small things I've learned along the way.",
		site: context.site,
		stylesheet: '/rss/styles.xsl',
		xmlns: { atom: 'http://www.w3.org/2005/Atom' },
		items,
		customData: `<language>en</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
	});
}
