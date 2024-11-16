export interface GameDetails {
    id: string;
    title: string;
    thumbnail: string;
    status: string;
    shortDescription: string;
    description: string;
    gameUrl: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    releaseDate: string;
    freetogameProfileUrl: string;
    minimumSystemRequirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    screenshots: [{
        id: string;
        image: string;
    }];
}