// @flow

type VkAuthType = {
    getLoginStatus(callback: (response: { session: { mid: string } }) => void): void
};

type VkType = {
    init(params: { apiId: number }): void,
    Auth: VkAuthType,
    Api: {
        call(methodName: string,
             methodParams: {
                 user_ids: string | number,
                 fields: string
             },
             callback: (response: { response: [{ [key: string]: string }] }) => void): void
    }
};

declare var VK: VkType;
