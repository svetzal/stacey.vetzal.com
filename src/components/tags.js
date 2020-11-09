import React from "react"
import _ from "lodash"

import Layout from "gatsby-theme-blog/src/components/layout"
import { graphql, Link } from "gatsby"
import Footer from "../gatsby-theme-blog/components/home-footer"

export default ({
                  data: {
                    posts: {
                      group,
                    },
                    site: {
                      siteMetadata: {
                        title,
                        social,
                      },
                    },
                  },
                  pathContext,
                  ...props
                }) => {
  const tagName = _.capitalize(pathContext.tag)
  const tags = group.filter(t => t.tag === pathContext.tag)
  return (
    <Layout location={props.location} title={`${title}: ${tagName}`}>
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
      <Footer socialLinks={social}/>
    </Layout>
  )
}

export const pageQuery = graphql`
    query {
        posts: allMdxBlogPost {
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
        site {
            siteMetadata {
                title
                social {
                    name
                    url
                }
            }
        }
    }
`