/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactVO } from "./ContactVO";
import type { OrderItem } from "./OrderItem";

export type Page_ContactVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ContactVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

