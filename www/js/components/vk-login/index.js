/* global window, VK, setTimeout, document */
// https://vk.com/dev/objects/user
// @flow
import React, {Component} from 'react';
import type {Node} from 'react';

type Props = {
    apiId: number;
    fields?: string;
    callback?: Function;
    cssClass?: string;
    redirectUri?: string;
    children?: Node[]
}

export default class VkLogin extends Component<Props> {
    addScript(): Promise<void> {
        const view = this;

        if (typeof window.VK !== 'undefined') {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const scriptNode = document.createElement('script');

                scriptNode.type = 'text/javascript';
                scriptNode.src = 'https://vk.com/js/api/openapi.js?152';
                scriptNode.async = true;
                scriptNode.onload = () => resolve();
                scriptNode.onerror = () => reject();
                view.refs.transport.appendChild(scriptNode);
            }, 0);
        });
    }

    onClick(): Promise<void> {
        const view = this;
        const {props} = view;

        return getLoginStatus()
            .then(loginStatusResponse => {
                if (loginStatusResponse.session) {
                    return getUserData(loginStatusResponse.session.mid, props.fields || '');
                }

                window.location.href = view.getLoginUrl();

                return Promise.resolve(null);
            })
            .then(userDataResponse => {
                if (typeof props.callback === 'function' && userDataResponse !== null) {
                    props.callback(userDataResponse.response[0]);
                }
            });
    }

    getLoginUrl() {
        const view = this;
        const {props} = view;

        return 'https://oauth.vk.com/authorize?' +
            'client_id=' + props.apiId +
            '&scope=' + (props.fields || '0') +
            '&redirect_uri=' + (props.redirectUri || '0') +
            '&response_type=code' +
            '&v=5.73';
    }

    componentDidMount() {
        const view = this;
        const {props} = view;

        view.addScript()
            .then(() => VK.init({
                apiId: props.apiId
            }));
    }

    render() {
        const view = this;
        const {props} = view;

        return <div
            className={props.cssClass}
            onClick={() => view.onClick()}>
            {props.children}
            <div style={{display: 'none'}} ref="transport"/>
        </div>;
    }
}

// helper
function getLoginStatus() {
    return new Promise(resolve => VK.Auth.getLoginStatus(resolve));
}

function getUserData(userId, fields) {
    return new Promise(resolve => VK.Api.call( // eslint-disable-line prefer-reflect
        'users.get',
        {
            user_ids: userId, // eslint-disable-line id-match, camelcase
            fields
        },
        resolve)
    );
}
