import styled from "styled-components";
import { Colors } from "../../styles";

export const ButtonTop = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  font-size: 32px;
  font-weight: bold;

  background-color: ${Colors.darkgray};
  color: ${Colors.white};

  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${Colors.gray};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    font-size: 26px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 24px;
    bottom: 16px;
    right: 16px;
  }
`;
