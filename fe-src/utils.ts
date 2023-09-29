interface ClientData {
	name: string;
	email: string;
	cellphone: string;
    company: string;
    interests: string[];
    channels: string[];
    text: string;
}

async function sendDataToDatabase(data: ClientData) {
    const response = await fetch(`/api/clients`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response;
}

export { sendDataToDatabase };
