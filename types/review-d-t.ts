export interface IReview {
    ITYPE: 'review',
    id?: number;
    comment: string;
    rating: number;
    image?: string
    user: string;
    date: Date;
}