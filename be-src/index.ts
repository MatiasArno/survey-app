import app from "./app";

const PORT = process.env.PORT ?? 45009;

app.listen(PORT, () => console.log('Server listening on port', PORT));
