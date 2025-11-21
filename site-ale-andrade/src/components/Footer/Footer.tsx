import { FooterContainer, Paragraph, Info, Nav } from './styles'
import Instagram from '../../assets/icons/instagram.png'
import WhatsApp from '../../assets/icons/whatsapp.png'

const Footer = () => {
  return (
    <FooterContainer id="contato">
      <Paragraph>
        Vamos clicar e gravar juntos?
        <br />
      </Paragraph>
      <p>ENTRE EM CONTATO COMIGO</p>
      <Info>
        <img src={Instagram} alt="Instagram" />
        <a
          target="_blank"
          href="https://www.instagram.com/ale_ophotografo/"
          rel="noreferrer"
        >
          @ale_ophotografo
        </a>
      </Info>
      <Info>
        <img src={WhatsApp} alt="WhatsApp" />{' '}
        <a href="https://wa.link/myttcv" target="_blank" rel="noreferrer">
          933 375 539
        </a>
      </Info>
      <Nav>
        <a href="#galeria">GALERIA</a>
        <a href="#sobre">SOBRE</a>
        <a href="#contato">CONTATO</a>
      </Nav>
    </FooterContainer>
  )
}

export default Footer
