// @flow
import React, {Component} from 'react';

declare module 'react-share' {
    declare export var FacebookShareButton: Component<void, {url: string}>;
    declare export var VKShareButton: Component<void, {url: string}>;
    declare export var OKShareButton: Component<void, {url: string}>;

    declare export var FacebookIcon: Component<void, {size: number, round: boolean}>;
    declare export var VKIcon: Component<void, {size: number, round: boolean}>;
    declare export var OKIcon: Component<void, {size: number, round: boolean}>;
}
