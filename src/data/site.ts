export const siteName = 'Herwig Teufer';

export const siteDescription =
	'Personal site and blog of Herwig Teufer, a data engineer in Vienna. Notes on software, data, and working with computers.';

export type MarkdownPost = {
	url: string;
	rawContent?: () => string;
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

function plainMarkdown(markdown: string): string {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
		.replace(/[*~>]/g, '');
}

function repeats(paragraph: string, skip: string): boolean {
	const left = paragraph.replace(/\s+/g, ' ').trim().toLowerCase();
	const right = skip.replace(/\s+/g, ' ').trim().toLowerCase();
	if (!left || !right) return false;
	if (left === right) return true;
	return left.length >= 40 && (right.includes(left) || left.includes(right));
}

export function excerpt(markdown: string, max?: number): string;
export function excerpt(
	markdown: string,
	options: { words?: number; paragraphs?: number; skip?: string },
): string;
export function excerpt(
	markdown: string,
	maxOrOptions: number | { words?: number; paragraphs?: number; skip?: string } = 140,
): string {
	if (typeof maxOrOptions === 'number') {
		const text = plainMarkdown(markdown)
			.replace(/^#{1,6}\s+/gm, '')
			.replace(/\s+/g, ' ')
			.trim();
		if (text.length <= maxOrOptions) return text;
		const cut = text.slice(0, maxOrOptions);
		const lastSpace = cut.lastIndexOf(' ');
		return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
	}

	const wordLimit = maxOrOptions.words ?? 110;
	const paragraphLimit = maxOrOptions.paragraphs ?? 3;
	const blocks = plainMarkdown(markdown)
		.replace(/^#{1,6}\s+.*$/gm, '')
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
		.filter((paragraph) => paragraph && !repeats(paragraph, maxOrOptions.skip ?? ''));

	const chosen: string[] = [];
	let count = 0;
	for (const block of blocks) {
		if (chosen.length >= paragraphLimit) break;
		const blockWords = block.split(/\s+/);
		const room = wordLimit - count;
		if (blockWords.length <= room || chosen.length === 0) {
			const take = blockWords.length <= wordLimit ? blockWords : blockWords.slice(0, wordLimit);
			chosen.push(take.length < blockWords.length ? `${take.join(' ')}…` : block);
			count += take.length;
			if (take.length < blockWords.length) break;
			continue;
		}
		if (room >= 12) chosen.push(`${blockWords.slice(0, room).join(' ')}…`);
		break;
	}
	return chosen.join('\n\n');
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
