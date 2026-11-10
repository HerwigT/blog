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
					body { margin: 2rem auto; max-width: 40rem; padding: 0 1rem; color: #1a1a1a; background: #fff; font-family: system-ui, sans-serif; line-height: 1.5; }
					h1 { font-size: 1.5rem; }
					.note { margin: 1rem 0; padding: 0.75rem 1rem; background: #f4f4f5; }
					.url { font-family: ui-monospace, monospace; word-break: break-all; }
					article { padding: 1rem 0; border-top: 1px solid #e4e4e7; }
					h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
					a { color: #1d4ed8; }
					time { color: #52525b; font-size: 0.9rem; }
				</style>
			</head>
			<body>
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
