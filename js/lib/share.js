Share = {
    vk: function (purl) {
        url = 'http://vkontakte.ru/share.php?';
        url += 'url=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    ok: function (purl) {
        url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st._surl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    fb: function (purl) {
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[url]=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    tw: function (purl) {
        url = 'http://twitter.com/share?';
        url += 'url=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    ml: function (purl) {
        url = 'http://connect.mail.ru/share?';
        url += 'url=' + encodeURIComponent(purl);
        Share.popup(url)
    },

    popup: function (url) {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }
};