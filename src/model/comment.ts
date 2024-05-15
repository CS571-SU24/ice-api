export class Comment {
    id: number;
    comment: string;
    author: string;
    created: Date;

    public constructor(id: number, comment: string, author: string, created: Date) {
        this.id = id;
        this.comment = comment;
        this.author = author;
        this.created = created;
    }
}