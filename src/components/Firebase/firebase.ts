import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import * as COLLECTIONS from '../../constants/collections'

export type Observer<T> = {
	next?: ((snapshot: firebase.firestore.QuerySnapshot<T>) => void) | undefined
	error?: ((error: firebase.firestore.FirestoreError) => void) | undefined
	complete?: (() => void) | undefined
}

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
	measurementId: '',
}

export default class Firebase {
	auth: firebase.auth.Auth
	db: firebase.firestore.Firestore
	storage: firebase.storage.Storage

	constructor() {
		firebase.initializeApp(firebaseConfig)
		this.auth = firebase.auth()
		this.db = firebase.firestore()
		this.storage = firebase.storage()
	}

	// *** Auth API ***

	signOut = () => this.auth.signOut()

	signIn = (email: string, password: string) =>
		this.auth.signInWithEmailAndPassword(email, password)

	getRoleByUID = async (uid: string) => {
		const ref = await this.db.collection(COLLECTIONS.USERS).doc(uid).get()
		return ref.data()
	}

	// *** Storage API ***

	uploadFile = (file: File, path: string) => {
		let fileType = file.type
		let fileName = `${Date.now()}.${fileType.substring(
			fileType.lastIndexOf('/') + 1
		)}`

		return this.storage.ref(path + fileName).put(file)
	}

	deleteFileByUrl = (url: string) => this.storage.refFromURL(url).delete()

	// *** Firestore API ***

	// Generic

	addDocument = async (collection: string, data: any, convertor: any) => {
		const doc = this.db.collection(collection).doc()
		data.id = doc.id
		return doc.withConverter(convertor).set(data)
	}

	deleteDocument = (collection: string, id: string) =>
		this.db.collection(collection).doc(id).delete()

	updateDocument = (
		collection: string,
		id: string,
		data: firebase.firestore.UpdateData
	) => this.db.collection(collection).doc(id).update(data)
}
