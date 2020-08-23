import { firebaseAuth } from "../config/firebaseConfig";

export const signIn = (email, password) => firebaseAuth().signInWithEmailAndPassword(email, password);

export const signUp = (email, password) => firebaseAuth().createUserWithEmailAndPassword(email, password);

export const isLoginUser = (cb) => firebaseAuth().onAuthStateChanged(cb)

export const logOut = () => firebaseAuth().signOut()

export const currentUser = () => firebaseAuth().currentUser