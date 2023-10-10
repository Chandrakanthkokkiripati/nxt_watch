import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  font-family: 'roboto';
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  margin-top: 50px;
  padding: 10px;
  @media screen and (min-width: 768px) {
    margin-left: 250px;
  }
`

export const LoadingContainer = styled.div`
  min-height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
`
