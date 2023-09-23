import {MdClear} from 'react-icons/md'

import {
  BannerContainer,
  LogoImageContainer,
  LogoImage,
  CrossIcon,
  BannerText,
  BannerButton,
} from './styledComponents'

const Banner = props => {
  const {display, closeBanner} = props

  return (
    <BannerContainer data-testid="banner" display={display}>
      <LogoImageContainer>
        <LogoImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <CrossIcon onClick={() => closeBanner()} type="button">
          <MdClear />
        </CrossIcon>
      </LogoImageContainer>
      <BannerText>
        Buy Nxtwatch Premium prepaid plans with <br /> UPI
      </BannerText>
      <BannerButton type="button">GET IT NOW</BannerButton>
    </BannerContainer>
  )
}
export default Banner
