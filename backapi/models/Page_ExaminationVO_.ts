/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExaminationVO } from "./ExaminationVO";
import type { OrderItem } from "./OrderItem";

export type Page_ExaminationVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ExaminationVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

