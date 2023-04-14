type Rating = {
    rate: number,
    count: number,
}

export interface IProducts {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating,

}

export interface ICartProduct {
    id: number,
    title: string,
    price: number,
    image: string,
    count: number,
}