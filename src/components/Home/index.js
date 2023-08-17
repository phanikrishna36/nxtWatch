import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GrFormClose} from 'react-icons/gr'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'
import AppContext from '../../Context/AppContext'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    videosData: [],
    isError: false,
    isCloseClick: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/all?search=',
      options,
    )

    const fetchedData = await response.json()
    if (response.ok) {
      const formattedData = fetchedData.videos.map(i => ({
        id: i.id,
        title: i.title,
        thumbnailUrl: i.thumbnail_url,
        viewCount: i.view_count,
        publishedAt: i.published_at,
        name: i.channel.name,
        profileImageUrl: i.channel.profile_image_url,
      }))

      this.setState({
        videosData: formattedData,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  onClose = () => this.setState({isCloseClick: true})

  retry = () => {
    this.setState({isLoading: true, videosData: [], isError: false})
    this.fetchedData()
  }

  renderFail = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderVideoSearch() {
    const {videosData, isCloseClick} = this.state
    return (
      <div className="inside1">
        {isCloseClick ? (
          ''
        ) : (
          <div className="premium">
            <div data-testid="banner" className="logoCont">
              <img
                className="image1"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <button data-testid="close" type="button" onClick={this.onClose}>
                <GrFormClose />
              </button>
            </div>
            <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
            <button type="button" className="btnGet">
              GET IT NOW
            </button>
          </div>
        )}
        <div className="searchContainer">
          <ul>
            <input type="search" placeholder="Search" />
            <button type="button" data-testid="searchButton">
              <BiSearch />
            </button>
          </ul>
          <ul className="mainItem">
            {videosData.map(i => (
              <VideoItem key={i.id} itemDetails={i} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderResult = () => {
    const {isError} = this.state
    return isError ? this.renderFail() : this.renderVideoSearch()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color=" #4f46e5" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <AppContext.Consumer>
        {values => {
          const {mode} = values
          return (
            <div className={`${!mode ? 'dark' : ''}`}>
              <Header />
              <div className="inside">
                <SideBar />
                {isLoading ? this.renderLoader() : this.renderResult()}
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
