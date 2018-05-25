// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

// Contains pieces of interfaces copied out of lib.dom.d.ts. We only put what we need here so that implementators
// aren't forced to implement literally everything WebSocket and EventSource can do (including obscure parameters
// on events that are always undefined, for example).

// Not exported from index

export interface IPolyfills {
    WebSocket?: WebSocketConstructor;
    EventSource?: EventSourceConstructor;
}

// tslint:disable-next-line:no-empty-interface
export interface Event {
}

export interface ErrorEvent extends Event {
    message: string;
    error: any;
}

export interface CloseEvent extends Event {
    code?: number;
    reason?: string;
    wasClean?: boolean;
}

export interface MessageEvent extends Event {
    data: any;
}

export interface WebSocket {
    binaryType: "blob" | "arraybuffer";
    onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
    onerror: ((this: WebSocket, ev: Event) => any) | null;
    onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
    onopen: ((this: WebSocket, ev: Event) => any) | null;
    readonly readyState: number;
    send(data: string | ArrayBufferLike | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
}

export interface WebSocketConstructor {
    new(url?: string, protocols?: string | string[]): WebSocket;

    // Static properties defined on WebSocket
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
}

interface EventSourceInit {
    readonly withCredentials: boolean;
}

export interface EventSource {
    onerror: (evt: ErrorEvent) => any;
    onmessage: (evt: MessageEvent) => any;
    onopen: () => any;
    close(): void;
}

export interface EventSourceConstructor {
    new(url: string, eventSourceInitDict?: EventSourceInit): EventSource;
}
