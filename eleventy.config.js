export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("email.png");
  eleventyConfig.addFilter("post_date", (dateObj) => {
    return `${dateObj.toLocaleString("default", {
      dateStyle: "medium",
    })}`;
  });
  eleventyConfig.addFilter("exclude", (collection, stringToFilter) => {
    if (!stringToFilter) {
      return collection;
    }
    return (collection ?? []).filter((item) => item !== stringToFilter);
  });
}
