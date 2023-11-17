import firestore from '../models/database/connection';

abstract class ClientModel {
	static async getAll() {
		const result = [] as any;
		const snapshot = await firestore.collection('clients').get();

		snapshot.forEach((doc) => {
			result.push(doc.data());
		});

		return result;
	}

	static async createNew(clientData: any) {
		try {
			const docRef = firestore.collection('clients').doc();
			await docRef.set(clientData);
			return { message: `Client ${docRef.id} added!` };
		} catch (error) {
			return {
				error: 'New data was not added to the database',
			};
		}
	}
}

export default ClientModel;
