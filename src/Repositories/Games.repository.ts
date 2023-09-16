import * as stringSimilarity from "string-similarity";
import * as gamesDatabase from "./Jsons/games.json";
import { Injectable } from "@nestjs/common";
import { Database } from "src/Utils/Database";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";

export interface PlatformAvailable {
    id: string;
    name: string;
}

export interface Developer {
    id: string;
    name: string;
}

export interface Publisher {
    id: string;
    name: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface WhereToBuy {
    id: string;
    name: string;
    url: string;
}

export interface Game {
    id: string;
    title: string;
    cover_image: string;
    summary: string;
    release: {
        year: number;
        date: string;
    };
    igdb: {
        url: string | null;
        rating: number | null;
    };
    metacritic: {
        url: string | null;
        rating: number | null;
    };
    where_to_buy: WhereToBuy[];
    developer: Developer;
    publisher: Publisher;
    platforms_available: PlatformAvailable[];
    genres: Genre[];
    how_long_to_beat?: {
        url: string | null;
        main_story: {
            average: string | null;
        };
        completionist: {
            average: string | null;
        };
    };
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

export interface GamesRepositoryPort {
	transformToGameResponse(game): Game
	transformToGamesResponses(game): Game[]
    getById(gameId: string): Promise<Game>;
    getByTitle(gameTitle: string): Promise<Game[]>;
    getRandom(): Promise<Game>;
}

@Injectable()
export default class GamesRepository implements GamesRepositoryPort {
    constructor(private games: Game[] = gamesDatabase, private readonly database: Database) {}

	public transformToGameResponse(game): Game {
		return {
			id: game.id,
			title: game.title,
			cover_image: game.cover_image,
			summary: game.summary,
			release: {
				year: game.release_year,
				date: game.release_date
			},
			igdb: {
				url: game.igdb_url,
				rating: game.igdb_rating,
			},
			metacritic: {
				url: game.metacritic_url,
				rating: game.metacritic_rating,
			},
			where_to_buy: JSON.parse(game.where_to_buy),
			developer: {
				id: game.developer_id,
				name: game.developer_name
			},
			publisher: {
				id: game.publisher_id,
				name: game.publisher_name
			},
			platforms_available: JSON.parse(game.platforms_available),
			genres: JSON.parse(game.genres),
			how_long_to_beat: JSON.parse(game.how_long_to_beat),
			created_at: game.created_at,
			updated_at: game.updated_at,
			created_at_pt_br: game.created_at_pt_br,
			updated_at_pt_br: game.updated_at_pt_br
        };
	}

	public transformToGamesResponses(games): Game[] {
		return games.map((game) => {
			return {
				id: game.id,
				title: game.title,
				cover_image: game.cover_image,
				summary: game.summary,
				release: {
					year: game.release_year,
					date: game.release_date
				},
				igdb: {
					url: game.igdb_url,
					rating: game.igdb_rating,
				},
				metacritic: {
					url: game.metacritic_url,
					rating: game.metacritic_rating,
				},
				where_to_buy: JSON.parse(game.where_to_buy),
				developer: {
					id: game.developer_id,
					name: game.developer_name
				},
				publisher: {
					id: game.publisher_id,
					name: game.publisher_name
				},
				platforms_available: JSON.parse(game.platforms_available),
				genres: JSON.parse(game.genres),
				how_long_to_beat: JSON.parse(game.how_long_to_beat),
				created_at: game.created_at,
				updated_at: game.updated_at,
				created_at_pt_br: game.created_at_pt_br,
				updated_at_pt_br: game.updated_at_pt_br
			}
        })
	}

    public async getById(gameId: string): Promise<Game> {
		if (process.env.USE_DATABASE_JSON === "true"){
			return this.games.filter((game: Game) => game.id === gameId)[0];
		}

		const game = await this.database.games.findUnique({
            where: {
                id: gameId,
            },
        });

        if (game) return this.transformToGameResponse(game)

        throw new Error(ErrorsMessages.GAME_NOT_FOUND);
    }

    public async getByTitle(gameTitle: string): Promise<Game[]> {
		if (process.env.USE_DATABASE_JSON === "true"){
			const gamesFound = this.games.filter((game: Game) =>
				game.title.toLowerCase().includes(gameTitle.toLowerCase()),
			);

			const matches = stringSimilarity.findBestMatch(
				gameTitle,
				this.games.map((game) => game.title),
			);

			matches.ratings.forEach((similarity) => {
				if (similarity.rating >= 0.5) {
					if (!gamesFound.some((game) => game.title.toLowerCase() === similarity.target.toLowerCase())) {
						gamesFound.push(this.games.filter((game) => game.title === similarity.target)[0]);
					}
				}
			});

			return gamesFound;
		}

		const allGames = await this.database.games.findMany()

		const gamesFound = await this.database.games.findMany({
			where: {
				title: {
					contains: gameTitle,
					mode: 'insensitive', // default
				}
			}
		})

		const matches = stringSimilarity.findBestMatch(
			gameTitle,
			allGames.map((game) => game.title),
		);

		matches.ratings.forEach((similarity) => {
			if (similarity.rating >= 0.5) {
				if (!gamesFound.some((game) => game.title.toLowerCase() === similarity.target.toLowerCase())) {
					gamesFound.push(allGames.filter((game) => game.title === similarity.target)[0]);
				}
			}
		});

		return this.transformToGamesResponses(gamesFound);
    }

    public async getRandom(): Promise<Game> {
		if (process.env.USE_DATABASE_JSON === "true"){
        	return this.games[Math.floor(Math.random() * this.games.length)];
		}

		const games = this.transformToGamesResponses(await this.database.games.findMany())
		return games[Math.floor(Math.random() * games.length)];
    }
}
