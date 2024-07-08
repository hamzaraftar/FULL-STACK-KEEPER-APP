import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "keeper",
});
db.connect();

//middleware
app.use(cors());
app.use(express.json()); //req body

// create keep
app.post("/keeps", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newKeep = await db.query(
      "INSERT INTO keep (title,content) VALUES($1, $2) RETURNING *",
      [title, content]
    );
    res.json(newKeep.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// get all keep
app.get("/keeps", async (req, res) => {
  try {
    const allKeep = await db.query("SELECT * FROM keep");
    res.json(allKeep.rows);
  } catch (err) {
    console.error(err);
  }
});

//get a keep
app.get("/keeps/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const keep = await db.query("SELECT * FROM keep WHERE keep_id = $1", [id]);
    res.json(keep.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//updata keep

app.put("/keeps/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updateKeep = db.query(
    "UPDATE keep SET title = $1, content = $2 WHERE keep_id = $3 ",
    [title, content, id]
  );
});

// delete keep
app.delete("/keeps/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteKeep = db.query("DELETE FROM keep WHERE keep_id = $1", [id]);
    res.json("Keep is Delete success fully :)");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
