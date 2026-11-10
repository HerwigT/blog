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
		ogImage?: string;
	};
};

export function getPosts(modules: Record<string, unknown>): MarkdownPost[] {
	return (Object.values(modules) as MarkdownPost[]).sort(byDate);
}

export type TilModule = {
	url: string;
	Content: unknown;
	rawContent: () => string;
	compiledContent: () => Promise<string>;
	frontmatter: {
		title: string;
		pubDate: string | Date;
		tags?: string[];
	};
};

export function getTils(modules: Record<string, unknown>): TilModule[] {
	return (Object.values(modules) as TilModule[]).sort(byDate);
}

export type TaggedEntry =
	| { kind: 'post'; url: string; frontmatter: MarkdownPost['frontmatter'] }
	| { kind: 'til'; url: string; frontmatter: TilModule['frontmatter'] };

export function taggedEntries(posts: MarkdownPost[], tils: TilModule[]): TaggedEntry[] {
	return [
		...posts.map((post) => ({ kind: 'post' as const, url: post.url, frontmatter: post.frontmatter })),
		...tils.map((til) => ({ kind: 'til' as const, url: til.url, frontmatter: til.frontmatter })),
	].sort(byDate);
}

export function tagsWithCounts(items: { frontmatter: { tags?: string[] } }[]) {
	const counts = new Map<string, number>();
	for (const item of items) {
		for (const tag of item.frontmatter.tags ?? []) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([tag, count]) => ({ tag, count }));
}

function byDate(a: { frontmatter: { pubDate: string | Date } }, b: { frontmatter: { pubDate: string | Date } }) {
	return new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf();
}

export function excerpt(markdown: string, max = 140): string {
	const text = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/[*~>]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
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
