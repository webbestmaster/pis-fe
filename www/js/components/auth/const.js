const globalAppConst = require('./../../app-const');
const {postfix, postfixAmp, postfixQuestion} = globalAppConst.proxy;

module.exports = {
    url: {
        emptyLogin: '/api/auth/login' + postfixQuestion,
        login: '/api/auth/login?email={{email}}&password={{password}}' + postfixAmp,
        registration: '/api/auth/registration' + postfixQuestion,
        forgotPassword: '/api/auth/forgotPassword' + postfixQuestion,
        resetPassword: '/api/auth/resetPassword' + postfixQuestion,
        logout: '/api/auth/logout' + postfixQuestion,
        updateProfile: '/member/user/updateProfile' + postfixQuestion,
        sessionState: '/api/home/ping' + postfixQuestion,
        leaveReview: '/member/feedback/add?fitness_club_id={{clubId}}&rating={{rating}}&description={{description}}' + postfixAmp, // eslint-disable-line max-len
        userHomeData: '/member/user/home' + postfixQuestion,
        clubHomeData: '/member/club/home' + postfixQuestion,
        clubFeedbackList: '/member/feedback/list' + postfixQuestion,
        updateProfileImage: '/member/user/updateProfileImage' + postfixQuestion,
        addToFavorite: '/member/favorite/add?type={{type}}&item_id={{itemId}}' + postfixAmp,
        removeFromFavorite: '/member/favorite/remove?id={{favoriteItemId}}' + postfixAmp,
        createClubAnswer: '/member/feedback/answer?id={{reviewId}}&answer={{answer}}' + postfixAmp,
        makeSubscriptionOrder: '/member/order/create?productType=subscription&orderType={{orderType}}&amount={{amount}}&subscriptionId={{subscriptionId}}&needCall={{needCall}}&orderUserPhone={{userPhone}}' + postfixAmp, // eslint-disable-line max-len
        makeTrainingOrder: '/member/order/create?productType=training&orderType={{orderType}}&amount={{amount}}&trainingId={{trainingId}}&trainingScheduleId={{trainingScheduleId}}&day={{dayId}}&needCall={{needCall}}&orderUserPhone={{userPhone}}&startOrderDate={{startOrderDate}}' + postfixAmp, // eslint-disable-line max-len
        proposal: '/member/proposal/create?type={{type}}&message={{message}}' + postfixAmp,
        socialLoginLinks: '/api/oauth/index' + postfixAmp,
        loginFacebook: '/api/auth/social?email={{email}}&social=facebook&socialId={{userId}}&firstName={{firstName}}&lastName={{lastName}}&sex={{gender}}&birthday={{birthday}}&image={{avatar}}' + postfixAmp, // eslint-disable-line max-len
        loginVk: '/api/auth/social?email={{email}}&social=vk&socialId={{userId}}&firstName={{firstName}}&lastName={{lastName}}&sex={{gender}}&birthday={{birthday}}&image={{avatar}}' + postfixAmp // eslint-disable-line max-len
    },
    type: {
        login: 'auth__login',
        homeData: 'auth__home-data',
        clubData: 'auth__club-data',
        clubFeedback: 'auth__club-feedback-list',
        registration: 'auth__registration',
        forgotPassword: 'auth__forgot-password',
        resetPassword: 'auth__reset-password',
        openPopup: 'auth__open-popup',
        userProfile: 'auth_user-profile'
    },
    popup: {
        promo: 'popup__promo',
        login: 'popup__login',
        register: 'popup__register',
        restore: 'popup__restore',
        changePassword: 'popup__change-password'
    },
    userType: {
        user: 'user',
        fitnessClub: 'fitness_club'
    },
    proposalType: {
        partner: 'partner',
        proposal: 'offer'
    }
};
