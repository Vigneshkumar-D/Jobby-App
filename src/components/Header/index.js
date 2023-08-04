import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-bg-container">
      <div className="navbar-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-image"
            alt="website logo"
          />
        </Link>

        <ul className="navbar-mobile-icon-container">
          <li>
            <Link to="/">
              <AiFillHome className="nav-item-mobile-link" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill className="nav-item-mobile-link" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="nav-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
      <div className="header-dest-top-sub-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <ul className="list-container">
          <li className="link-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="link-item">
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
