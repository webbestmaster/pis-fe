// const postfix = '$url=http://site.katran.by';
// const postfixAmp = '&' + postfix;
// const postfixQuestion = '?' + postfix;
// const postfixQuestionAmp = '?' + postfix + '&';
// const host = 'http://localhost:9000';

const postfix = '';
const postfixAmp = '';
const postfixQuestion = '';
const postfixQuestionAmp = '';
const host = 'http://site.katran.by';

module.exports = {
    tabletWidth: 1260,
    mobileWidth: 750,
    isTest: false,
    proxy: {
        postfix,
        postfixAmp,
        postfixQuestion
    },
    pageDataUrl: {
        // host: 'http://site.katran.by',
        host,
        home: '/api/home/index' + postfixQuestion,
        clubs: '/api/club/index' + postfixQuestion,
        club: '/api/club/getFullInfo?id={{clubId}}' + postfixAmp,
        subscriptions: '/api/subscription/index' + postfixQuestion,
        subscription: '/api/subscription/getFullInfo?id={{subscriptionId}}' + postfixAmp,
        trainings: '/api/training/index' + postfixQuestion,
        training: '/api/training/getFullInfo?id={{trainingId}}' + postfixAmp,
        clubFilials: '/api/club/getAllFilials?id={{clubId}}' + postfixAmp,
        metaTag: '/api/page/getByUrl?url={{url}}' + postfixAmp,
        blog: {
            home: '/api/blog/index' + postfixQuestion,
            getByCategory: '/api/blog/getByCategory?category={{categoryName}}' + postfixAmp,
            article: '/api/blog/getFullInfo?id={{articleId}}' + postfixAmp,
            ads: '/api/advertising/getByCategory?category={{category}}' + postfixAmp
        }
    },
    phone: {
        by: { // eslint-disable-line id-length
            prefix: '+375',
            prefixClean: '375'
        }
    },
    searchUrl: {
        headerSearch: '/api/search/full?query={{query}}' + postfixAmp,
        club: host + '/api/club/search' + (postfixQuestionAmp || '?'),
        subscriptions: host + '/api/subscription/search' + (postfixQuestionAmp || '?'),
        trainings: host + '/api/training/search' + (postfixQuestionAmp || '?')
    },
    key: {
        googleMap: 'AIzaSyCgl3fWrTUUYRtPM8WDsjnAlaI6OFdCK0Q'
        // facebook: '151031658945087',
        // vKontakte: 6379669
    }
};
