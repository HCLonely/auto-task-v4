/// <reference types="jquery" />
interface logStatus {
    font?: JQuery;
    success: (text?: string, html?: boolean) => logStatus;
    error: (text?: string, html?: boolean) => logStatus;
    warning: (text?: string, html?: boolean) => logStatus;
    info: (text?: string, html?: boolean) => logStatus;
    view: (text?: string, html?: boolean) => logStatus;
}
declare function echoLog({ type, text, url, id }: {
    type?: string;
    text?: string;
    url?: string;
    id?: string;
}): logStatus;
export default echoLog;
//# sourceMappingURL=echoLog.d.ts.map