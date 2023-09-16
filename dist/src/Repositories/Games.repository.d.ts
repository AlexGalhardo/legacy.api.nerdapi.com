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
    save(user?: any, index?: number): void;
    getById(gameId: string): Game;
    getByTitle(gameTitle: string): Game[];
    getRandom(): Game;
}
export default class GamesRepository implements GamesRepositoryPort {
    private games;
    constructor(games?: Game[]);
    save(game?: any, index?: number): void;
    getById(gameId: string): Game;
    getByTitle(gameTitle: string): Game[];
    getRandom(): Game;
}
