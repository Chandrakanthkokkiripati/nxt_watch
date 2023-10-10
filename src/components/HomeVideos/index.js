import {formatDistanceToNow} from 'date-fns'
import ThemeAndVideoContext from '../context/ThemeAndVideoContext'

import {
  VideoListItem,
  VideoImage,
  VideoDetailsContainer,
  ChannelImage,
  Title,
  ChannelDescriptionContainer,
  ChannelName,
  ViewsAndDate,
  ViewsAndDateContainer,
  LinkElement,
} from './styledComponents'

const HomeVideos = props => {
  const {video} = props
  const {
    thumbnailUrl,
    profileImageUrl,
    name,
    title,
    viewCount,
    publishedAt,
    id,
  } = video
  const time = formatDistanceToNow(new Date(publishedAt))

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
        return (
          <LinkElement to={`/videos/${id}`}>
            <VideoListItem>
              <VideoImage src={thumbnailUrl} alt="video thumbnail" />
              <VideoDetailsContainer>
                <ChannelImage src={profileImageUrl} alt="channel logo" />
                <ChannelDescriptionContainer>
                  <Title color={textColor}>{title}</Title>
                  <ViewsAndDateContainer>
                    <ChannelName> {name}</ChannelName>
                    <ViewsAndDate>
                      &#8226; {viewCount} views &#8226; {time}
                    </ViewsAndDate>
                  </ViewsAndDateContainer>
                </ChannelDescriptionContainer>
              </VideoDetailsContainer>
            </VideoListItem>
          </LinkElement>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default HomeVideos
