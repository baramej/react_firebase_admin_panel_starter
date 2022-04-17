import * as React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Dashboard } from '@material-ui/icons'

import * as ROUTES from '../../constants/routes'
import AuthUserContext from '../Session'

const NavDrawerList = () => {
	const location = useLocation()
	const user = React.useContext(AuthUserContext)

	if (!!user && user.role === 'admin') {
		return (
			<List>
				<ListItem
					button
					component={RouterLink}
					to={ROUTES.HOME}
					selected={location.pathname === ROUTES.HOME}
				>
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</List>
		)
	} else {
		return <></>
	}
}

export default NavDrawerList
