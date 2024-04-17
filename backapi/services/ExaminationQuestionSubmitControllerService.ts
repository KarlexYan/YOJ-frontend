/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type {
  BaseResponse_Page_ExaminationQuestionSubmitVO_
} from "../models/BaseResponse_Page_ExaminationQuestionSubmitVO_";
import type { ExaminationQuestionSubmitQueryRequest } from "../models/ExaminationQuestionSubmitQueryRequest";
import type { ExaminationSubmitAddRequest } from "../models/ExaminationSubmitAddRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ExaminationQuestionSubmitControllerService {
    /**
     * doExaminationQuestionSubmit
     * @param examinationSubmitAddRequest examinationSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doExaminationQuestionSubmitUsingPost(
        examinationSubmitAddRequest: ExaminationSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question_submit/do',
            body: examinationSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationQuestionSubmitByPage
     * @param examinationQuestionSubmitQueryRequest examinationQuestionSubmitQueryRequest
     * @returns BaseResponse_Page_ExaminationQuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationQuestionSubmitByPageUsingPost(
        examinationQuestionSubmitQueryRequest: ExaminationQuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationQuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question_submit/list/page',
            body: examinationQuestionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
