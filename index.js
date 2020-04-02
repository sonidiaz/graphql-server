import express from "express";
import graphqlHttp from "express-graphql";
import {schema} from "./data/schema";
const app = express();

app.get("/", (req, res) => {
  res.send("TOdo Listo");
});

app.use(
  "/graphql",
  graphqlHttp({
    // Que schema vamos a utilizar
    schema,
    // utilizar graphical
    graphiql: true
  })
);

app.listen(8001, () => console.log("Escuchando en el puesto 8001"));
