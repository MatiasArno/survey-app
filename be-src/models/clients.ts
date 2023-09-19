import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './database/firebase-adminsdk-key.json';

initializeApp({
	credential: cert(serviceAccount as any),
});

const db = getFirestore();

export default db;