import React from "react"
import _ from "lodash"

import Layout from "gatsby-theme-blog/src/components/layout"
import { graphql, Link } from "gatsby"

export default ({ data, location, pathContext }) => {
  const title = _.capitalize(pathContext.tag)
  const tags = data.allMdxBlogPost.group.filter(t => t.tag == pathContext.tag)
  return (
    <Layout location={location} title={`Posts under ${title}`}>
      {tags.map(p => (
        <div>
          <ul>
            {p.nodes.map(i => (
              <li>
                <h2><Link to={i.slug}>{i.title}</Link></h2>
                <p>{i.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
    query {
        allMdxBlogPost {
            group(field: tags) {
                tag: fieldValue
                totalCount
                nodes {
                    slug
                    tags
                    title
                    excerpt
                }
            }
        }
    }
`