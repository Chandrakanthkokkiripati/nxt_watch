import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkElement = styled(Link)`
  text-decoration: none;
`

export const VideoListItem = styled.li`
  width: 100%;
  margin-bottom: 30px;
  font-family: 'roboto';
  @media screen and (min-width: 576px) and (max-width: 768px) {
    width: 260px;
    margin-right: 20px;
  }
  @media screen and (min-width: 768px) {
    width: 280px;
    margin-right: 20px;
  }
`

export const VideoImage = styled.img`
  width: 100%;
  margin-bottom: 10px;
`
export const VideoDetailsContainer = styled.div`
  display: flex;
  padding: 5px;
`
export const ChannelImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`
export const Title = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-top: 0;
  color: ${props => props.color};
`
export const ChannelName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  margin-right: 10px;
  margin-top: 0;
`
export const ChannelDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const ViewsAndDateContainer = styled.div`
  display: flex;
  @media screen and (min-width: 576px) {
    flex-direction: column;
  }
`

export const ViewsAndDate = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #475569;

  margin-top: 0;
`
