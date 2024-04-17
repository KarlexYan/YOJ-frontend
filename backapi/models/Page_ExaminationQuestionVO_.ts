/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExaminationQuestionVO } from "./ExaminationQuestionVO";
import type { OrderItem } from "./OrderItem";

export type Page_ExaminationQuestionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ExaminationQuestionVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

