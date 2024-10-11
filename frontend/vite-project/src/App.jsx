import './App.css'
import FileUpload from './components/ServerFileUpload'
import ImageUpload from './components/CloudUpload'

function App() {

  return (
    <>
      <div>
        <FileUpload></FileUpload>
        <ImageUpload></ImageUpload>
      </div>
    </>
  )
}

export default App
