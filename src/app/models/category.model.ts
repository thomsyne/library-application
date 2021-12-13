export interface CategoryModel {
    name: string,
    isFavorite: boolean
}

export interface CategoryListModel extends CategoryModel {
    createdAt: Date,
    name: string,
    id: string,
    dropdownOpen?: boolean
}