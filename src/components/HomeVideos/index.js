import {formatDistanceToNow} from 'date-fns'

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
  } = video
  const time = formatDistanceToNow(new Date(publishedAt))
  //   console.log(time)
  return (
    <VideoListItem>
      <VideoImage src={thumbnailUrl} alt="video thumbnail" />
      <VideoDetailsContainer>
        <ChannelImage src={profileImageUrl} alt="channel logo" />
        <ChannelDescriptionContainer>
          <Title>{title}</Title>
          <ViewsAndDateContainer>
            <ChannelName> {name}</ChannelName>
            <ViewsAndDate>
              &#8226; {viewCount} views &#8226; {time}
            </ViewsAndDate>
          </ViewsAndDateContainer>
        </ChannelDescriptionContainer>
      </VideoDetailsContainer>
    </VideoListItem>
  )
}

export default HomeVideos
