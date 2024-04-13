/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Contact_ } from "../models/BaseResponse_Contact_";
import type { BaseResponse_ContactVO_ } from "../models/BaseResponse_ContactVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Contact_ } from "../models/BaseResponse_Page_Contact_";
import type { BaseResponse_Page_ContactVO_ } from "../models/BaseResponse_Page_ContactVO_";
import type { ContactAddRequest } from "../models/ContactAddRequest";
import type { ContactQueryRequest } from "../models/ContactQueryRequest";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ContactControllerService {
    /**
     * addContact
     * @param contactAddRequest contactAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addContactUsingPost(
        contactAddRequest: ContactAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/add',
            body: contactAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelStar
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelStarUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/cancelStar',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelThumb
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelThumbUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/cancelThumb',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteContact
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteContactUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getContactById
     * @param id id
     * @returns BaseResponse_Contact_ OK
     * @throws ApiError
     */
    public static getContactByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_Contact_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contact/get',
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
     * getContactVOById
     * @param id id
     * @returns BaseResponse_ContactVO_ OK
     * @throws ApiError
     */
    public static getContactVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ContactVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contact/get/vo',
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
     * listContactByPage
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_Page_Contact_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContactByPageUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Contact_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/list/page',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listContactVOByPage
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_Page_ContactVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContactVoByPageUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ContactVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/list/page/vo',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addStar
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addStarUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/star',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addThumb
     * @param contactQueryRequest contactQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addThumbUsingPost(
        contactQueryRequest: ContactQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/thumb',
            body: contactQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
