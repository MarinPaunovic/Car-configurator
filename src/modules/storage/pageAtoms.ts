import { atom } from 'recoil'
import { persistAtom } from './userAtoms'

export const previewCurrentPageAtom = atom({
	key: 'previewPagination',
	default: 1,
	effects_UNSTABLE: [persistAtom]
})
