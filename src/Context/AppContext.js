import React from 'react'

const AppContext = React.createContext({
  changeMode: () => {},
  active: '',
  onActive: () => {},
  savedList: [],
  onSaveVideo: () => {},
  onUnSaveVideo: () => {},
  mode: false,
})

export default AppContext
