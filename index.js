import express from "express";
import graphqlHttp from "express-graphql";
import schema from "./schema";
const app = express();

app.get("/", (req, res) => {
  res.send("TOdo Listo");
});

// EL resolver

const root = { hola: () => "Hola desde el graphQL" };

app.use(
  "/graphql",
  graphqlHttp({
    // Que schema vamos a utilizar
    schema,
    // El resolver se pasa como rootValue
    rootValue: root,
    // utilizar graphical
    graphiql: true
  })
);

app.listen(8001, () => console.log("Escuchando en el puesto 8001"));
