import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import FiltersGroup from '../FiltersGroup'
import JobsCard from '../JobsCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    jobsList: [],
    searchInput: '',
    salaryRange: '',
    employmentType: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobsDetails = async () => {
    const {searchInput, salaryRange, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const renderJobsList = jobsList.length > 0

    return renderJobsList === true ? (
      //   <div className="all-jobs-container">
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobsCard jobData={job} key={job.id} />
        ))}
      </ul>
    ) : (
      //   </div>
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobsDetails()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        // testid="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  changeEmployeeList = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJobsDetails,
    )
  }

  updateSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsDetails)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsDetails()
  }

  renderJobsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.loadingView()
      case apiStatusConstant.success:
        return this.renderJobsList()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="search-bar-mobile-container">
            <input
              onChange={this.onChangeSearch}
              type="search"
              className="search-bar"
              placeholder="Search"
              value={searchInput}
            />
            <BsSearch className="search-icon-desktop" />
          </div>

          <div className="profile-and-filters-con">
            <div className="profile-container">
              <ProfileDetails />
            </div>
            <div className="filters-container">
              <FiltersGroup
                salaryRangesList={salaryRangesList}
                employmentTypesList={employmentTypesList}
                updateSalaryRange={this.updateSalaryRange}
                changeEmployeeList={this.changeEmployeeList}
              />
            </div>
          </div>
          <div className="jobs-sub-container">
            <div className="jobs-list-container">
              <div className="search-bar-desktop-container">
                <input
                  onChange={this.onChangeSearch}
                  type="search"
                  className="search-bar"
                  placeholder="Search"
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-button-container-desktop"
                  onClick={this.onClickSearchButton}
                  testid="searchButton"
                >
                  <BsSearch className="search-icon-desktop" />
                </button>
              </div>
              {this.renderJobsPage()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
