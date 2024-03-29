/** @jsx jsx */
import { StaticQuery, Link, graphql } from "gatsby"
import { jsx, css, Themed } from "theme-ui"
import Bio from "gatsby-theme-blog/src/components/bio"
import _ from "lodash"
import theme from "../gatsby-plugin-theme-ui/index"

const rootPath = `${__PATH_PREFIX__}/`

const Title = ({ children, location }) => {
  if (location.pathname === rootPath) {
    return (
      <Themed.h1
        css={css({
          my: 0,
          fontSize: 4
        })}
      >
        <Themed.a
          as={Link}
          css={css({
            color: `inherit`,
            boxShadow: `none`,
            textDecoration: `none`
          })}
          to={`/`}
        >
          {children}
        </Themed.a>
      </Themed.h1>
    )
  } else {
    return (
      <Themed.h3
        as="p"
        css={css({
          my: 0
        })}
      >
        <Themed.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            color: `primary`
          })}
          to={`/`}
        >
          {children}
        </Themed.a>
      </Themed.h3>
    )
  }
}

const Header = ({ children, title, ...props }) => (
  <header>
    <div
      css={css({
        maxWidth: `672px`,
        mx: `auto`,
        px: 3,
        pt: 4
      })}
    >
      <div
        css={css({
          maxWidth: ``,
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          mb: 4
        })}
      >
        <Title {...props}>{title}</Title>
        {children}
      </div>
      {props.location.pathname === rootPath && <Bio/>}
      <div css={css({
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
      })}>
        <StaticQuery query={graphql`
            query {
                tags: allMdxBlogPost(limit: 1000) {
                    group(field: tags) {
                        fieldValue
                    }
                }
            }
        `}
                     render={data => data.tags.group.map(t => (
                       <div css={css({
                         backgroundColor: theme.colors.primary,
                         margin: "4pt",
                         padding: "1pt 6pt",
                         borderRadius: "4pt",
                         boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                       })}>
                         <Link css={css({
                           "text-decoration": "none",
                           "color": "#fff",
                         })} to={`/tags/${t.fieldValue}/`}>
                           {_.capitalize(t.fieldValue)}
                         </Link>
                       </div>
                     ))}
        />
      </div>
    </div>
  </header>
)

export default Header
