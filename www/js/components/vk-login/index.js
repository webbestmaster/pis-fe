/* global window, VK, setTimeout, document, HTMLDivElement, location */
// https://vk.com/dev/objects/user
// @flow
import React, {Component} from 'react';
import type {Node} from 'react';

const apiVersion = '5.73';

type PropsType = {
    apiId: number;
    fields?: string;
    callback?: (response: { [key: string]: string }) => void;
    cssClass?: string;
    redirectUri?: string;
    children?: Node[]
};

type RefsType = {
    transport: HTMLDivElement
};

type LoginStatusResponseType = {
    session: { mid: string }
};

type UserDataResponseType = {
    response: [{ [key: string]: string }]
};

const sdkScriptClassName = 'sdk-vk-script';

export default class VkLogin extends Component<PropsType> {
    refs: RefsType;

    addScript(): Promise<void> {
        const view = this;

        if (document.querySelector('.' + sdkScriptClassName)) {
            return Promise.resolve();
        }

        return new Promise((resolve: () => void, reject: () => void) => {
            setTimeout(() => {
                const scriptNode = document.createElement('script');

                scriptNode.className = sdkScriptClassName;
                scriptNode.type = 'text/javascript';
                scriptNode.src = 'https://vk.com/js/api/openapi.js?152';
                scriptNode.async = true;
                scriptNode.onload = (): void => resolve();
                scriptNode.onerror = (): void => reject();
                view.refs.transport.appendChild(scriptNode);
            }, 0);
        });
    }

    onClick(): Promise<void> {
        const view = this;
        const {props} = view;

        return getLoginStatus()
            .then((loginStatusResponse: LoginStatusResponseType): Promise<void> => {
                if (!loginStatusResponse.session) {
                    location.href = view.getLoginUrl();

                    return Promise.resolve();
                }

                return getUserData(loginStatusResponse.session.mid, props.fields || '')
                    .then((userDataResponse: UserDataResponseType) => {
                        if (typeof props.callback === 'function' && userDataResponse !== null) {
                            props.callback(userDataResponse.response[0]);
                        }
                    });
            });
    }

    getLoginUrl(): string {
        const view = this;
        const {props} = view;

        return 'https://oauth.vk.com/authorize?' +
            'client_id=' + props.apiId +
            '&scope=' + (props.fields || '0') +
            '&redirect_uri=' + (props.redirectUri || '0') +
            '&response_type=code' +
            '&v=' + apiVersion;
    }

    componentDidMount() {
        const view = this;
        const {props} = view;

        view.addScript()
            .then((): void => VK.init({
                apiId: props.apiId
            }));
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return <div
            className={props.cssClass}
            onClick={(): Promise<void> => view.onClick()}>
            {props.children}
            <div style={{display: 'none'}} ref="transport"/>
        </div>;
    }
}

// helper
function getLoginStatus(): Promise<LoginStatusResponseType> {
    return new Promise((resolve: (response: LoginStatusResponseType) => void): void => VK.Auth.getLoginStatus(resolve));
}

function getUserData(userId: string, fields: string): Promise<UserDataResponseType> {
    return new Promise((resolve: (response: UserDataResponseType) => void): void => VK.Api.call( // eslint-disable-line prefer-reflect
        'users.get',
        {
            user_ids: userId, // eslint-disable-line id-match, camelcase
            fields,
            v: apiVersion // eslint-disable-line id-length
        },
        resolve)
    );
}
