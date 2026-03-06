
const express = require('express');
const fetch = require('node-fetch');
const app = express();

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

app.listen(3000);
