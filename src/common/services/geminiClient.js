const { GoogleGenerativeAI } = require('@google/generative-ai');

function createGeminiGenerativeClient(apiKey) {
    return new GoogleGenerativeAI(apiKey);
}

function getGeminiGenerativeModel(client, model = 'gemini-pro') {
    const genModel = client.getGenerativeModel({ model });
    return {
        generateContent: async (parts, config = {}) => {
            const textParts = parts.map(p => {
                if (typeof p === 'string') return { text: p };
                if (p.inlineData) return { inlineData: p.inlineData };
                return p;
            });
            const req = {
                contents: [{ role: 'user', parts: textParts }],
                ...config,
            };
            const response = await genModel.generateContent(req);
            return response;
        },
        generateContentStream: async (parts, config = {}) => {
            const textParts = parts.map(p => {
                if (typeof p === 'string') return { text: p };
                if (p.inlineData) return { inlineData: p.inlineData };
                return p;
            });
            const req = {
                contents: [{ role: 'user', parts: textParts }],
                ...config,
            };
            return genModel.generateContentStream(req);
        },
    };
}

module.exports = {
    createGeminiGenerativeClient,
    getGeminiGenerativeModel,
};
