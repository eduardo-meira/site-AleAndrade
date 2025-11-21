import styled from 'styled-components'
import { Colors } from '../../styles'

export const FooterContainer = styled.footer`
  font-family: 'Nunito', sans-serif;
  text-align: center;
  padding: 2rem;
  background-color: ${Colors.darkgray};
  color: white;

  span {
    border-top: 2px solid white;
    padding-top: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`

export const Paragraph = styled.p`
  margin-bottom: 1rem;
  height: auto;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export const Info = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 42px;
    height: 42px;
    margin-right: 8px;

    @media (max-width: 480px) {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }

  a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      opacity: 0.5;
    }

    @media (max-width: 480px) {
      margin: 0 0.5rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`

export const Nav = styled.nav`
  margin-top: 1rem;

  a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      opacity: 0.5;
    }

    @media (max-width: 480px) {
      margin: 0 0.5rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`

export const Icons = styled.img`
  width: 24px;
  height: 24px;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`
