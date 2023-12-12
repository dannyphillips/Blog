import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Chip } from "@material-ui/core";
import { usePalette } from "react-palette";

import {
  Cover,
  Layout,
  Wrapper,
  SEO,
  Flex,
  PrevNext,
  Banner
} from "../components";
import source from "../assets/source-code.png";
import demo from "../assets/demo.png";

const Title = styled.h1`
  margin-bottom: 1rem;
  margin-top: 0px;
`;

const Details = styled.div`
  margin: 20px;
`;

const Heading = styled(Flex)`
  border-bottom: 2px solid lightgray;
`;
const Row = styled(Flex)`
  width: 100%;
`;

const TagContainer = styled.div`
  margin: 20px 0px;
`;

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  border-radius: 1rem;
  padding: 3rem 6rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -10rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
`;
const Icon = styled.img`
  width: 40px;
`;

const Logo = styled.img`
  height: 140px;
`;

const Project = ({
  pageContext: { slug, prev, next },
  data: { mdx: projectNode, file: publicURL }
}) => {
  const project = projectNode.frontmatter;
  const draft_mode =
    projectNode.fields && !projectNode.fields.releasedNotForced;
  const imageUrl = publicURL.publicURL
  const { data } = usePalette(imageUrl)
  return (
    <Layout customSEO>
      {draft_mode && <Banner />}
      <Cover condensed color={data.muted} />
      <Wrapper>
        <SEO postPath={slug} postNode={projectNode} article />
        <Content>
          <Heading justify="space-between">
            <Flex justify="flex-start">
              <Logo src={publicURL.publicURL} alt="logo" />
              <Details>
                <Title>{project.title}</Title>
                <div>{project.slogan}</div>
              </Details>
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code: <Icon src={source} alt="source" />
                </a>
              </Flex>
              <Flex justify="space-between">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo: <Icon src={demo} alt="demo" />
                </a>
              </Flex>
            </Flex>
            <Row justify="space-between">
              <TagContainer>
                Tech:{" "}
                {project.techs.map(tech => (
                  <Link to={`/techs/${tech}`} key={tech}>
                    <Chip label={tech} />
                  </Link>
                ))}
              </TagContainer>
              <TagContainer>
                Tags:{" "}
                {project.tags.map(tag => (
                  <Link to={`/tags/${tag}`} key={tag}>
                    <Chip label={tag} />
                  </Link>
                ))}
              </TagContainer>
            </Row>
          </Heading>
          <MDXRenderer>
            {projectNode.body}
          </MDXRenderer>
          <PrevNext prefix={`/projects`} prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    dir: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
};

Project.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null
  })
};

export const projectQuery = graphql`
  query projectBySlug($slug: String!, $dir: String!) {
    file(relativeDirectory: { eq: $dir }, name: { in: "logo" }) {
      publicURL
    }
    mdx(
      fields: { slug: { eq: $slug } }
      fileAbsolutePath: { regex: "/projects/" }
    ) {
      body
      fields {
        released
        releasedNotForced
      }
      frontmatter {
        title
        slogan
        date(formatString: "MM/DD/YYYY")
        source
        demo
        techs
        tags
      }
      parent {
        ... on File {
          mtime
          birthTime
        }
      }
    }
  }
`;
