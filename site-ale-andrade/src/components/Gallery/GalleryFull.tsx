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

interface ImageType {
  src: string
  name: string
}

export default function GalleryFull() {
  const [modalImage, setModalImage] = useState<string | null>(null)
  const { visible, sectionRef } = useRevealOnScroll(0.2)
  const [imagens, setImagens] = useState<ImageType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGaleria = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://site-aleandrade.onrender.com/api/galeria')
        const data = await res.json()

        if (Array.isArray(data)) {
          setImagens(data)
        } else if (data.error) {
          setError(data.error)
        } else {
          setError('Formato de dados inesperado da API')
        }
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar imagens')
      } finally {
        setLoading(false)
      }
    }

    fetchGaleria()
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
        ) : error ? (
          <p>{error}</p>
        ) : !Array.isArray(imagens) || imagens.length === 0 ? (
          <p>Nenhuma imagem encontrada.</p>
        ) : (
          <Gallery>
            {imagens.map((img) => (
              <GalleryItem
                key={img.src}
                src={img.src}
                alt={img.name}
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
