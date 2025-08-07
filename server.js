// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// TOKEN DE WHATSAPP CLOUD API (Meta)
const WHATSAPP_TOKEN = "EAAVba2q9misBPNS2bMyoqI14Ce4jvJc2X0nEIEXy0WiZA4jphR0BQAG4uC7EMKOFW4HZCpSLiqw6ZAGWsxMyelBguLLVjJXJ9jz5fJT7BdM79SFQDsj0m1YmneLkc1wR1yjMgQB75vxd0jUzLk1kvR97rSdBnp9YiKz6D3P05H4uOyyEiyWUgrzre6HwzmuMMMWtdmVJCzwLrFILmz3JGICZCmH5ERHSWZBQZCbtNC";
const PHONE_NUMBER_ID = "726599333872007";

// Endpoint para enviar plantilla
app.post("/api/send-template", async (req, res) => {
  try {
    const { phone, template, language, params } = req.body;

    const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: template,
          language: { code: language },
          components: params.length
            ? [{ type: "body", parameters: params.map(p => ({ type: "text", text: p })) }]
            : []
        }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
