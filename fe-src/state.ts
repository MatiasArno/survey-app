export type Interests = string | undefined;
export type Channels = 'Facebook' | 'Instagram' | 'Email' | 'Otros' | undefined;

interface StateData {
	name: string;
	email: string;
	cellphone: string;
	company: string;
	interests: Interests[];
	channels: Channels[];
}

const state = {
	data: {} as StateData,

	listeners: [] as any[],

	getState() {
		return this.data;
	},

	setState(newState: Object) {
		this.data = newState as any;
		for (const cb of this.listeners) {
			cb();
		}
	},

	subscribe(callback: (any: any) => any) {
		this.listeners.push(callback);
	},
};

export default state;
