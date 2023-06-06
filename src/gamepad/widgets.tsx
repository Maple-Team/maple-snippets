import Color from 'color'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const card = Color('white').hex()
const textColor = Color('black').hex()

export const colors = {
  bg: 'hsl(210,50%,95%)',
  navBg: '#162737',
  navText: '#9faec4',
  controllerArtLight: 'hsl(210,50%,85%)',
  gamepadMiniBg: 'hsl(210,50%,98%)',
  gamepadMiniBorder: 'hsl(210,50%,95%)',
  codeBg: 'hsl(210,50%,20%)',
  buttonText: 'hsla(210,90%,20%,1.0)',
  buttonBarBg: 'hsla(210,90%,20%,0.1)',
  buttonAxes: 'hsla(210,90%,20%,0.5)',
  joystickAxes: 'hsla(210,90%,20%,0.2)',
  joystickIndicator: 'hsl(210,90%,20%)',
  codeText: 'white',
  headerBg: 'hsl(210, 86%, 8%)',
  textColor,
  card,
  cardAlt: Color(card).mix(Color(textColor), -0.2).hex(),
  strong: textColor,
  link: '#8190ff',
  accent: '#1fe882',
}

document.body.style.background = colors.bg

const width = 1000

export const mobile = '@media (max-width: 800px)'

const sharedLargeSection = css`
  max-width: ${width}px;
  margin: 0 auto;
`

export const AppBaseStyles = styled.div`
  color: ${colors.textColor};

  font-size: 16px;

  h1 {
    font-size: 300%;
  }
  h2 {
    font-size: 200%;
  }
  ${mobile} {
    h1 {
      font-size: 200%;
    }
    h2 {
      font-size: 150%;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7 {
    color: ${colors.strong};
  }

  ul,
  li {
    list-style: none;
  }

  a {
    color: ${colors.link};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const HeaderWrap = styled.div`
  background: ${colors.headerBg};
`

export const Header = styled.div`
  ${sharedLargeSection};
  color: ${colors.strong};
  line-height: 1;

  h1 {
    font-weight: normal;
  }

  padding: 60px 0 20px 0;
  ${mobile} {
    padding: 20px 15px 0px 15px;
  }
`

export const FooterAdWrap = styled.div`
  ${sharedLargeSection};
  padding: 20px 0 0 0;
`

export const Main = styled.div`
  ${sharedLargeSection};

  padding: 20px 0 0 0;
  min-height: 700px;
`

export const NavWrap = styled.div`
  background: ${colors.navBg};
`

export const Nav = styled.div`
  ${sharedLargeSection};

  color: ${colors.navText};

  ${mobile} {
    padding: 15px 15px;
  }

  a {
    color: ${colors.navText};
    display: inline-block;
    padding: 10px 0px 6px 0px;
    font-size: 18px;
    text-decoration: none;
    margin-right: 20px;

    ${mobile} {
      padding: 0;
    }

    &.current,
    &:hover {
      border-bottom: 4px solid white;
      ${mobile} {
        border-bottom: none;
      }
      color: white;
    }
  }
`

export const Footer = styled.div`
  ${sharedLargeSection};

  opacity: 0.5;

  text-align: right;
  padding: 20px 0px 150px;

  ${mobile} {
    padding: 20px 15px 150px;
  }
`

export const Row = styled.div`
  display: flex;
  margin-bottom: 20px;

  & > *:not(:last-child) {
    margin: 0 20px 0 0;
  }

  ${mobile} {
    display: block;

    & > *:not(:last-child) {
      margin: 0 0 20px 0;
    }
  }
`

export const Card = styled.div`
  background: ${colors.card};
  flex: 1;
  padding: 30px;
  border-radius: 5px;
  ${mobile} {
    padding: 15px;
    border-radius: 0;
  }
  box-shadow: 0px 2px 5px hsla(210, 86%, 10%, 0.1);
`

export const AdCard = styled.div`
  background: ${colors.card};
  flex: 1;
  padding: 15px;
  border-radius: 5px;
  ${mobile} {
    padding: 15px;
    border-radius: 0;
  }
  box-shadow: 0px 2px 5px hsla(210, 86%, 10%, 0.1);
`

export const Article = styled.div`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7 {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`

export const ControllersList = styled.div`
  table {
    width: 100%;
    margin-top: 15px;

    th,
    td {
      padding: 3px;
    }

    th {
      text-align: left;
    }
  }
`
