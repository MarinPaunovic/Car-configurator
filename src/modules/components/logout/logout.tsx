import { signOut } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { auth } from '../../auth/db'
import { savedConfigAtom } from '../../storage/carAtoms'

const Logout = () => {
	const savedConfig = useSetRecoilState(savedConfigAtom)
	return (
		<div>
			<button
				onClick={() => {
					savedConfig({})
					signOut(auth)
				}}
			>
				Logout
			</button>
		</div>
	)
}

export default Logout
