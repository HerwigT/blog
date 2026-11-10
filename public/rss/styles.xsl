<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="UTF-8"/>
	<xsl:template match="/">
		<html lang="en">
			<head>
				<meta charset="utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<title><xsl:value-of select="rss/channel/title"/> — RSS</title>
				<style>
					body { margin: 0 auto; max-width: 42rem; padding: 2.5rem 1.25rem 3rem; background: #f3efe4; color: #1b1714; font-family: Georgia, "Liberation Serif", serif; line-height: 1.55; }
					.kicker { margin: 0; color: #7c1e1e; font-size: 0.75rem; letter-spacing: 0.16em; text-align: center; text-transform: uppercase; }
					h1 { margin: 0.4rem 0 0; padding: 0.55rem 0 0.45rem; border-top: 3px solid currentColor; border-bottom: 1px solid currentColor; font-size: 2.6rem; font-weight: 500; letter-spacing: -0.03em; line-height: 1; text-align: center; }
					.note { margin: 1.25rem 0 0.5rem; font-style: italic; }
					.url { margin: 0 0 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid currentColor; font-family: ui-monospace, monospace; font-size: 0.9rem; word-break: break-all; }
					article { padding: 1rem 0; border-bottom: 1px solid currentColor; }
					h2 { margin: 0 0 0.35rem; font-size: 1.45rem; font-weight: 500; letter-spacing: -0.02em; line-height: 1.15; }
					a { color: inherit; }
					time { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
					@media (prefers-color-scheme: dark) {
						body { background: #161310; color: #efe8dc; }
						.kicker { color: #e7b1a4; }
					}
				</style>
			</head>
			<body>
				<p class="kicker">RSS</p>
				<h1><xsl:value-of select="rss/channel/title"/></h1>
				<p class="note">This is an RSS feed. Copy the URL into your reader.</p>
				<p class="url"><xsl:value-of select="concat(rss/channel/link, 'rss.xml')"/></p>
				<xsl:for-each select="rss/channel/item">
					<article>
						<h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
						<p><time><xsl:value-of select="pubDate"/></time></p>
					</article>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
