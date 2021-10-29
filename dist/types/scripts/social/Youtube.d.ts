import Social from './Social';
interface youtubeInfo {
    params?: {
        apiKey: string;
        client: {
            visitorData: string;
        };
        request: {
            sessionId: string;
        };
        videoId?: string;
        likeParams?: string;
        channelId?: string;
    };
    needLogin?: boolean;
}
declare class Youtube extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    getInfo(link: string, type: string): Promise<youtubeInfo>;
    getToken(notice: boolean): void;
    toggleChannel({ link, doTask }: {
        link: string;
        doTask: boolean;
    }): Promise<boolean>;
    toggleLikeVideo({ link, doTask }: {
        link: string;
        doTask: boolean;
    }): Promise<boolean>;
    toggle({ doTask, channelLinks, videoLinks }: {
        doTask: boolean;
        channelLinks: Array<string>;
        videoLinks: Array<string>;
    }): Promise<boolean>;
}
export default Youtube;
//# sourceMappingURL=Youtube.d.ts.map