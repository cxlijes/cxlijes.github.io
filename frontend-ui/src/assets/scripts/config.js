(function (window) {
    'use strict';

    var MAX_USER_ID_KEY = 'atc_max_user_id';

    function getMaxUser() {
        var app = window.WebApp;
        return app && app.initDataUnsafe && app.initDataUnsafe.user ? app.initDataUnsafe.user : null;
    }

    function getMaxUserId() {
        var user = getMaxUser();

        if (user && user.id) {
            var fromMax = String(user.id);

            try {
                localStorage.setItem(MAX_USER_ID_KEY, fromMax);
            } catch (e) {
                console.error('Не удалось сохранить maxUserId:', e);
            }
            return fromMax;
        }

        var fromQuery = new URLSearchParams(window.location.search).get('maxUserId');

        if (fromQuery) {
            try {
                localStorage.setItem(MAX_USER_ID_KEY, fromQuery);
            } catch (e) {
                console.error('Не удалось сохранить maxUserId:', e);
            }
            return fromQuery;
        }

        try {
            return localStorage.getItem(MAX_USER_ID_KEY);
        } catch (e) {
            return null;
        }
    }

    window.ATC_CONFIG = {
        baseUrl: 'http://26.121.182.157:5232',
        getMaxUserId: getMaxUserId,
        getInitData: function () { return window.WebApp ? window.WebApp.initData : null; }
    };
})(window);
