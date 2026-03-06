const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Proxy Roblox opérationnel !' });
});

app.get('/gamepasses/:universeId', async (req, res) => {
    const { universeId } = req.params;
    const cursor = req.query.cursor || "";
    
    let url = `https://games.roblox.com/v1/games/${universeId}/game-passes?limit=100&sortOrder=Asc`;
    if (cursor) url += `&cursor=${cursor}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/universes/:placeId', async (req, res) => {
    const { placeId } = req.params;
    try {
        const response = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
        const data = await response.json();
        res.json(data);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/debug/:universeId', async (req, res) => {
    const { universeId } = req.params;
    
    const urls = [
        `https://games.roblox.com/v1/games/${universeId}/game-passes?limit=100&sortOrder=Asc`,
        `https://games.roblox.com/v2/games/${universeId}/game-passes?limit=100&sortOrder=Asc`,
    ]
    
    const results = {}
    
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            results[url] = { status: response.status, body: text }
        } catch(e) {
            results[url] = { error: e.message }
        }
    }
    
    res.json(results)
});

app.listen(3000, () => {
    console.log('Proxy démarré sur le port 3000');
});
