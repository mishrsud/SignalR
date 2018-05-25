// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

import { AbortError, HttpError, TimeoutError } from "./Errors";
import { HttpClient, HttpRequest, HttpResponse, ResponseType } from "./HttpClient";
import { ILogger, LogLevel } from "./ILogger";

// Define DOM types we need local to this file so we don't depend on the DOM definitions and risk
// accidentally using a DOM thing other places in the code.
declare interface XMLHttpRequest {
    readonly response: any;
    readonly responseText: string;
    responseType: ResponseType;
    timeout: number;
    withCredentials: boolean;
    readonly status: number;
    readonly statusText: string;

    open(method: string, url: string, async?: boolean, user?: string | null, password?: string | null): void;
    setRequestHeader(header: string, value: string): void;
    abort(): void;
    send(data?: any): void;
    onload: ((this: XMLHttpRequest) => any) | null;
    onerror: ((this: XMLHttpRequest) => any) | null;
    ontimeout: ((this: XMLHttpRequest) => any) | null;
}

declare var XMLHttpRequest: {
    new(): XMLHttpRequest,
};

/** Default implementation of {@link HttpClient}. */
export class DefaultHttpClient extends HttpClient {
    private readonly logger: ILogger;

    /** Creates a new instance of the {@link DefaultHttpClient}, using the provided {@link ILogger} to log messages. */
    public constructor(logger: ILogger) {
        super();
        this.logger = logger;
    }

    /** @inheritDoc */
    public send(request: HttpRequest): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                reject(new AbortError());
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(request.method, request.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

            if (request.headers) {
                Object.keys(request.headers)
                    .forEach((header) => xhr.setRequestHeader(header, request.headers[header]));
            }

            if (request.responseType) {
                xhr.responseType = request.responseType;
            }

            if (request.abortSignal) {
                request.abortSignal.onabort = () => {
                    xhr.abort();
                    reject(new AbortError());
                };
            }

            if (request.timeout) {
                xhr.timeout = request.timeout;
            }

            xhr.onload = () => {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                } else {
                    reject(new HttpError(xhr.statusText, xhr.status));
                }
            };

            xhr.onerror = () => {
                this.logger.log(LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}`);
                reject(new HttpError(xhr.statusText, xhr.status));
            };

            xhr.ontimeout = () => {
                this.logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
                reject(new TimeoutError());
            };

            xhr.send(request.content || "");
        });
    }
}
