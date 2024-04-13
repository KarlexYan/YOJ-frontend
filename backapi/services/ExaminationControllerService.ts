/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Examination_ } from "../models/BaseResponse_Examination_";
import type { BaseResponse_ExaminationVO_ } from "../models/BaseResponse_ExaminationVO_";
import type { BaseResponse_List_ExaminationQuestionVO_ } from "../models/BaseResponse_List_ExaminationQuestionVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Examination_ } from "../models/BaseResponse_Page_Examination_";
import type { BaseResponse_Page_ExaminationSubmitVO_ } from "../models/BaseResponse_Page_ExaminationSubmitVO_";
import type { BaseResponse_Page_ExaminationVO_ } from "../models/BaseResponse_Page_ExaminationVO_";
import type { BaseResponse_Question_ } from "../models/BaseResponse_Question_";
import type { BaseResponse_QuestionVO_ } from "../models/BaseResponse_QuestionVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { ExaminationAddRequest } from "../models/ExaminationAddRequest";
import type { ExaminationEditRequest } from "../models/ExaminationEditRequest";
import type { ExaminationQueryRequest } from "../models/ExaminationQueryRequest";
import type { ExaminationQuestionAddRequest } from "../models/ExaminationQuestionAddRequest";
import type { ExaminationQuestionQueryRequest } from "../models/ExaminationQuestionQueryRequest";
import type { ExaminationQuestionUpdateRequest } from "../models/ExaminationQuestionUpdateRequest";
import type { ExaminationSubmitAddRequest } from "../models/ExaminationSubmitAddRequest";
import type { ExaminationSubmitQueryRequest } from "../models/ExaminationSubmitQueryRequest";
import type { ExaminationUpdateRequest } from "../models/ExaminationUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ExaminationControllerService {
    /**
     * addExamination
     * @param examinationAddRequest examinationAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExaminationUsingPost(
        examinationAddRequest: ExaminationAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/add',
            body: examinationAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteExamination
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteExaminationUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editExamination
     * @param examinationEditRequest examinationEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editExaminationUsingPost(
        examinationEditRequest: ExaminationEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/edit',
            body: examinationEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addExaminationQuestion
     * @param examinationQuestionAddRequest examinationQuestionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExaminationQuestionUsingPost(
        examinationQuestionAddRequest: ExaminationQuestionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/examination_question/add',
            body: examinationQuestionAddRequest,
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
            url: '/api/examination/examination_question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionByExaminationQuestionId
     * @param examinationQuestionId examinationQuestionId
     * @returns BaseResponse_Question_ OK
     * @throws ApiError
     */
    public static getQuestionByExaminationQuestionIdUsingGet(
        examinationQuestionId?: number,
    ): CancelablePromise<BaseResponse_Question_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination/examination_question/get',
            query: {
                'examinationQuestionId': examinationQuestionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionVOByExaminationQuestionId
     * @param examinationQuestionId examinationQuestionId
     * @returns BaseResponse_QuestionVO_ OK
     * @throws ApiError
     */
    public static getQuestionVoByExaminationQuestionIdUsingGet(
        examinationQuestionId?: number,
    ): CancelablePromise<BaseResponse_QuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination/examination_question/get/vo',
            query: {
                'examinationQuestionId': examinationQuestionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionVOByExamination
     * @param examinationQuestionQueryRequest examinationQuestionQueryRequest
     * @returns BaseResponse_List_ExaminationQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionVoByExaminationUsingPost(
        examinationQuestionQueryRequest: ExaminationQuestionQueryRequest,
    ): CancelablePromise<BaseResponse_List_ExaminationQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/examination_question/list/vo',
            body: examinationQuestionQueryRequest,
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
            url: '/api/examination/examination_question/update',
            body: examinationQuestionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * doExaminationSubmit
     * @param examinationSubmitAddRequest examinationSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doExaminationSubmitUsingPost(
        examinationSubmitAddRequest: ExaminationSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/examination_submit/do',
            body: examinationSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationSubmitByPage
     * @param examinationSubmitQueryRequest examinationSubmitQueryRequest
     * @returns BaseResponse_Page_ExaminationSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationSubmitByPageUsingPost(
        examinationSubmitQueryRequest: ExaminationSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/examination_submit/list/page',
            body: examinationSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getExaminationById
     * @param id id
     * @returns BaseResponse_Examination_ OK
     * @throws ApiError
     */
    public static getExaminationByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_Examination_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination/get',
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
     * getExaminationVOById
     * @param id id
     * @returns BaseResponse_ExaminationVO_ OK
     * @throws ApiError
     */
    public static getExaminationVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ExaminationVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examination/get/vo',
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
     * listExaminationByPage
     * @param examinationQueryRequest examinationQueryRequest
     * @returns BaseResponse_Page_Examination_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationByPageUsingPost(
        examinationQueryRequest: ExaminationQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Examination_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/list/page',
            body: examinationQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExaminationVOByPage
     * @param examinationQueryRequest examinationQueryRequest
     * @returns BaseResponse_Page_ExaminationVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExaminationVoByPageUsingPost(
        examinationQueryRequest: ExaminationQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/list/page/vo',
            body: examinationQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyExaminationVOByPage
     * @param examinationQueryRequest examinationQueryRequest
     * @returns BaseResponse_Page_ExaminationVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyExaminationVoByPageUsingPost(
        examinationQueryRequest: ExaminationQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExaminationVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/my/list/page/vo',
            body: examinationQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateExamination
     * @param examinationUpdateRequest examinationUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateExaminationUsingPost(
        examinationUpdateRequest: ExaminationUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examination/update',
            body: examinationUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
