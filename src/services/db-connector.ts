
import { DataTypes, Sequelize, ModelStatic } from "sequelize";
import { CS571Config } from "@cs571/su24-api-framework";

import CS571IcePublicConfig from "../config/public-config";
import CS571IceSecretConfig from "../config/secret-config";
import { Comment } from "../model/comment";

export class CS571IceDbConnector {

    private badgerCommentsTable!: ModelStatic<any>;

    private readonly sequelize: Sequelize
    private readonly config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>;

    public constructor(config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>) {
        this.config = config;
        this.sequelize = new Sequelize(
            this.config.SECRET_CONFIG.SQL_CONN_DB,
            this.config.SECRET_CONFIG.SQL_CONN_USER,
            this.config.SECRET_CONFIG.SQL_CONN_PASS,
            {
                host: this.config.SECRET_CONFIG.SQL_CONN_ADDR,
                port: this.config.SECRET_CONFIG.SQL_CONN_PORT,
                dialect: 'mysql',
                retry: {
                    max: Infinity,
                    backoffBase: 5000
                }
            }
        );
    }

    public async init() {
        await this.sequelize.authenticate();
        await this.sequelize.sync()
        this.badgerCommentsTable = await this.sequelize.define("BadgerComment", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            badger_id: {
                type: DataTypes.STRING(68), // bid_ + 64 chars
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING(512),
                allowNull: false
            },
            created: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
        await this.sequelize.sync()
    }

    public async createComment(comm: string, author: string, bid: string): Promise<Comment> {
        const creation = await this.badgerCommentsTable.create({
            comment: comm,
            author: author,
            badger_id: bid,
            created: new Date()
        });

        return new Comment(creation.id, creation.comment, creation.author, creation.created);
    }

    public async getComments(): Promise<Comment[]> {
        const tabMsgs = await this.badgerCommentsTable.findAll({
            limit: 50,
            order: [['created', 'DESC']]
        });
        return tabMsgs.map(c => new Comment(c.id, c.comment, c.author, c.created))
    }
}