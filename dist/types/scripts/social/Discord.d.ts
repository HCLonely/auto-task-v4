import Social from './Social';
declare class Discord extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    verifyAuth(): Promise<boolean>;
    updateAuth(): Promise<unknown>;
    joinServer(inviteId: string): Promise<boolean>;
    leaveServer(inviteId: string): Promise<boolean>;
    getGuild(inviteId: string): Promise<boolean | string>;
    toggleServers({ doTask, servers, serverLinks }: {
        doTask: boolean;
        servers: Array<string>;
        serverLinks: Array<string>;
    }): Promise<boolean>;
    addId(inviteId: string, guild: string): void;
    getId(inviteId: string): string;
}
export default Discord;
//# sourceMappingURL=Discord.d.ts.map