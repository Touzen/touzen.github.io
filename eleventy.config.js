import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import footnote_plugin from 'markdown-it-footnote';

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight, {
		  alwaysWrapLineHighlights: true,
	});

	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote_plugin));

	eleventyConfig.addPassthroughCopy("images");

	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("404.html");

	eleventyConfig.addFilter("smartquotes", (post) => {
		const openDoubles = new RegExp(/(?<=<(h|l|p[^r]).*)(?<=\s|>)&quot;/g);
		const closeDoubles = new RegExp(/(?<=<(h|l|p[^r]).*“.*)&quot;(?=(\s|\p{P}|<))/gu);
		return post
			.replace(openDoubles, "“").replace(closeDoubles, "”");
});
};
