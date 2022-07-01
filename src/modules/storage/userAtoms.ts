import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export const { persistAtom } = recoilPersist()

interface UserAtom {
	name: string | null
	email: string | null
	uid: string | null
}

export const userAtom = atom<UserAtom>({
	key: 'UserInfo',
	default: { name: '', email: '', uid: '' },
	effects_UNSTABLE: [persistAtom]
})
