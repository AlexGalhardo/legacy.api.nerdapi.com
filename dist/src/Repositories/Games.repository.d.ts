import { Database } from "src/Utils/Database";
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
    transformToGameResponse(game: any): Game;
    transformToGamesResponses(game: any): Game[];
    getById(gameId: string): Promise<Game>;
    getByTitle(gameTitle: string): Promise<Game[]>;
    getRandom(): Promise<Game>;
}
export default class GamesRepository implements GamesRepositoryPort {
    private games;
    private readonly database;
    constructor(games: Game[], database: Database);
    transformToGameResponse(game: any): Game;
    transformToGamesResponses(games: any): Game[];
    getById(gameId: string): Promise<Game>;
    getByTitle(gameTitle: string): Promise<Game[]>;
    getRandom(): Promise<Game>;
}
