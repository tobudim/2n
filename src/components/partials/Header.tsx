import React, { FunctionComponent, ReactElement } from 'react';
import style from 'styled-components';
import { Trans } from 'react-i18next';

const HeaderWrapper = style.header`
  padding: 10px 5vw 20px 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
    background: linear-gradient(37deg, #31419d, #296cb9, #399438);
    background-size: 600% 600%;

    -webkit-animation: AnimationName 46s ease infinite;
    -moz-animation: AnimationName 46s ease infinite;
    animation: AnimationName 46s ease infinite;

  @-webkit-keyframes AnimationName {
      0%{background-position:0% 10%}
      50%{background-position:100% 91%}
      100%{background-position:0% 10%}
  }
  @-moz-keyframes AnimationName {
      0%{background-position:0% 10%}
      50%{background-position:100% 91%}
      100%{background-position:0% 10%}
  }
  @keyframes AnimationName {
      0%{background-position:0% 10%}
      50%{background-position:100% 91%}
      100%{background-position:0% 10%}
  }

  @media all and (min-width: 768px) {
    flex-direction: row;
    padding: 10px 5vw;
  }
`;
const Logo = style.div`
  flex-basis: 7%;
  margin: 10px auto;
  img {
    width: 50px;
  }

  @media all and (min-width: 768px) {
    margin: 0;
  }
`;
const Nav = style.nav`
  flex-basis: 50%;

  @media all and (min-width: 576px) {
    flex-basis: 50%;
  }
  @media all and (min-width: 992px) {
    flex-basis: 40%;
  }
  @media all and (min-width: 1200px) {
    flex-basis: 30%;
  }
`;
const List = style.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media all and (min-width: 768px) {
    flex-direction: row;
  }
`;
const ListElt = style.li`
  margin-bottom: 10px;
  a {
    color: white;
    text-transform: uppercase;
    font-weight: 400;
  }

  @media all and (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Header: FunctionComponent = (): ReactElement => {
  return (
    <HeaderWrapper>
      <Logo>
        <a href="/" className="img-link">
          <img src="/favicons/android-chrome-512x512.png" alt="logo" />
        </a>
      </Logo>
      <Nav>
        <List>
          <ListElt>
            <a href="/">
              <Trans i18nKey="Header.home">Home</Trans>
            </a>
          </ListElt>
          <ListElt>
            <a href="/more">
              <Trans i18nKey="Header.more">More</Trans>
            </a>
          </ListElt>
          <ListElt>
            <a href="/settings">
              <Trans i18nKey="Header.settings">Settings</Trans>{' '}
              <span role="img" aria-label="settings-and-language" />
              🌐
            </a>
          </ListElt>
        </List>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
