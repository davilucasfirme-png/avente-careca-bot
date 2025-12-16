const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function gerarAnuncio(produto, publico, objetivo, idioma = "pt") {

  const idiomas = {
    pt: `
Crie um anúncio persuasivo em Português (Brasil):
`,
    en: `
Create a persuasive marketing ad in English:
`,
    es: `
Crea un anuncio persuasivo en Español:
`
  };

  const prompt = `
${idiomas[idioma]}
Product: ${produto}
Target audience: ${publico}
Objective: ${objetivo}

Use emojis and a strong call to action.
Short text for social media.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return response.choices[0].message.content;
}

module.exports = { gerarAnuncio };
