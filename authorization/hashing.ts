import crypto, { randomUUID } from "crypto";

import { SECRET_API_KEY } from "./apiKey";

export const generateApiKey: Function = randomUUID

export const hash = (value: string) => {
    const algorithm: string = "sha512";
    const secret: string = SECRET_API_KEY;
    return crypto.createHmac(algorithm, secret).update(value).digest("hex");
};

export const isHashedValueKey = (apiKey: string, hashedApiKey: string) => {
    return hashedApiKey === hash(apiKey) ? true : false
}

export const isHashedPassword = (password: string, hashedPassword: string) => {
    return hashedPassword === hash(password) ? true : false
}