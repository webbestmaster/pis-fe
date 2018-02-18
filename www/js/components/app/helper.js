/* global window, requestAnimationFrame, Event */
import {store} from '../../index';

const appConst = require('./const.json');
const globalAppConst = require('./../../app-const');

function defineWrapperClassName() {
    const {clientWidth} = window.document.documentElement;
    const wrapper = window.document.querySelector('.js-app-wrapper');
    const wrapperClassList = wrapper.classList;
    const desktopCssClassName = 'desktop-width';
    const tabletCssClassName = 'tablet-width';
    const mobileCssClassName = 'mobile-width';
    const ltCssClassPrefix = 'lt-';
    const cssClassNameList = [
        desktopCssClassName,
        tabletCssClassName,
        mobileCssClassName
    ];

    cssClassNameList.forEach(className => {
        wrapperClassList.remove(className);
        wrapperClassList.remove(ltCssClassPrefix + className);
    });

    if (clientWidth > globalAppConst.tabletWidth) {
        wrapperClassList.add(desktopCssClassName);
    } else {
        wrapperClassList.add(ltCssClassPrefix + desktopCssClassName);

        if (clientWidth > globalAppConst.mobileWidth) {
            wrapperClassList.add(tabletCssClassName);
        } else {
            wrapperClassList.add(ltCssClassPrefix + tabletCssClassName);
            wrapperClassList.add(mobileCssClassName);
        }
    }
}

function onWindowResize() {
    defineWrapperClassName();

    const {clientWidth, clientHeight} = window.document.documentElement;

    store.dispatch({
        type: appConst.type.setScreenSize,
        payload: {
            width: clientWidth,
            height: clientHeight
        }
    });
}

function onWindowLoad() {
    store.dispatch({
        type: appConst.type.window,
        payload: {
            window: {
                isLoad: true
            }
        }
    });

    // need to fix swiper
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
}

export function initAppScreenHelper() {
    onWindowResize();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('load', onWindowLoad, false);
}

