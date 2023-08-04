import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="not-found-img"
        alt="not found"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)
export default NotFound
