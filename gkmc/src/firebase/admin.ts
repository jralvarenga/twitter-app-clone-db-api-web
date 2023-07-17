import firebaseAdmin from 'firebase-admin'
import serviceAccount from './croonic-b9bf8-firebase-adminsdk-m7cx9-de19a8f406.json'
import { getAuth } from 'firebase-admin/auth'

if (firebaseAdmin && firebaseAdmin.apps.length === 0) {
  firebaseAdmin.initializeApp({
    // @ts-ignore
    credential: firebaseAdmin.credential.cert(serviceAccount),
    serviceAccountId: '116968981344703583052@croonic-b9bf8.iam.gserviceaccount.com'
  })
}

export const adminAuth = getAuth(firebaseAdmin.app())