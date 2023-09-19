import ClientModel from '../models/clients';

abstract class ClientController {
	static async getAll() {
		const result = [] as any;
		const snapshot = await ClientModel.collection('clients').get();

		snapshot.forEach((doc) => {
			result.push(doc.data());
		});

		return result;
	}

	static async createClient(data: any) {
		const { name, email, cellphone, company, interests } = data;

		if (!name || !email || !cellphone || !company || !interests)
			return { error: 'All fields are required' };

		console.log(data);

		try {
			const docRef = ClientModel.collection('clients').doc();
			await docRef.set({
				name,
				email,
				cellphone,
				company,
				interests,
			});

			return { message: 'Client created' };
		} catch (error) {
			throw new Error('Error when writting data to the database...');
		}
	}
}

export default ClientController;
