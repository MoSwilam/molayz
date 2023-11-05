export declare class MarketingDto {
    label: string;
    secret: string;
    urlToRedirect: string;
    startDate: string;
    expirationdate: string;
}
export declare class GetMarketingByIdAndSecret {
    id?: string;
    secret: string;
}
export declare enum MarketingStatus {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
}
