import * as React from "react"
import { Switch, Route } from "react-router-dom"

import * as ROUTES from "../../constants/routes"
import Login from "../Login"
import Home from "../Home"
import { withAuthentication } from "../Session"

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.HOME} component={Home} />
    </Switch>
  )
}

export default withAuthentication(App)
