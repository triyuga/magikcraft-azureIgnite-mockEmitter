# magikcraft-azureIgnite-mockEmitter
Mock Emmitter for testing Chris Briggsy's Magikcraft Stats Azure thing: https://github.com/jwulf/AzureIgnite

Run mock server (local substitute for Azure logger) with:

`$ gulp`

It will spin up at `localhost:8666`. See `server.js` for available routes. 

Basically it can: 
- Log events from mockEmitter via `localhost:8666/eat` 
- Output full store via `localhost:8666/store` 
- Output crunched stats via `localhost:8666/stats` (this is what ZombieScoreboard consumes). 

Run MockEmitter by visiting `index.html` in your browser. Settings and usage should be 
self explainatory.

Production event Logger at `https://magikcraftstatstracking.azurewebsites.net/api/MagikcraftStatsInput` via POST
