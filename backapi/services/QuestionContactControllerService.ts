/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_QuestionContact_ } from "../models/BaseResponse_Page_QuestionContact_";
import type { BaseResponse_Page_QuestionContactVO_ } from "../models/BaseResponse_Page_QuestionContactVO_";
import type { BaseResponse_QuestionContact_ } from "../models/BaseResponse_QuestionContact_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { QuestionContactAddRequest } from "../models/QuestionContactAddRequest";
import type { QuestionContactQueryRequest } from "../models/QuestionContactQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionContactControllerService {
    /**
     * addQuestionContact
     * @param questionContactAddRequest questionContactAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionContactUsingPost(
        questionContactAddRequest: QuestionContactAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_contact/add',
            body: questionContactAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestionContact
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionContactUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_contact/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionById
     * @param id id
     * @returns BaseResponse_QuestionContact_ OK
     * @throws ApiError
     */
    public static getQuestionByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionContact_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_contact/get',
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
     * listQuestionContactByPage
     * @param questionContactQueryRequest questionContactQueryRequest
     * @returns BaseResponse_Page_QuestionContact_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionContactByPageUsingPost(
        questionContactQueryRequest: QuestionContactQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionContact_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_contact/list/page',
            body: questionContactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionContactVOByPage
     * @param questionContactQueryRequest questionContactQueryRequest
     * @returns BaseResponse_Page_QuestionContactVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionContactVoByPageUsingPost(
        questionContactQueryRequest: QuestionContactQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionContactVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_contact/list/page/vo',
            body: questionContactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
