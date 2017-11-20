/*
// usual component
export app from './app/reducer';
export home from './home/reducer';
export mainState from './main/reducer';

// module
// export dbState from './module/db/reducer';
export gapi from './module/gapi/reducer';
export userState from './module/user/reducer';
export i18n from './module/i18n/reducer';
*/
import {combineReducers} from 'redux';

export default combineReducers({
    packList: (packList = [], {type, payload}) => {
        // if (type === stickerPanelConst.type.addStickerPack) {
        //     packList.push(payload.pack);
        //     return [...packList];
        // }

        return packList;
    },
    activePackName: (packName = '', {type, payload}) => {
        // if (type === stickerPanelConst.type.setActivePack) {
        //     return payload.packName;
        // }

        return packName;
    }
    // selectPack
});

