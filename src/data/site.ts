export const siteName = 'Herwig Teufer';

export const siteDescription =
	'Personal site and blog of Herwig Teufer, a data engineer in Vienna. Notes on software, data, and working with computers.';

export type MarkdownPost = {
	url: string;
	frontmatter: {
		title: string;
		description: string;
		pubDate: string | Date;
		author?: string;
		tags?: string[];
	};
};

export function getPosts(modules: Record<string, unknown>): MarkdownPost[] {
	return (Object.values(modules) as MarkdownPost[]).sort(
		(a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf(),
	);
}

export function isoDate(input: string | Date): string {
	const date = input instanceof Date ? input : new Date(input);
	return date.toISOString().slice(0, 10);
}

export function formatDate(input: string | Date): string {
	const date = input instanceof Date ? input : new Date(input);
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}
