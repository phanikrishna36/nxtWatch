import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingItem from '../TrendingItem'
import AppContext from '../../Context/AppContext'

import './index.css'

class Trending extends Component {
  state = {
    isLoading: true,
    trendingData: [],
    isError: false,
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
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    console.log(response)
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
      console.log(fetchedData)
      this.setState({
        trendingData: formattedData,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  retry = () => {
    this.setState({isLoading: true, trendingData: [], isError: false})
    this.fetchData()
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
    const {trendingData} = this.state
    return (
      <div className="inside1">
        <FaFire className="icon1" />
        <h1>Trending</h1>
        <ul className="mainItem">
          {trendingData.map(i => (
            <TrendingItem key={i.id} itemDetails={i} />
          ))}
        </ul>
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

export default Trending
