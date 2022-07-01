import {
	browserLocalPersistence,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	setPersistence
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../auth/db'

export const onClick = async (name: string, email: string, password: string, confirmPassword: string, remember: boolean) => {
	let bool = false
	if (remember) {
		setPersistence(auth, browserLocalPersistence)
	} else setPersistence(auth, browserSessionPersistence)
	if (password === confirmPassword) {
		if (password.length > 6) {
			await createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					addDoc(collection(db, 'Users'), { email, name, uid: auth.currentUser?.uid }).then(() => {
						bool = true
					})
				})
				.catch((e) => {
					if (e.code === 'auth/email-already-in-use') {
						alert('User with that email adress already exsist')
					}
				})
		} else alert('Password must have at least 6 characters')
	} else alert("Passwords doesn't match ")
	return bool
}
