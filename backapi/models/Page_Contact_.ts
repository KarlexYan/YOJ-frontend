/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Contact } from "./Contact";
import type { OrderItem } from "./OrderItem";

export type Page_Contact_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Contact>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

