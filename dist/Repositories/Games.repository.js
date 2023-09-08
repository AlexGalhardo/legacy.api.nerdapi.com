"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringSimilarity = require("string-similarity");
const fs = require("fs");
const gamesDatabase = require("./Jsons/games.json");
class GamesRepository {
    constructor(games = gamesDatabase) {
        this.games = games;
    }
    save(game, index) {
        try {
            if (game && index) {
                this.games.splice(index, 1, game);
            }
            fs.writeFileSync("./src/Repositories/Jsons/games.json", JSON.stringify(this.games, null, 4), "utf-8");
            this.games = JSON.parse(fs.readFileSync("./src/Repositories/Jsons/games.json", "utf-8"));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    getById(gameId) {
        return this.games.filter((game) => game.id === gameId)[0];
    }
    getByTitle(gameTitle) {
        const gamesFound = this.games.filter((game) => game.title.toLowerCase().includes(gameTitle.toLowerCase()));
        const matches = stringSimilarity.findBestMatch(gameTitle, this.games.map((game) => game.title));
        matches.ratings.forEach((similarity) => {
            if (similarity.rating >= 0.5) {
                if (!gamesFound.some((game) => game.title.toLowerCase() === similarity.target.toLowerCase())) {
                    gamesFound.push(this.games.filter((game) => game.title === similarity.target)[0]);
                }
            }
        });
        return gamesFound;
    }
    getRandom() {
        return this.games[Math.floor(Math.random() * this.games.length)];
    }
}
exports.default = GamesRepository;
//# sourceMappingURL=Games.repository.js.map