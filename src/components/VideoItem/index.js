import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {itemDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = itemDetails
  return (
    <Link to={`/videos/${id}`}>
      <li className="item">
        <img className="profile1" src={thumbnailUrl} alt="video thumbnail" />
        <div className="item1">
          <img className="profile2" src={profileImageUrl} alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div className="lastItem">
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
