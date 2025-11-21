import styled, { keyframes } from 'styled-components'
import { Colors } from '../../styles'
import bannerImage from '../../assets/imagesHome/banner-ale.jpg'

const fadeInDown = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(-300px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

export const HeaderContainer = styled.header`
  font-family: 'Julius Sans One', sans-serif;
  background-color: ${Colors.gray};
  color: #fff;
  animation: ${fadeInDown} 1.5s ease-out forwards;

  @media (max-width: 480px) {
    animation: none;
  }
`

export const Banner = styled.div`
  height: 741px;
  text-align: center;
  object-fit: cover;
  background-image: url(${bannerImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 1024px) {
    height: 600px;
  }

  @media (max-width: 768px) {
    height: 480px;
  }

  @media (max-width: 480px) {
    height: 380px;
    background-position: top;
  }
`

export const MenuHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(15, 15, 15, 0.9);
  flex-direction: column;
  justify-content: center;
`

export const Nav = styled.nav`
  margin-top: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    color: ${Colors.white};
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      opacity: 0.5;
      transition: all 0.2s ease-in-out;
    }
  }

  @media (max-width: 768px) {
    a {
      margin: 0 0.7rem;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 10px;

    a {
      margin: 0 0.3rem;
      font-size: 0.85rem;
    }
  }
`
