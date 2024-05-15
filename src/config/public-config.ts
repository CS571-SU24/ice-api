import { CS571DefaultPublicConfig } from "@cs571/su24-api-framework";

export default interface CS571IcePublicConfig extends CS571DefaultPublicConfig {
    IS_REMOTELY_HOSTED: boolean;
    PASSWORDS_LOC: string;
    COOKIE_DOMAIN: string;
}