import Social from './Social';
interface dataParams {
    type: string;
    groupAct?: string;
    groupId?: string;
    groupHash?: string;
    publicHash?: string;
    publicPid?: string;
    publicJoined?: boolean;
}
declare class Vk extends Social {
    constructor(id: string);
    init(): Promise<boolean>;
    verifyToken(): Promise<boolean>;
    toggleGroup(name: string, dataParam: dataParams, doTask?: boolean): Promise<boolean>;
    togglePublic(name: string, dataParam: dataParams, doTask?: boolean): Promise<boolean>;
    toggleWall(name: string, doTask: boolean): Promise<boolean>;
    getId(name: string): Promise<dataParams | false>;
    toggleVk({ name, doTask }: {
        name: string;
        doTask: boolean;
    }): Promise<boolean>;
    toggle({ doTask, names, nameLinks }: {
        doTask: boolean;
        names: Array<string>;
        nameLinks: Array<string>;
    }): Promise<boolean>;
}
export default Vk;
//# sourceMappingURL=Vk.d.ts.map