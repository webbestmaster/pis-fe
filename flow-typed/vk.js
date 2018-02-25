type vkAuth = {
    getLoginStatus(callback: Function): void;
    getLoginStatus(callback: Function): void;
}

type TypeVk = {
    init(params: { apiId: number }): void;
    Auth: vkAuth;
    Api: {
        call(methodName: string,
             methodParams: {
                 user_ids: string | number;
                 fields: string;
             },
             callback: Function): void
    }
};

declare var VK: TypeVk;
