import Social from './Social';
declare class Twitter extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    updateToken(): Promise<boolean>;
    toggleUser({ name, doTask }: {
        name: string;
        doTask: boolean;
    }): Promise<boolean>;
    getUserId(name: string): Promise<string | boolean>;
    toggleRetweet({ retweetId, doTask }: {
        retweetId: string;
        doTask: boolean;
    }): Promise<boolean>;
    toggle({ doTask, users, userLinks, retweets, retweetLinks }: {
        doTask: boolean;
        users: Array<string>;
        userLinks: Array<string>;
        retweets: Array<string>;
        retweetLinks: Array<string>;
    }): Promise<boolean>;
}
export default Twitter;
//# sourceMappingURL=Twitter.d.ts.map