interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface Images {
    jpg: ImageUrls;
    webp: ImageUrls;
}

interface TrailerImages {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
}

interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: TrailerImages;
}

interface Title {
    type: string;
    title: string;
}

interface Aired {
    from: string; // ISO 8601 date format
    to: string;   // ISO 8601 date format
    prop: {
        from: DateProp;
        to: DateProp;
    };
    string: string;
}

interface DateProp {
    day: number;
    month: number;
    year: number;
}

interface Producer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Theme {
    openings: string[];
    endings: string[];
}

interface ExternalLink {
    name: string;
    url: string;
}

interface StreamingService {
    name: string;
    url: string;
}

interface RelationEntry {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Relation {
    relation: string;
    entry: RelationEntry[];
}

export interface Anime {
    mal_id: number;
    url: string;
    images: Images;
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
    producers: Producer[];
    licensors: Producer[];
    studios: Producer[];
    genres: Genre[];
    explicit_genres: any[];
    themes: Genre[];
    demographics: Genre[];
    relations: Relation[];
    theme: Theme;
    external: ExternalLink[];
    streaming: StreamingService[];
}