import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'
import './index.css'

const SideBar = () => (
  <div className="cont1">
    <div>
      <Link to="/">
        <div className="iconSet">
          <AiFillHome className="icon1" />
          <p>Home</p>
        </div>
      </Link>
      <Link to="/trending">
        <div className="iconSet">
          <FaFire className="icon1" />
          <p>Trending</p>
        </div>
      </Link>
      <Link to="/gaming">
        <div className="iconSet">
          <SiYoutubegaming className="icon1" />
          <p>Gaming</p>
        </div>
      </Link>
      <Link to="/saved-videos">
        <div className="iconSet">
          <RiMenuAddLine className="icon1" />
          <p>Saved videos</p>
        </div>
      </Link>
    </div>
    <div>
      <p>Contact Us</p>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default SideBar
