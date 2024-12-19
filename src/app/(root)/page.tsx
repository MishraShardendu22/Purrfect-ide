import React from 'react'
import Header from './component/Header'
import EditorPanel from './component/EditorPanel'
import OutputPanel from './component/OutputPanel'

const page = () => {
  return (
    <div>
      <Header />
      <EditorPanel />
      <OutputPanel />
    </div>
  )
}

export default page


