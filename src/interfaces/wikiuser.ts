export interface IWikiUser {
    _id: string,
    email: string,
    name: string,
    password: string,
    hash: string,
    salt: string,
    setPassword(password: string): string,
    validPassword(password: string): boolean,
    generateJwt(): void
}