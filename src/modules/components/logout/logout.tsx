import { signOut } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { auth } from 'modules/auth'
import { savedConfigAtom } from 'modules/storage'

export const Logout = () => {
	const savedConfig = useSetRecoilState(savedConfigAtom)
	return (
		<button
			className="fs-14 bg-col-pure-white col-light-blue"
			onClick={() => {
				savedConfig({})
				signOut(auth)
			}}
		>
			Logout
		</button>
	)
}
