import * as React from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'

import * as ROUTES from '../../constants/routes'
import { FirebaseContext } from '../Firebase'

const withAuthorization =
	(condition: (authUser: firebase.User & { role: string }) => boolean) =>
	(WrappedComponent: React.ComponentType) => {
		const WithAuthorization = () => {
			const history = useHistory()
			const firebase = React.useContext(FirebaseContext)
			const [authUser, setAuthUser] = React.useState<
				firebase.User & { role: string }
			>()

			React.useEffect(() => {
				const unsubscribe = firebase?.auth?.onAuthStateChanged(
					async (authUser) => {
						if (!!authUser) {
							const data = await firebase?.getRoleByUID(
								authUser.uid
							)
							const role = data?.role

							const user = {
								...authUser,
								role: role,
							}

							setAuthUser(user!)
							if (!condition(user)) {
								history.push(ROUTES.LOGIN)
							}
						} else {
							history.push(ROUTES.LOGIN)
						}
					}
				)

				return () => {
					if (unsubscribe) unsubscribe()
				}
			}, [firebase, history])

			return authUser ? <WrappedComponent /> : null
		}

		return WithAuthorization
	}

export { withAuthorization }
