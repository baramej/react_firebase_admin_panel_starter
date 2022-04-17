import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'

import * as ROUTES from '../../constants/routes'
import logo from '../../assets/images/logo.png'
import { FirebaseContext } from '../Firebase'

const Copyright = () => (
	<Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link
			target="_blank"
			rel="noopener"
			color="inherit"
			href="https://baramej.io/"
		>
			Baramej
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
)

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const SignIn = () => {
	const classes = useStyles()
	const history = useHistory()
	const firebase = React.useContext(FirebaseContext)
	const formik = useFormik({
		validateOnChange: false,
		initialValues: {
			username: '',
			password: '',
			error: null,
		},
		validationSchema: yup.object({
			username: yup.string().required('Username is required'),
			password: yup.string().required('Password is required'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true)

			try {
				const userCredentials = await firebase?.signIn(
					`${values.username}@baramej.io`,
					values.password
				)

				if (userCredentials && userCredentials.user) {
					const data = await firebase?.getRoleByUID(
						userCredentials.user.uid
					)
					const role = data?.role
					if (['admin', 'staff'].includes(role)) {
						if (role === 'admin') {
							history.push(ROUTES.HOME)
						} else if (role === 'staff') {
							history.push(ROUTES.HOME)
						}
					} else {
						await firebase?.signOut()
						formik.setErrors({
							error: '401 Unauthorized',
						})
					}
				} else {
					formik.setErrors({
						error: 'Something went wrong. Try again.',
					})
				}
			} catch (e) {
				formik.setErrors({
					error: 'Invalid username or password',
				})
			} finally {
				setSubmitting(false)
			}
		},
	})

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img className={classes.avatar} src={logo} alt="Ibsar logo" />
				<form
					onSubmit={formik.handleSubmit}
					className={classes.form}
					autoComplete="off"
				>
					{formik.errors.error && (
						<Alert severity="error">{formik.errors.error}</Alert>
					)}
					<TextField
						error={!!formik.errors.username}
						helperText={formik.errors.username}
						value={formik.values.username}
						onChange={formik.handleChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Username"
						name="username"
						autoFocus
					/>
					<TextField
						error={!!formik.errors.password}
						helperText={formik.errors.password}
						value={formik.values.password}
						onChange={formik.handleChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
					/>
					<Button
						disabled={formik.isSubmitting}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

export default SignIn
