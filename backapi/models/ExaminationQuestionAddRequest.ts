/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from "./JudgeCase";
import type { JudgeConfig } from "./JudgeConfig";

export type ExaminationQuestionAddRequest = {
    answer?: string;
    content?: string;
    examinationId?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    tags?: Array<string>;
    title?: string;
};

