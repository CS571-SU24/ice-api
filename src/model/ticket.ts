import crypto from 'crypto'

export class Ticket {
    id: string;
    name: string;
    description: string;
    author: string;
    daysOld: number;
    priority: string;

    public constructor(name: string, description: string, author: string, daysOld: number, priority: string) {
        this.id = crypto.createHash('sha256').update(name + description + author + new Date().getTime().toString()).digest('hex').substring(0, 48)
        this.name = name;
        this.description = description;
        this.author = author;
        this.daysOld = daysOld;
        this.priority = priority;
    }
}