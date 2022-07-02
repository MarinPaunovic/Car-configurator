import { signOut } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { auth } from 'modules/auth'
import { savedConfigAtom } from 'modules/storage'

export const Logout = () => {
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
