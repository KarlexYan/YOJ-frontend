/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from "./JudgeCase";
import type { JudgeConfig } from "./JudgeConfig";

export type ExaminationQuestionUpdateRequest = {
    answer?: string;
    content?: string;
    examinationQuestionId?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    tags?: Array<string>;
    title?: string;
};

