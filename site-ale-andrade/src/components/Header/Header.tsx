import { HeaderContainer, Banner, MenuHeader, Nav } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
      <Banner>
        <MenuHeader>
          <h1>Alessandro Andrade</h1>
          <Nav>
            <a href="#galeria">GALERIA</a>
            <a href="#sobre">SOBRE</a>
            <a href="#contato">CONTATO</a>
          </Nav>
        </MenuHeader>
      </Banner>
    </HeaderContainer>
  )
}

export default Header
