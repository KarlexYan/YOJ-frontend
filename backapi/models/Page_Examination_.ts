/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Examination } from "./Examination";
import type { OrderItem } from "./OrderItem";

export type Page_Examination_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Examination>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

