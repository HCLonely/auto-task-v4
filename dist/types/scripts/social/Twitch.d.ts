import Social from './Social';
declare class Twitch extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    verifyAuth(): Promise<boolean>;
    updateAuth(): Promise<boolean>;
    toggleChannel({ name, doTask }: {
        name: string;
        doTask: boolean;
    }): Promise<boolean>;
    getChannelId(name: string): Promise<string | boolean>;
    toggle({ doTask, channels, channelLinks }: {
        doTask: boolean;
        channels: Array<string>;
        channelLinks: Array<string>;
    }): Promise<boolean>;
}
export default Twitch;
//# sourceMappingURL=Twitch.d.ts.map