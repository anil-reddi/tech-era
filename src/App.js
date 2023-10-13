import {Switch, Route} from 'react-router-dom'
import TechEra from './components/TechEra'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <NotFound />
  </Switch>
)

export default App
