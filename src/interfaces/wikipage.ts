export interface IWikiPage {
    _id: string;
    name: string;
    content: string;
    created: string;
    modified: string;
    path: string;
    version: number;
    tags: string[];
}

export interface IWikiNav {
    id: string;
    name: string;
    path: string;
    children: IWikiNav[];
    showChildren: boolean;
}