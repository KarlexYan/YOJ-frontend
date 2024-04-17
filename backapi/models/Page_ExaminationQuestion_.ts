/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExaminationQuestion } from "./ExaminationQuestion";
import type { OrderItem } from "./OrderItem";

export type Page_ExaminationQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ExaminationQuestion>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

