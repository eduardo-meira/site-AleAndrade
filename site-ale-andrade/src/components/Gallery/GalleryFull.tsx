import React, { useEffect, useState } from 'react'
import {
  Section,
  Title,
  Subtitle,
  Gallery,
  Item,
  Action,
  Modal,
  ModalContent,
} from './styles'

import zoom from '../../assets/icons/zoom-in.png'
import close from '../../assets/icons/close.png'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import ScrollToTop from '../ScrollToTop'

interface GalleryItemProps {
  src: string
  alt: string
  onClick: (src: string) => void
}

const GalleryItem = ({ src, alt, onClick }: GalleryItemProps) => (
  <Item onClick={() => onClick(src)}>
    <img className="photo" src={src} alt={alt} />
    <Action>
      <img src={zoom} className="zoom" alt="Clique para ampliar a imagem" />
    </Action>
  </Item>
)

export default function GalleryFull() {
  const [modalImage, setModalImage] = useState<string | null>(null)
  const { visible, sectionRef } = useRevealOnScroll(0.2)
  const [imagens, setImagens] = useState<{ src: string; alt: string }[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('https://ale-ophotografo.vercel.app/api/galeria')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setImagens(data)
      } else {
        console.error('Resposta inesperada da API:', data)
        setImagens([])
      }
      setLoading(false)
    })
    .catch(err => {
      console.error('Erro ao buscar imagens:', err)
      setImagens([])
      setLoading(false)
    })
}, [])


  return (
    <>
      <Section id="galeria" ref={sectionRef} $visible={visible}>
        <Title>PORTFÓLIO COMPLETO</Title>
        <Subtitle>
          AQUI A FOTOGRAFIA E FILMES SÃO LEVES, DIVERTIDOS E CHEIOS DE VIDA.
        </Subtitle>

        {loading ? (
          <p>Carregando imagens...</p>
        ) : imagens.length === 0 ? (
          <p>Nenhuma imagem encontrada.</p>
        ) : (
          <Gallery>
            {imagens.map(img => (
              <GalleryItem
                key={img.src}
                src={img.src} // já vem com link do Google Drive
                alt={img.alt}
                onClick={setModalImage}
              />
            ))}
          </Gallery>
        )}
      </Section>

      <ScrollToTop />

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
              alt="Clique para fechar a imagem"
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
