function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset, location.href.indexOf('/',offset+1));

    if ((/^\/js/).test(getActiveScript())) {
        return "";
    }

    return ctxPath;
}

function getActiveScript() {
    var d = document.getElementsByTagName("script");
    var path = dirname(d[d.length - 1].src);
    delete d;

    var offset=path.indexOf(location.host)+location.host.length;
    return path.substring(offset);
}

function dirname(path) {
    if (path.lastIndexOf("/") == -1)
        return "./";
    return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + "/";
}

function onlyNumber(e) {
    e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '').replace(/[.]/g, '');
}