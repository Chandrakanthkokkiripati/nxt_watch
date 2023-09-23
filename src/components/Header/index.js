import {withRouter} from 'react-router-dom'
import {Popup} from 'reactjs-popup'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import ThemeAndVideoContext from '../context/ThemeAndVideoContext'

import {
  HeaderContainer,
  LogoImage,
  ToggleIconButton,
  ActionsContainer,
  MenuIcon,
  LogoutButton,
  LogoutIconButton,
  ModalContainer,
  CloseButton,
  ConfirmButton,
  ModalDesc,
  ButtonsContainer,
  LogoLink,
  ProfileImage,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const logoImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const bgColor = isDarkTheme ? '#212121' : '#ffffff'
        const color = isDarkTheme ? '#ffffff' : '#212121'

        return (
          <HeaderContainer bgColor={bgColor} color={color}>
            <LogoLink to="/">
              <LogoImage src={logoImage} alt="website logo" />
            </LogoLink>
            <ActionsContainer>
              <ToggleIconButton
                data-testid="theme"
                onClick={() => toggleTheme()}
                type="button"
              >
                {isDarkTheme ? (
                  <BsBrightnessHigh color="#ffffff" size={20} />
                ) : (
                  <BsMoon size={20} />
                )}
              </ToggleIconButton>
              <MenuIcon>
                <GiHamburgerMenu size={25} />
              </MenuIcon>
              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" bgColor={bgColor} color={color}>
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <ModalContainer>
                    <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                    <ButtonsContainer>
                      <CloseButton
                        type="button"
                        data-testid="closeButton"
                        onClick={() => close()}
                      >
                        Cancel
                      </CloseButton>

                      <ConfirmButton type="button" onClick={onClickLogout}>
                        Confirm
                      </ConfirmButton>
                    </ButtonsContainer>
                  </ModalContainer>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <LogoutIconButton type="button">
                    <FiLogOut size={20} color={color} />
                  </LogoutIconButton>
                }
                className="popup-content"
              >
                {close => (
                  <ModalContainer>
                    <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                    <ButtonsContainer>
                      <CloseButton
                        type="button"
                        data-testid="closeButton"
                        onClick={() => close()}
                      >
                        Cancel
                      </CloseButton>

                      <ConfirmButton type="button" onClick={onClickLogout}>
                        Confirm
                      </ConfirmButton>
                    </ButtonsContainer>
                  </ModalContainer>
                )}
              </Popup>
            </ActionsContainer>
          </HeaderContainer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Header)
