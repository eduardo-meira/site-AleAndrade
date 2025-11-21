import React from 'react'
import { Section, Title, Content, Paragraph, Image } from './styles'
import fotoAlessandro from '../../assets/imagesHome/alessandro.png'

const AboutSection = () => {
  return (
    <Section id="sobre">
      <Title>SOBRE MIM</Title>
      <Content>
        <Paragraph>
          Eu sou o Alessandro, mas pode me chamar de Ale, seja bem-vindo ao meu
          universo de cliques e boas histórias. Eu aprendi que momentos precisam
          ser vivos, mas por que não registrados?” E é exatamente isso que me
          move. Viver o agora da melhor forma possível, mas também poder guardar
          esses pedacinhos de tempo com carinho — em forma de fotos e vídeos que
          contam histórias.
        </Paragraph>
        <Image alt="Foto de Alessandro" src={fotoAlessandro} />
      </Content>
    </Section>
  )
}

export default AboutSection
