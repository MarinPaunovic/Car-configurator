import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { auth } from 'modules/auth'
import { userAtom, savedConfigEditAtom } from 'modules/storage'
import { Homepage, Login, PasswordReset, Register, SelectCar, ConfigurationView, ConfigurationEdit } from 'pages'

const App = () => {
	const [userInfo, setUserInfo] = useRecoilState(userAtom)
	const SavedConfig = useRecoilValue(savedConfigEditAtom)
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo({ name: user.displayName, uid: user.uid, email: user.email })
				return
			}
			setUserInfo({ name: '', email: '', uid: '' })
		})
		return () => {
			unsub()
		}
	}, [setUserInfo])

	return (
		<Router>
			<Routes>
				{userInfo.email ? (
					<>
						<Route path="/" element={<Homepage />} />
						<Route path="/configure" element={<SelectCar />} />
						{SavedConfig && <Route path="/configuration-view" element={<ConfigurationView />} />}
						<Route path="/configuration-edit" element={<ConfigurationEdit />} />
						<Route path="*" element={<Navigate to={'/'} />} />
					</>
				) : (
					<>
						{' '}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/password-reset" element={<PasswordReset />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</>
				)}
			</Routes>
		</Router>
	)
}

export default App
