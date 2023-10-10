import styled from 'styled-components'

export const HomeBgContainer = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  min-height: 100vh;
  margin-top: 50px;
  padding-top: 10px;
  @media screen and (min-width: 768px) {
    margin-left: 250px;
  }
`
export const SearchInputContainer = styled.div`
  border: 1px solid #64748b;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 6px;
`
export const InputField = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
  width: 100%;
`
export const SearchIcon = styled.button`
  background-color: ${props => props.iconBgColor};
  outline: none;
  border: 1px solid #64748b;
  width: 50px;
`
export const HomeVideosListContainer = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  @media screen and (min-width: 577px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 20px;
  }
`
export const NoVideosView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
`

export const NoVideosImage = styled.img`
  width: 200px;
  @media screen and (min-width: 768px) {
    width: 450px;
  }
`
export const NoVideosHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 25px;
`

export const NoVideosNote = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
`

export const RetryButton = styled.button`
  border: none;
  background-color: #4f46e5;
  border-radius: 3px;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Roboto';
  font-size: 15px;
`
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
`
