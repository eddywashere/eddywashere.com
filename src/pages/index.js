import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import Helmet from 'react-helmet';
import selfie from '../images/me.jpg';
import formatDate from 'date-fns/format';
import Wrapper from '../components/Wrapper';
import Container from '../components/Container';

const createTags = tags => {
  if (!tags) {
    return [];
  } else if (isArray(tags)) {
    return tags;
  }

  return tags.split(',').map(tag => tag.trim());
};

const css = {
  selfie: {
    borderRadius: '100%',
    display: 'inline-block',
    width: '6rem',
    '@media(min-width: 800px)': {
      width: '7rem',
    }
  },
  title: {
    fontSize: '2.14rem',
    margin: '0',
    fontWeight: '300',
    color: '#555'
  },
  subtitle: {
    fontSize: '1.1rem',
    margin: '-0.35rem 0 0 0',
  },
  leading: {
    fontSize: '1.1rem'
  },
  button: {
    color: '#fff',
    border: '1px solid #E32B46',
    padding: '.5rem 1rem',
    display: 'inline-block',
    borderRadius: '2px',
    fontSize: '1rem',
    backgroundColor: '#E32B46',
    marginTop: '1rem',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#E32B46',
      textDecoration: 'none',
    }
  },
  buttonOutline: {
    border: '1px solid #E32B46',
    padding: '.5rem 1rem',
    display: 'inline-block',
    borderRadius: '2px',
    fontSize: '1rem',
    textDecoration: 'none',
    color: '#E32B46',
    backgroundColor: 'transparent',
    ':hover': {
      textDecoration: 'none',
      backgroundColor: '#E32B46',
      color: '#fff'
    }
  },
  posts: {
    margin: '2rem 0 0 0'
  },
  post: {
    margin: '0 0 3rem 0'
  },
  postDate: {
    color: '#999',
    fontWeight: '600',
    fontSize: '.77519rem',
    margin: '0'
  },
  postTitle: {
    margin: '0 0 .5rem 0',
    color: '#E32B46',
    fontWeight: '400',
    fontSize: '1.6rem'
  },
  postExcerpt: {
    color: '#666',
    lineHeight: '1.5rem',
    margin: '0 0 .5rem 0',
  }
};

class BlogIndex extends React.Component {

  renderPosts = () => {
    const articles = [];
    const posts = get(this, 'props.data.allMarkdownRemark.edges', []);
    posts.forEach(post => {
      const title = get(post, 'node.frontmatter.title', 'missing title');
      const tags = createTags(get(post, 'node.frontmatter.tags'));
      const date = formatDate(get(post, 'node.frontmatter.date'), 'MMMM D, YYYY');
      articles.push(
        <article css={css.post} key={post.node.fields.slug}>
          <Link to={post.node.fields.slug}>
            <date css={css.postDate}>{date}</date>
            <h4 css={css.postTitle}>{post.node.frontmatter.title}</h4>
            <p css={css.postExcerpt}>{post.node.excerpt}</p>
          </Link>
        </article>
      );
    });

    return articles;
  }
  render() {
    const posts = this.renderPosts();

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <Wrapper tag="header">
          <Container size="large">
            <p>
              <img css={css.selfie} src={selfie} title="Eddy Hernandez" />
            </p>
            <h1 css={css.title}>Eddy Hernandez</h1>
            <p css={css.subtitle}>UI Engineer / San Francisco, CA</p>
            <p css={css.leading}>I craft &amp; code interfaces for highly technical products used by companies all over the world.</p>
            <Link css={css.button} to={'/projects/'}>View Projects</Link>
          </Container>
        </Wrapper>
        <Wrapper tag="main">
          <Container size="small">
            <h3 css={css.title}>Recent Posts</h3>
            <section css={css.posts}>
              {posts}
            </section>
            <p css={{textAlign: 'right'}}>
              <Link css={css.buttonOutline} to={'/blog/'}>View All Posts</Link>
            </p>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object
};

export default BlogIndex;

export const pageQuery = graphql`
query RecentPosts {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    limit: 3,
    sort: { order: DESC, fields: [frontmatter___date] },
    filter: {
      frontmatter: { draft: { ne: true } },
      fields: { collection: { eq: "posts" }}
    }
  ) {
    edges {
      node {
        excerpt(pruneLength: 168),
        fields {
          slug
        }
        frontmatter {
          title,
          tags,
          date
        }
      }
    }
  }
}
`;
