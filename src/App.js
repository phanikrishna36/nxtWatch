import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import Home from './components/Home'
import './App.css'
import NotFound from './components/NotFound'
import AppContext from './Context/AppContext'

// Replace your code here
class App extends Component {
  state = {mode: true, active: '', SavedVideosList: [], isDark: false}

  changeMode = () => {
    this.setState(i => ({mode: !i.mode}))
  }

  onActive = event => {
    this.setState({active: event.target.id})
  }

  onSaveVideo = video => {
    const {SavedVideosList} = this.state
    this.setState({SavedVideosList: [...SavedVideosList, video]})
  }

  onUnSaveVideo = video => {
    const {SavedVideosList} = this.state
    const videos = SavedVideosList.filter(i => i.id !== video.id)
    this.setState({SavedVideosList: videos})
  }

  onToggleTheme = () => {
    this.setState(i => ({isDark: !i.isDark}))
  }

  render() {
    const {mode, active, SavedVideosList} = this.state
    return (
      <AppContext.Provider
        value={{
          mode,
          changeMode: this.changeMode,
          active,
          onActive: this.onActive,
          onUnSaveVideo: this.onUnSaveVideo,
          onSaveVideo: this.onSaveVideo,
          savedList: SavedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
