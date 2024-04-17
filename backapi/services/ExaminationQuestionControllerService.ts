/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_ExaminationQuestion_ } from "../models/BaseResponse_ExaminationQuestion_";
import type { BaseResponse_ExaminationQuestionVO_ } from "../models/BaseResponse_ExaminationQuestionVO_";
import type { BaseResponse_List_ExaminationQuestionVO_ } from "../models/BaseResponse_List_ExaminationQuestionVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_ExaminationQuestion_ } from "../models/BaseResponse_Page_ExaminationQuestion_";
import type { BaseResponse_Page_ExaminationQuestionVO_ } from "../models/BaseResponse_Page_ExaminationQuestionVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { ExaminationQuestionAddRequest } from "../models/ExaminationQuestionAddRequest";
import type { ExaminationQuestionEditRequest } from "../models/ExaminationQuestionEditRequest";
import type { ExaminationQuestionListQueryRequest } from "../models/ExaminationQuestionListQueryRequest";
import type { ExaminationQuestionQueryRequest } from "../models/ExaminationQuestionQueryRequest";
import type { ExaminationQuestionUpdateRequest } from "../models/ExaminationQuestionUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ExaminationQuestionControllerService {
    /**
     * addExaminationQuestion
     * @param examinationAddRequest examinationAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExaminationQuestionUsingPost(
        examinationAddRequest: ExaminationQuestionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/add',
            body: examinationAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteExaminationQuestion
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteExaminationQuestionUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editExaminationQuestion
     * @param examinationQuestionEditRequest examinationQuestionEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editExaminationQuestionUsingPost(
        examinationQuestionEditRequest: ExaminationQuestionEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/edit',
            body: examinationQuestionEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getExaminationQuestionById
     * @param id id
     * @returns BaseResponse_ExaminationQuestion_ OK
     * @throws ApiError
     */
    public static getExaminationQuestionByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ExaminationQuestion_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination_question/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getExaminationQuestionVOById
     * @param id id
     * @returns BaseResponse_ExaminationQuestionVO_ OK
     * @throws ApiError
     */
    public static getExaminationQuestionVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ExaminationQuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination_question/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationQuestionByPage
     * @param examinationQuestionQueryRequest examinationQuestionQueryRequest
     * @returns BaseResponse_Page_ExaminationQuestion_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationQuestionByPageUsingPost(
        examinationQuestionQueryRequest: ExaminationQuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationQuestion_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/list/page',
            body: examinationQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationQuestionVOByPage
     * @param examinationQuestionQueryRequest examinationQuestionQueryRequest
     * @returns BaseResponse_Page_ExaminationQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationQuestionVoByPageUsingPost(
        examinationQuestionQueryRequest: ExaminationQuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/list/page/vo',
            body: examinationQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationQuestionVOByExamination
     * @param examinationQuestionListQueryRequest examinationQuestionListQueryRequest
     * @returns BaseResponse_List_ExaminationQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationQuestionVoByExaminationUsingPost(
        examinationQuestionListQueryRequest: ExaminationQuestionListQueryRequest,
    ): CancelablePromise<BaseResponse_List_ExaminationQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/list/vo',
            body: examinationQuestionListQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateExaminationQuestion
     * @param examinationQuestionUpdateRequest examinationQuestionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateExaminationQuestionUsingPost(
        examinationQuestionUpdateRequest: ExaminationQuestionUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination_question/update',
            body: examinationQuestionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
