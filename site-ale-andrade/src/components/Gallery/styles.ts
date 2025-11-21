import styled, { css, keyframes } from 'styled-components'
import { Colors } from '../../styles'

const fadeInSide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-600px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`

export const Section = styled.section<{ $visible: boolean }>`
  font-family: 'Montserrat', sans-serif;
  opacity: 0;
  padding-bottom: 24px;
  transform: translateX(-400px);
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeInSide} 1.8s ease-out forwards;
    `}

  @media (max-width: 768px) {
    padding: 1rem;
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

export const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: ${Colors.darkgray};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  padding: 2rem;
  justify-items: center;
  align-items: center;
  animation: ${fadeInSide} 1.5s ease-out forwards;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr; /* tablets */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* celular */
    padding: 1rem;
  }
`

export const Action = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease-in-out;

  .zoom {
    width: 100px;
    height: 100px;

    @media (max-width: 480px) {
      width: 60px;
      height: 60px;
    }
  }
`

export const Item = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-size: cover;
  background-color: #aaa;
  border-radius: 8px;
  overflow: hidden;

  .photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    ${Action} {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 600px) {
    height: 450px;
  }

  @media (max-width: 480px) {
    height: 450px;
  }
`

export const Button = styled.button`
  display: block;
  margin: 15px auto;
  padding: 2px 12px;
  font-size: 32px;
  font-family: 'Julius Sans One', sans-serif;
  color: ${Colors.white};
  background-color: ${Colors.darkgray};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${Colors.gray};
  }

  .link-button {
    text-decoration: none;
    color: ${Colors.white};
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: none;

  img {
    max-width: 70%;

    @media (max-width: 1024px) {
      max-width: 80%;
    }

    @media (max-width: 600px) {
      max-width: 90%;
    }
  }

  &.visible {
    display: flex;
  }

  .close {
    width: 40px;
    cursor: pointer;

    @media (max-width: 480px) {
      width: 30px;
    }
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    color: ${Colors.white};
  }

  .photo {
    display: block;
    max-height: 800px;
    border-radius: 8px;
    border: 1px solid ${Colors.white};

    @media (max-width: 1024px) {
      max-height: 600px;
    }

    @media (max-width: 600px) {
      max-height: 500px;
    }

    @media (max-width: 480px) {
      max-height: 500px;
    }
  }
`

export const Link = styled.a`
  text-decoration: none;
  color: ${Colors.white};
`
