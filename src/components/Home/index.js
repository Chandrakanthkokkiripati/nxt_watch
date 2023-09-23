import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import Banner from '../Banner'
import ThemeAndVideoContext from '../context/ThemeAndVideoContext'
import HomeVideos from '../HomeVideos'

import {
  HomeBgContainer,
  SearchInputContainer,
  InputField,
  SearchIcon,
  HomeVideosListContainer,
  RetryButton,
  NoVideosNote,
  NoVideosHeading,
  NoVideosImage,
  NoVideosView,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    bannerDisplay: 'flex',
    searchInput: '',
    homeVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        homeVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  closeBanner = () => {
    this.setState({bannerDisplay: 'none'})
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderSuccessView = () => {
    const {homeVideos} = this.state
    const homeVideosCount = homeVideos.length

    return homeVideosCount > 0 ? (
      <HomeVideosListContainer>
        {homeVideos.map(eachVideo => (
          <HomeVideos video={eachVideo} key={eachVideo.id} />
        ))}
      </HomeVideosListContainer>
    ) : (
      <NoVideosView>
        <NoVideosImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <NoVideosHeading>No Search results found</NoVideosHeading>
        <NoVideosNote>
          Try different key words or remove search filter
        </NoVideosNote>
        <RetryButton type="button" onClick={this.onRetry}>
          Retry
        </RetryButton>
      </NoVideosView>
    )
  }

  renderFailureView = () => <h1>Api Status Failed</h1>

  renderLoadingView = () => <h1>Loading...</h1>

  renderHomeView = () => {
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

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value}, this.getVideos)
  }

  render() {
    const {bannerDisplay, searchInput} = this.state
    const display = bannerDisplay === 'flex' ? 'flex' : 'none'

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
          const color = isDarkTheme ? '#f9f9f9' : '#1e293b'
          const iconBgColor = isDarkTheme ? '#F4F4F4' : '#FFFFFF'
          return (
            <>
              <HomeBgContainer
                data-testid="home"
                color={color}
                bgColor={bgColor}
              >
                <Header />
                <Banner closeBanner={this.closeBanner} display={display} />
                <SearchInputContainer>
                  <InputField
                    onChange={this.onChangeSearchInput}
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                  />
                  <SearchIcon iconBgColor={iconBgColor} type="button">
                    <AiOutlineSearch color="#616e7c" size="20" />
                  </SearchIcon>
                </SearchInputContainer>
                {this.renderHomeView()}
              </HomeBgContainer>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home
