import * as React from 'react'
import firebase from 'firebase/app'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'

const withAuthentication = (WrappedComponent: React.ComponentType) => {
	const WithAuthentication = () => {
		const firebase = React.useContext(FirebaseContext)
		const [authUser, setAuthUser] = React.useState<
			firebase.User & { role: string }
		>()

		React.useEffect(() => {
			const unsubscribe = firebase?.auth?.onAuthStateChanged(
				async (authUser) => {
					if (!!authUser) {
						const data = await firebase.getRoleByUID(authUser.uid)
						const role = data?.role
						const user = {
							...authUser,
							role: role,
						}
						setAuthUser(user)
					}
				}
			)

			return () => {
				if (unsubscribe) unsubscribe()
			}
		}, [firebase])

		return (
			<AuthUserContext.Provider value={authUser}>
				<WrappedComponent />
			</AuthUserContext.Provider>
		)
	}

	return WithAuthentication
}

export default withAuthentication
