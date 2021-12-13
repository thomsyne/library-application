export interface BookListModel {
    createdAt: Date,
    name: string,
    isFavorite: boolean,
    id: string,
    dropdownOpen?: boolean;
}

export interface BookModel {
    name: string;
    isFavorite: boolean
}