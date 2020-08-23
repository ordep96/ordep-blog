import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { firebaseConfig } from './'

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth
export const firebaseDatabase = firebase.database