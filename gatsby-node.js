const path = require('path')
const slugify = require('slugify')

function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

function createSlug(text) {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement
    remove: /[*+~.()'"!:@?]/g, // regex to remove characters
    lower: true, // result in lower case
  })
}

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const getSanityPost = makeRequest(
    graphql,
    `query {
       allSanityPost {
          edges {
            node {
              id
              publishedAt
              slug {
                current
              }
              title
            }
          }
        }
    }
 `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allSanityPost.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.slug.current,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.node.id,
          slug: post.node.slug.current,
          previous,
          next,
        },
      })
    })
  })

  const getSanityNews = makeRequest(
    graphql,
    `query {
      allSanityNews {
          edges {
            node {
              id
              publishedAt
              slug {
                current
              }
              title
            }
          }
        }
    }
 `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allSanityNews.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.slug.current,
        component: path.resolve(`./src/templates/news-post.js`),
        context: {
          id: post.node.id,
          slug: post.node.slug.current,
          previous,
          next,
        },
      })
    })
  })

  return Promise.all([getSanityPost, getSanityNews])
}
