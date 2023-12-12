import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import logo from "../../logo.png";
import { Link } from "gatsby";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  background-color: ${props => props.home ? "none" : "black"};
`;

const DesktopNav = styled.div`
  display: none;
  flex-flow: row nowrap;
  align-items: center;
  white-space: nowrap;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    background-color: palette(white);
  }
`;

const MobileNav = styled.div`
  & > button {
    color: #fff;
  }
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavButton = styled.button`
  color: white;
  background: none;
  border: none;
  padding: 20px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > .active {
    border-bottom: 2px solid white;
  }
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Header {...this.props}>
        <Link to="/">
          <LinkContainer>
            <NavButton>
              <img alt="logo" src={logo} height={40} />
            </NavButton>
            <NavButton>Danny Phillips</NavButton>
          </LinkContainer>
        </Link>
        <DesktopNav>
          <LinkContainer>
            {/* <Link to="/about" activeClassName="active">
              <NavButton>About</NavButton>
            </Link> */}
            {/* <Link to="/experience" activeClassName="active">
              <NavButton>Experience</NavButton>
            </Link> */}
            {/* <Link to="/projects" activeClassName="active">
              <NavButton>Projects</NavButton>
            </Link>
            <Link to="/blog" activeClassName="active">
              <NavButton>Blog</NavButton>
            </Link> */}
          </LinkContainer>
        </DesktopNav>
        <MobileNav>
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.toggleDrawer("open", !open)}
            color="primary"
          >
            <Menu fontSize="large" />
          </IconButton>
          <SwipeableDrawer
            anchor="top"
            open={open}
            onClose={this.toggleDrawer("open", false)}
            onOpen={this.toggleDrawer("open", true)}
          >
            <List>
              {/* <a href="/about">
                <ListItem button key={"about"}>
                  <ListItemText primary={"About"} />
                </ListItem>
              </a> */}
              {/* <a href="/experience">
                <ListItem button key={"experience"}>
                  <ListItemText primary={"Experience"} />
                </ListItem>
              </a> */}
              <a href="/projects">
                <ListItem button key={"projects"}>
                  <ListItemText primary={"Projects"} />
                </ListItem>
              </a>
              <a href="/blog">
                <ListItem button key={"blog"}>
                  <ListItemText primary={"Blog"} />
                </ListItem>
              </a>
            </List>
          </SwipeableDrawer>
        </MobileNav>
      </Header>
    );
  }
}

export default Navigation;
