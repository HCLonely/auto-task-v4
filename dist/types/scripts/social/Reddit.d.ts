import Social from './Social';
declare class Reddit extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    updateToken(): Promise<boolean>;
    toggleTask({ name, doTask }: {
        name: string;
        doTask: boolean;
    }): Promise<boolean>;
    toggle({ doTask, reddits, redditLinks }: {
        doTask: boolean;
        reddits: Array<string>;
        redditLinks: Array<string>;
    }): Promise<boolean>;
}
export default Reddit;
//# sourceMappingURL=Reddit.d.ts.map