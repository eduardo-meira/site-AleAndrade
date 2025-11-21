import styled from 'styled-components'
import { Colors } from '../../styles'

export const Section = styled.section`
  font-family: 'Montserrat', sans-serif;
  justify-content: center;
  padding: 16px 1rem;
  background-color: ${Colors.white};

  @media (max-width: 768px) {
    padding: 16px 0.5rem;
  }
`

export const Title = styled.h2`
  text-align: center;
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

export const Content = styled.div`
  height: 600px;
  display: flex;
  justify-content: space-around;
  margin-top: 48px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 32px;
  }

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`

export const Paragraph = styled.p`
  line-height: 1.8;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;

  @media (max-width: 1024px) {
    text-align: center;
    max-width: 80%;
    margin: 1rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export const Image = styled.img`
  width: 30vw;
  height: 90%;
  margin: 1rem;
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    width: 60vw;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 80vw;
  }
`
