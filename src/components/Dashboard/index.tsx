import { withAuthorization } from '../Session'

const Dashboard = () => {
	return <></>
}

export default withAuthorization((authUser) =>
	['admin'].includes(authUser.role)
)(Dashboard)
