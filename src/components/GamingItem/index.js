import {Link} from 'react-router-dom'

import './index.css'

const GamingItem = props => {
  const {itemDetails} = props
  const {id, title, thumbnailUrl, viewCount} = itemDetails
  return (
    <Link to={`/videos/${id}`}>
      <li className="item">
        <img className="profile1" src={thumbnailUrl} alt="video thumbnail" />
        <div className="item1">
          <div>
            <p>{title}</p>
            <div className="lastItem">
              <p>{viewCount}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default GamingItem
