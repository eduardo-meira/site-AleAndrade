import React from 'react'
import {
  Section,
  Title,
  Subtitle,
  Gallery,
  Item,
  Action,
  Modal,
  ModalContent,
  Button
} from './styles'

import zoom from '../../assets/icons/zoom-in.png'
import close from '../../assets/icons/close.png'
import { Link } from 'react-router-dom'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { galleryHome } from '../../data/galleryHome'

interface GalleryItemProps {
  src: string
  alt: string
  onClick: (src: string) => void
}

const GalleryItem = ({ src, alt, onClick }: GalleryItemProps) => (
  <Item onClick={() => onClick(src)}>
    <img className="photo" src={src} alt={alt} />
    <Action>
      <img src={zoom} className="zoom" alt="clique para ampliar a imagem" />
    </Action>
  </Item>
)

const GallerySection = () => {
  const [modalImage, setModalImage] = React.useState<string | null>(null)
  const { visible, sectionRef } = useRevealOnScroll(0.2)

  return (
    <>
      <Section id="galeria" ref={sectionRef} $visible={visible}>
        <Title>VÍDEOS E FOTOS</Title>

        <Subtitle>
          AQUI A FOTOGRAFIA E FILMES SÃO LEVES, DIVERTIDOS E CHEIOS DE VIDA.
        </Subtitle>

        <Gallery>
          {galleryHome.map((img) => (
            <GalleryItem
              key={img.src}
              src={img.src}
              alt={img.alt}
              onClick={setModalImage}
            />
          ))}
        </Gallery>

        <Button>
          <Link className="link-button" to="/gallery">
            Ver mais
          </Link>
        </Button>
      </Section>

      <Modal
        className={modalImage ? 'visible' : ''}
        onClick={() => setModalImage(null)}
      >
        <ModalContent>
          <header>
            <h4>Foto por Alessandro Andrade</h4>
            <img
              onClick={() => setModalImage(null)}
              src={close}
              className="close"
              alt="clique para fechar a imagem"
            />
          </header>

          {modalImage && (
            <img src={modalImage} className="photo" alt="imagem ampliada" />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default GallerySection
