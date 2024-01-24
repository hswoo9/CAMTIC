function inputNumberFormat (obj){
    obj.value = comma(uncomma(obj.value));
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function inputNumberFormatN (obj){
    obj.value = comma(uncommaN(obj.value));
}

function commaN(str) {
    str = String(str);
    // 맨 앞의 하이픈은 남기고, 나머지 숫자에만 쉼표 삽입
    return str.replace(/^(-?\d+)(\d{3})+/g, function(_, sign, rest) {
        return sign + rest.replace(/\d{3}/g, ',$&');
    });
}

function uncommaN(str) {
    str = String(str);
    return str.replace(/[^\d-]|(?<=\d)-/g, '');
}




