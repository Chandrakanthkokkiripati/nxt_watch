import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../Failureview'
import PlayVideoView from '../VideoPlayer'
import NavigationBar from '../NavigationBar'
import ThemeAndVideoContext from '../context/ThemeAndVideoContext'

import {VideoItemDetailsContainer, LoadingContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  })

  getVideoItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.formattedData(data)
      //   console.log(updatedData)
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickLiked = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  clickDisLiked = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  onRetry = () => this.getVideoItemDetails()

  renderSuccessView = () => {
    const {videosList, isLiked, isDisLiked} = this.state
    return (
      <PlayVideoView
        video={videosList}
        clickLiked={this.clickLiked}
        clickDisLiked={this.clickDisLiked}
        clickSaved={this.clickSaved}
        isLiked={isLiked}
        isDisLiked={isDisLiked}
      />
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <LoadingContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </LoadingContainer>
  )

  renderVideoItemDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <NavigationBar />
        <ThemeAndVideoContext.Consumer>
          {value => {
            const {isDarkTheme} = value
            const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
            return (
              <VideoItemDetailsContainer
                bgColor={bgColor}
                data-testid="videoItemDetails"
              >
                {this.renderVideoItemDetailsView()}
              </VideoItemDetailsContainer>
            )
          }}
        </ThemeAndVideoContext.Consumer>
      </>
    )
  }
}

export default VideoItemDetails
