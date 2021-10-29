declare class Social {
    tasks: socialTasks;
    whiteList: socialTasks;
    auth: auth;
    cache: cache;
    getRealParams(name: string, params: Array<string>, links: Array<string>, doTask: boolean, link2param: (link: string) => string): Array<string>;
}
export default Social;
//# sourceMappingURL=Social.d.ts.map