import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.ADMIN_SDK_KEY) {
	throw new Error(
		'Database JSON key is not loaded to the environment variables'
	);
}

const serviceAccount = JSON.parse(process.env.ADMIN_SDK_KEY as any);

initializeApp({
	credential: cert(serviceAccount as any),
});

const firestore = getFirestore();

export default firestore;
