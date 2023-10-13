import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import TechItem from '../TechItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {techList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({techList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {techList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <ul className="tech-list">
          {techList.map(each => (
            <TechItem key={each.id} techDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.renderFinalView()}
      </div>
    )
  }
}
export default TechEra
