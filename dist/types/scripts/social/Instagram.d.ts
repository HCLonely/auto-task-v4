import Social from './Social';
declare class Instagram extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    getUserInfo(name?: string): Promise<string | boolean>;
    followUser(name: string): Promise<boolean>;
    unfollowUser(name: string): Promise<boolean>;
    toggle({ doTask, users, userLinks }: {
        doTask: boolean;
        users: Array<string>;
        userLinks: Array<string>;
    }): Promise<boolean>;
}
export default Instagram;
//# sourceMappingURL=Instagram.d.ts.map