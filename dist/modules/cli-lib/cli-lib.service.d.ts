export declare class CliLibService {
    private nearService;
    private contractId;
    constructor();
    updateSpeed(dbNodes: any): Promise<any>;
    updateTraffic(dbNodes: any): Promise<any>;
    allNodes(): Promise<any>;
    getNode(nodeId: any): Promise<never>;
    activateNode(nodeIds: string[]): Promise<any>;
    deactivateNode(nodeIds: string[]): Promise<any>;
    deleteAllNodes(): Promise<void>;
    checkIfNodeExistsOnNodesArray(nodeId: string, nodesArray: any[]): Promise<any>;
    extractNodesThatExistOnSmartContractAndOnDb(smarContractNodes: any, dbNodes: any): Promise<any>;
}
