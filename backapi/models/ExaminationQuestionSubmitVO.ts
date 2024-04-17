/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExaminationQuestionVO } from "./ExaminationQuestionVO";
import type { JudgeInfo } from "./JudgeInfo";
import type { UserVO } from "./UserVO";

export type ExaminationQuestionSubmitVO = {
    createTime?: string;
    examinationQuestionId?: number;
    examinationQuestionVO?: ExaminationQuestionVO;
    id?: number;
    judgeInfo?: JudgeInfo;
    submitCode?: string;
    submitLanguage?: string;
    submitState?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

