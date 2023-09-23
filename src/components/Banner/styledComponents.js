import styled from 'styled-components'

export const BannerContainer = styled.div`
  display: ${props => props.display};
  flex-direction: column;
  padding: 20px;
  font-family: 'roboto';
  background-color: #ffffff;
  margin: 0;
`
export const LogoImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const LogoImage = styled.img`
  width: 200px;
  height: 34px;
`
export const CrossIcon = styled.button`
  font-size: 30px;
  background-color: transparent;
  border: none;
`
export const BannerText = styled.h1`
  font-size: 20px;
  color: #1e293b;
  font-weight: normal;
`
export const BannerButton = styled.button`
  background-color: transparent;
  color: #1e293b;
  border: 2px solid #1e293b;
  align-self: flex-start;
  padding: 10px;
  font-size: 17px;
  font-weight: 500;
`
