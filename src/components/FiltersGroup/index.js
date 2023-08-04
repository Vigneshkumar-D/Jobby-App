import './index.css'

const FiltersGroup = props => {
  const {updateSalaryRange} = props

  const renderTypeOfEmpList = () => {
    const {employmentTypesList} = props
    return (
      //   <div className="employee-type-container">
      <>
        <h1 className="type-of-emp">Type of Employment</h1>
        <ul className="employee-type-list">
          {employmentTypesList.map(eachEmployeeType => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="employee-item"
                key={eachEmployeeType.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachEmployeeType.employmentTypeId}
                  className="check-input"
                  value={eachEmployeeType.employmentTypeId}
                />
                <label
                  htmlFor={eachEmployeeType.employmentTypeId}
                  className="label-text"
                >
                  {eachEmployeeType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
      //   </div>
    )
  }

  const renderSalaryList = () => {
    const {salaryRangesList} = props
    return (
      //   <div className="employee-type-container">
      <>
        <h1 className="type-of-emp">Salary Range</h1>
        <ul className="employee-type-list">
          {salaryRangesList.map(eachSalary => {
            const onClickSalary = () => {
              updateSalaryRange(eachSalary.salaryRangeId)
            }
            return (
              <li
                className="salary-item"
                key={eachSalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="check-input"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="label-text "
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
      /* </div> */
    )
  }

  return (
    <div className="filters-container">
      {/* <div className="epm-list"></div> */}
      {renderTypeOfEmpList()}
      {renderSalaryList()}
      {/* <div className="salary-range-container"></div> */}
    </div>
  )
}
export default FiltersGroup
