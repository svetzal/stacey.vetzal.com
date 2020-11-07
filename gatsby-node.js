const path = require('path');
const _ = require('lodash');

exports.createPages = async ({actions, graphql, reporter }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/components/tags.js")

  const result = await graphql(`
    {
      tags: allMdxBlogPost(limit: 1000) {
        group(field: tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error running graphql query.')
    return
  }

  const tags = result.data.tags.group;

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}`,
      component: tagTemplate,
      context: { tag: tag.fieldValue },
    });
  });

}