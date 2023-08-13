import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMoon} from 'react-icons/io'
import {BiSun} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import './index.css'
import AppContext from '../../Context/AppContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <AppContext.Consumer>
      {values => {
        const {mode, changeMode} = values
        const clickedChangeMode = () => {
          changeMode()
        }
        return (
          <div className="Header">
            <Link to="/">
              {mode ? (
                <img
                  className="image1"
                  alt="website logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                />
              ) : (
                <img
                  className="image1"
                  alt="website logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                />
              )}
            </Link>
            <div className="head2">
              <button type="button" onClick={clickedChangeMode}>
                {mode ? (
                  <IoMdMoon className="icon" />
                ) : (
                  <BiSun className="icon" />
                )}
              </button>

              <img
                className="profileImg"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              <Popup
                modal
                trigger={
                  <button className="btn1" type="button" data-testid="theme">
                    Logout
                  </button>
                }
              >
                {close => (
                  <>
                    <p>Are you sure, you want to logout</p>
                    <button type="button" onClick={onClickLogout}>
                      Confirm
                    </button>
                    <button type="button" onClick={() => close()}>
                      Cancel
                    </button>
                  </>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(Header)
