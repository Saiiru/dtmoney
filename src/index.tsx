import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import App from "./App";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "freelancer de website",
          type: "deposit",
          amount: 6000,
          category: "trabalho",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "aluguel",
          type: "withdraw",
          amount: 400,
          category: "casa",

          createdAt: new Date(),
        }, {
          id: 3,
          title: "Ração do rex",
          type: "withdraw",
          amount: 200,
          category: "pet",
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
