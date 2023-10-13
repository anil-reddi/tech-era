import {Link} from 'react-router-dom'
import './index.css'

const TechItem = props => {
  const {techDetails} = props
  const {id, logoUrl, name} = techDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="tech-item">
        <img src={logoUrl} alt={name} className="tech-image" />
        <p className="tech-name">{name}</p>
      </li>
    </Link>
  )
}
export default TechItem
