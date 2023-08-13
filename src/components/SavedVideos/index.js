import AppContext from '../../Context/AppContext'
import VideoItem from '../VideoItem'
import Header from '../Header'
import SideBar from '../SideBar'

const SavedVideos = () => (
  <AppContext.Consumer>
    {values => {
      const {savedList} = values
      console.log(savedList)
      return (
        <>
          <Header />
          <SideBar />
          <ul>
            {savedList.map(i => (
              <VideoItem key={i.id} itemDetails={i} />
            ))}
          </ul>
        </>
      )
    }}
  </AppContext.Consumer>
)

export default SavedVideos
