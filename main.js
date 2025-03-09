const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const con = new Client({
	host: "localhost",
	user: "postgres",
	port: 5433,
	password: "ilu>c8cs",
	database: "test",
});

con
	.connect()
	.then(() => console.log("Database connected"))
	.catch((err) => console.error("Database connection error", err));

app.post("/post", (req, res) => {
	const { name, id } = req.body;

	const insert_query = "INSERT INTO test (name, id) VALUES ($1, $2)";

	con.query(insert_query, [name, id], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send("Error inserting data");
		} else {
			console.log(result); // You can log more specific result information
			res.status(200).send("POSTED");
		}
	});
});

app.get("/fetch", (req, res) => {
	const query = " SELECT * FROM test";

	con.query(query, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			console.log(result.rows);
			res.send(result.rows);
		}
	});
});

app.get("/fetch/:id", (req, res) => {
	const id = req.params.id;
	const query = " SELECT * FROM test WHERE id = $1";

	con.query(query, [id], (err, result) => {
		if (err) {
			res.send(err);
		} else {
			console.log(result.rows);
			res.send(result.rows);
		}
	});
});

app.put("/update/:id", (req, res) => {
	const id = req.params.id;
	const name = req.body;

	const update = "UPDATE test SET name= $1 WHERE id = $2";

	con.query(update, [name, id], (err, result) => {
		if (err) res.send(err);
		else res.send("result");
	});
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;

	const delete_query = "DELETE FROM test WHERE id=$1";

	con.query(delete_query, [id], (err, result) => {
		if (err) res.send(err);
		else res.send(result);
	});
});

app.listen(2000, () => {
	console.log("Server is running on port 2000");
});
