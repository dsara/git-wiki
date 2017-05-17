export interface IWikiUser {
    email: string,
    name: string,
    password: string,
    hash: string,
    salt: string,
    setPassword(password: string): void,
    validPassword(password: string): void,
    generateJwt(): void
}