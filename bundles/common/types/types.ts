export interface NavItem {
	name: string;
	route: string
}

export interface Styles {
	readonly [key: string]: string;
}

export interface AnimeData {
	title: string;
	mal_id: number;
	image_url: string;
	synopsis: string;
	score: number;
	members: number;
	start_date: string;
	[propData: string]: any
}
