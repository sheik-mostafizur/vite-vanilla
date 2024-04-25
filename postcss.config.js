import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    purgecss({
      content: ["./src/**/*.html", "./src/**/*.js"],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
  ],
};
