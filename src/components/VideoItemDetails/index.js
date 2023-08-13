import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import SideBar from '../SideBar'
import AppContext from '../../Context/AppContext'

class VideoItemDetails extends Component {
  state = {isLoading: true, data: []}

  componentDidMount() {
    this.fetchedData()
  }

  fetchedData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchData = await response.json()
    console.log(fetchData)
    const formatData = {
      id: fetchData.video_details.id,
      title: fetchData.video_details.title,
      videoUrl: fetchData.video_details.video_url,
      thumbnailUrl: fetchData.video_details.thumbnail_url,
      channel: {
        name: fetchData.video_details.channel.name,
        profileImageUrl: fetchData.video_details.channel.profile_image_url,
        subscriberCount: fetchData.video_details.channel.subscriber_count,
      },
      viewCount: fetchData.video_details.view_count,
      publishedAt: fetchData.video_details.published_at,
      description: fetchData.video_details.description,
    }
    console.log(formatData)
    this.setState({data: formatData, isLoading: false})
  }

  render() {
    const {data, isLoading} = this.state
    console.log(data)
    const {
      id,
      title,
      videoUrl,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = data

    return (
      <AppContext.Consumer>
        {values => {
          const {savedList, onSaveVideo, onUnSaveVideo} = values
          const saveVideo = () => {
            const isSavedList = savedList.filter(i => i.id === id).length === 0
            console.log(isSavedList)
            if (isSavedList) {
              onSaveVideo(data)
            } else {
              onUnSaveVideo(data)
            }
            console.log(data, '$ save')
          }
          const isSaved = savedList.filter(i => i.id === id).length === 0
          return (
            <>
              <Header />
              <div className="middleCont">
                <SideBar />
                {!isLoading ? (
                  <div className="middle1Cont">
                    <ReactPlayer url={videoUrl} />
                    <p>{title}</p>
                    <div>
                      <p>{channel.name}</p>
                      <img src={channel.profileImageUrl} alt="channel logo" />
                      <p>{channel.description}</p>
                      <p>{channel.subscriberCount}</p>
                      <p>{viewCount}</p>
                      <p>{publishedAt}</p>
                      <p>{description}</p>
                      <ReactPlayer url={thumbnailUrl} />
                      <button type="button">
                        <p>Like</p>
                      </button>
                      <button type="button">
                        <p>Dislike</p>
                      </button>
                      <button type="button" onClick={saveVideo}>
                        <p>{isSaved ? 'Save' : 'Saved'}</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="loader-container" data-testid="loader">
                    <Loader
                      type="ThreeDots"
                      color="#ffffff"
                      height="50"
                      width="50"
                    />
                  </div>
                )}
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default VideoItemDetails
