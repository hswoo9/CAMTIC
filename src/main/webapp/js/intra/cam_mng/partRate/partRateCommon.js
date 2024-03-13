function fn_create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}

function fn_monBasicSalary(e){
    if(e.BASIC_SALARY == null){
        e.BASIC_SALARY = 0
    }
    if(e.EXTRA_PAY == null){
        e.EXTRA_PAY = 0
    }
    if(e.BONUS == null){
        e.BONUS = 0
    }
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

    /** 국민연금 */
    var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
    if(nationalPension > Number(e.LIMIT_AMT)){
        nationalPension = Number(e.LIMIT_AMT);
    }
    /** 건강보험 */
    var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10
    /** 장기요양보험 */
    var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
    /** 고용보험 */
    var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

    var sum = Number(cnt) + Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance) + (Math.floor((cnt/12)/10) * 10);

    return (Math.floor(sum/10) * 10).toString().toMoney();
}



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