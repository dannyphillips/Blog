import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import kebabCase from "../utils/kebabCase";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  Banner,
  Cover,
  Layout,
  PrevNext,
  SEO,
  Subline,
  Wrapper,
} from "../components";

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  border-radius: 1rem;
  padding: 2rem 4.5rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -10rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  p {
    font-size: 1.1rem;
    letter-spacing: -0.003em;
    line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    @media (max-width: ${props => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }

  .prism-code {
    padding: 0.75rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    font-size: 16px;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const BlogPostContent = styled.div`
  margin-top: 4rem;
`;

const Blog = ({
  pageContext: { slug, prev, next },
  data: { mdx: blogNode }
}) => {
  const blog = blogNode.frontmatter;
  const draft_mode = blogNode.fields && !blogNode.fields.releasedNotForced;
  return (
    <Layout customSEO>
      {draft_mode && <Banner />}
      <Cover condensed />
      <Wrapper>
        <SEO postPath={slug} postNode={blogNode} article />
        <Content>
          <Title>{blog.title}</Title>
          <Subline>
            {blog.date} &mdash; {blogNode.timeToRead} Min Read &mdash; In{" "}
            {blog.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                {!!i && ", "}
                <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
              </React.Fragment>
            ))}
          </Subline>
          <BlogPostContent>
            <MDXRenderer>{blogNode.body}</MDXRenderer>
          </BlogPostContent>
          <PrevNext prefix={`/blog`} prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
};

Blog.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null
  })
};

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    mdx(
      fields: { slug: { eq: $slug } }
      fileAbsolutePath: { regex: "/blog/" }
    ) {
      body
      fields {
        released
        releasedNotForced
      }
      excerpt
      frontmatter {
        title
        date(formatString: "MM/DD/YYYY")
        tags
      }
      timeToRead
      parent {
        ... on File {
          birthTime
          mtime
        }
      }
    }
  }
`;
