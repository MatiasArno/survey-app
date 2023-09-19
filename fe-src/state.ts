export type Interests = "MiR" | "UR" | "COGNEX" | "EXOR" | "INDUSTRIA 4.0";

interface StateData {
	name: string;
	email: string;
	cellphone: string;
	company: string;
	interests: Interests[];
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
