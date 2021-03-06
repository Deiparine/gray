import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import ScrollAnimation from 'react-animate-on-scroll'
import 'animate.css/animate.min.css'
import HeroParticles from '../components/particles'
import marked from 'marked'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = 'Enterprise Penetration Testing & Cyber Security Blog'
    const posts = data.allSanityPost.edges

    console.log(this.props)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div className="page-headline">
          <HeroParticles />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <ScrollAnimation animateIn="fadeInDown" duration="2">
                  <h1 className="font-weight-bold">Blog</h1>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" delay="1000">
                  <h5 className="pt-3 font-weight-lighter text-white">
                    All Posts
                  </h5>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content pb-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <div className="blog-wrap">
                  {posts.map(({ node }) => {
                    const title = node.title
                    // const serializers = {
                    //   types: {
                    //     authorReference: ({ node }) => (
                    //       <span>
                    //         {node.author.firstname} {node.author.lastname}
                    //       </span>
                    //     ),
                    //   },
                    // }
                    return (
                      <ScrollAnimation animateIn="fadeIn" className="h-100">
                        <div
                          className="row flex-grow-1"
                          style={{ paddingBottom: '100px' }}
                        >
                          <div className="col-lg-12 order-2 order-lg-1 pr-lg-0">
                            <div className="blog post-item h-100">
                              <Link
                                className="m-0 post-link"
                                to={node.slug.current}
                                title="slug"
                              >
                                <h4 className="m-0">{title}</h4>
                              </Link>

                              <span className="small text-uppercase text-muted">
                                <i className="fa fa-user pr-1" />
                                {node.author.name}&nbsp;&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-calendar-o pr-1" />
                                {node.publishedAt}
                              </span>
                              <div className="truncate-9 text-muted">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: marked(node.excerpt),
                                  }}
                                />
                              </div>
                              <Link
                                className="btn btn-primary btn-sm mt-4"
                                role="button"
                                to={node.slug.current}
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                          {/*
                      <div className="col-lg-7 order-1 order-lg-2 pl-lg-0">
                        <div
                          className="blog-post-img h-100"
                          style={{
                            backgroundImage: `url('${
                              node.mainImage.asset.fluid.src
                            }')`,
                          }}
                        />
                      </div>
                    */}
                        </div>
                      </ScrollAnimation>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSanityPost(
      filter: { status: { eq: "published" } }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          publishedAt(formatString: "MMMM DD, YYYY")
          excerpt
          author {
            name
          }
          slug {
            current
          }
          mainImage {
            asset {
              id
              url
              originalFilename
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
`
