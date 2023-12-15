var popUserPay = {


    fn_defaultScript : function (){

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", null);

        customKendo.fn_textBox(["basicSalary", "foodPay", "extraPay", "bonus",
                                "nationalPay", "healthPay", "longCarePay", "employPay",
                                "accPay", "busnPay", "retirePay", "bsPay"]);

        var data = {

        }
        var rs = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", data);
        customKendo.fn_dropDownList("socialRateSn", rs.list, "DT_RNG", "SOCIAL_RATE_SN", 2)

        var ddl = $("#socialRateSn").data("kendoDropDownList");
        ddl.list.width(200);

        $("#socialRateSn").data("kendoDropDownList").bind("change", function(){
            var data = {
                socialRateSn : $("#socialRateSn").val()
            }

            var result = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", data);
            var e = result.list[0];

            var basicSalary = $("#basicSalary").val();
            var foodPay = $("#foodPay").val();
            var extraPay = $("#extraPay").val();
            var bonus = $("#bonus").val();
            e.BASIC_SALARY = basicSalary;
            e.EXTRA_PAY = extraPay;
            e.BONUS = bonus;

            var nationalPay = fn_nationalPay(e);
            var healthPay = fn_healthPay(e);
            var longCarePay = fn_longCarePay(e);
            var employPay = fn_employPay(e);
            var accPay = fn_accPay(e);
            var busnPay = fn_busnPay(e);
            var retirePay = fn_retirePay(e);
            var bsPay = fn_bsPay(e);


            $("#nationalPay").val(nationalPay);
            $("#healthPay").val(healthPay);
            $("#longCarePay").val(longCarePay);
            $("#employPay").val(employPay);
            $("#accPay").val(accPay);
            $("#busnPay").val(busnPay);
            $("#retirePay").val(retirePay);
            $("#bsPay").val(bsPay);
        });

        popUserPay.fn_setData();
    },

    fn_setData: function(){
        var data = {
            empSeq : $("#empSeq").val()
        }
        var rs = customKendo.fn_customAjax("/salaryManage/getEmpSalaryDataList", data);
        var list = rs.list;

        var dataSource = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", data);

        console.log(dataSource);
        for (var i = 0 ; i < list.length ; i++){
            var html = "";

            var count = i;
            var bonus = list[count].BONUS;

            if(bonus == null || bonus == ""){
                bonus = 0;
            }

            var extraPay = list[i].EXTRA_PAY;

            if(extraPay == null || extraPay == ""){
                extraPay = 0;
            }

            html += '' +
                '<tr id="tr'+count+'">' +
                '   <td><input type="text" style="font-size: 11px" id="startDt'+count+'" /></td>' +
                '   <td><input type="text" style="font-size: 11px" id="endDt'+count+'" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="basicSalary'+count+'" value="'+ popUserPay.comma(list[count].BASIC_SALARY) +'" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="foodPay'+count+'" value="0" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="extraPay'+count+'" value="'+popUserPay.comma(extraPay)+'" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="bonus'+count+'" value="'+popUserPay.comma(bonus)+'" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="font-size: 11px" id="socialRateSn'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="nationalPay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="healthPay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="longCarePay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="employPay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="accPay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="busnPay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="retirePay'+count+'" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="bsPay'+count+'" /></td>' +
                '   <td>' +
                '       <button type="button" class="k-button k-button-solid-info" onclick="popUserPay.fn_save('+list[count].SALARY_SN+')">저장</button>' +
                '       <button type="button" class="k-button k-button-solid-error" onclick="popUserPay.fn_del('+list[count].SALARY_SN+')">삭제</button>' +
                '   </td>' +
                '</tr>'
            $("#userPayMngBody").prepend(html);

            customKendo.fn_datePicker("startDt" + count, '', "yyyy-MM-dd", new Date(list[count].START_DT));
            if(list[count].END_DT == undefined || list[count].END_DT == "" || list[count].END_DT == null){
                endDt = "";
            } else {
                endDt = new Date(list[count].END_DT)
            }
            customKendo.fn_datePicker("endDt" + count, '', "yyyy-MM-dd", endDt);

            customKendo.fn_textBox(["basicSalary" + count, "foodPay" + count, "extraPay" + count, "bonus" + count,
                "nationalPay" + count, "healthPay" + count, "longCarePay" + count, "employPay" + count,
                "accPay" + count, "busnPay" + count, "retirePay" + count, "bsPay" + count]);

            customKendo.fn_dropDownList("socialRateSn" + count, dataSource.list, "DT_RNG", "SOCIAL_RATE_SN", 2)

            var ddl = $("#socialRateSn" + count).data("kendoDropDownList");
            ddl.list.width(200);

            ddl.bind("change", function(){
                var data = {
                    socialRateSn : $("#socialRateSn" + count).val()
                }

                var result = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", data);
                var e = result.list[0];


                var basicSalary = $("#basicSalary" + count).val();
                var foodPay = $("#foodPay" + count).val();
                var extraPay = $("#extraPay" + count).val();
                var bonus = $("#bonus" + count).val();
                e.BASIC_SALARY = basicSalary;
                e.EXTRA_PAY = extraPay;
                e.BONUS = bonus;

                var nationalPay = fn_nationalPay(e);
                var healthPay = fn_healthPay(e);
                var longCarePay = fn_longCarePay(e);
                var employPay = fn_employPay(e);
                var accPay = fn_accPay(e);
                var busnPay = fn_busnPay(e);
                var retirePay = fn_retirePay(e);
                var bsPay = fn_bsPay(e);


                $("#nationalPay" + count).val(nationalPay);
                $("#healthPay" + count).val(healthPay);
                $("#longCarePay" + count).val(longCarePay);
                $("#employPay" + count).val(employPay);
                $("#accPay" + count).val(accPay);
                $("#busnPay" + count).val(busnPay);
                $("#retirePay" + count).val(retirePay);
                $("#bsPay" + count).val(bsPay);
            });

            console.log(list[count].SOCIAL_RATE_SN);
            ddl.value(list[count].SOCIAL_RATE_SN);
            ddl.trigger("change");
            dataSource.list.shift();
        }

    },

    fn_save : function (key){
        var parameters = {
            socialRateSn : $("#socialRateSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            basicSalary : popUserPay.uncomma($("#basicSalary").val()),
            foodPay : popUserPay.uncomma($("#foodPay").val()),
            extraPay : popUserPay.uncomma($("#extraPay").val()),
            bonus : popUserPay.uncomma($("#bonus").val()),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val(),
            loginEmpSeq : $("#loginEmpSeq").val()
        }

        if(key != null && key != ""){
            parameters.salarySn = key;
        }
        if(!confirm("저장하시겠습니까?")){
            return;
        }

        if(parameters.basicSalary == 0){
            alert("기본급을 입력해주세요.");
            return;
        }
        if(parameters.socialRateSn == ""){
            alert("적용요율을 선택해주세요.");
            return;
        }


        var duplFlag = true;
        $("#userPayMngBody").find("tr").each(function(){
            var startDt = $(this).find("td").eq(0).find("input").val();
            var endDt = $(this).find("td").eq(1).find("input").val();
            var btn = $(this).find("td").eq(15).find("button").length;

            if(btn > 1){
                if(!dateCheck(startDt, endDt, parameters.startDt, parameters.endDt)){
                    alert("중복되는 날짜가 존재합니다.");
                    duplFlag = false;
                    return;
                }
            }
        });

        if(!duplFlag){
            return;
        }

        console.log(parameters);

        $.ajax({
            url : "/salaryManage/setSalaryManage",
            data: parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    location.reload();
                }
            }
        });
    },

    inputNumberFormat : function (obj){
        obj.value = popUserPay.comma(popUserPay.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_del : function (key){
        var data = {
            salarySn : key,
        }

        $.ajax({
            url : "/salaryManage/delSalaryManage",
            data : data,
            type : "post",
            dataType : "json",
            success : function (e){
                if(e.code == 200){
                    alert("삭제되었습니다.");
                    location.reload();
                }
            }
        });
    }
}

function fn_nationalPay(e, id){
    /** 국민연금 = (기본급 + 상여금)/ 국민연금요율(%) */
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    var nationalPension = Math.floor(Math.floor(cnt * (e.NATIONAL_PENSION / 100))/10)*10;

    if(nationalPension > Number(e.LIMIT_AMT)){
        return e.LIMIT_AMT.toString().toMoney()
    }else{
        return nationalPension.toString().toMoney();
    }
}

function fn_healthPay(e){
    /** 건강보험 = (기본급 + 상여금) / 건강보험요율(%)*/
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    return (Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function fn_longCarePay(e){
    /** 장기요양보험 = (건강보험합계 / 장기요양보험요율(%))*/
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    var healthInsuranceCnt = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;

    return (Math.floor(Math.floor(healthInsuranceCnt * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10).toString().toMoney()
}

function fn_employPay(e){
    /** 고용보험 = (기본급 + 상여금) / 고용보험요율(%)*/
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    return (Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function fn_accPay(e){
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    return (Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function fn_busnPay(e){
    /** 사대보험 사업자부담분 = 국민연금 + 건강보험 + 장기요양보험 +고용보험 + 산재보험 */

    /** 기본급 */
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));

    /** 국민연금 */
    var nationalPension = Math.floor(cnt * (e.NATIONAL_PENSION / 100));
    if(nationalPension > Number(e.LIMIT_AMT)){
        nationalPension = e.LIMIT_AMT;
    }
    /** 건강보험 */
    var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10
    /** 장기요양보험 */
    var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
    /** 고용보험 */
    var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

    return (Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance)).toString().toMoney();
}

function fn_retirePay(e){
    /** 퇴직금 추계액 = (기본급 + 수당 + 상여)/12 */
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));
    return (Math.floor((cnt/12)/10) * 10).toString().toMoney();
}

function fn_bsPay(e){
    /** 기준급여 = (기본급 + 수당 + 상여 + 사업자부담분 + 퇴직금추계액) */
    /** 기본급 */
    var cnt = Number(popUserPay.uncomma(e.BASIC_SALARY)) + Number(popUserPay.uncomma(e.EXTRA_PAY)) + Number(popUserPay.uncomma(e.BONUS));

    /** 국민연금 */
    var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
    if(nationalPension > Number(e.LIMIT_AMT)){
        nationalPension = e.LIMIT_AMT;
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

function dateCheck(startDate, endDate, bsDate, beDate){

    var flag = true;
    var start_expirationDate = startDate.replace(/-/g, '');
    var end_expirationDate = endDate.replace(/-/g, '');
    var bsDate = bsDate.replace(/-/g, '');
    var beDate = beDate.replace(/-/g, '');

    console.log(bsDate, beDate);
    if(bsDate >= start_expirationDate && bsDate <= end_expirationDate){
        flag = false;
    }

    if(beDate >= start_expirationDate && beDate <= end_expirationDate){
        flag = false;
    }



    return flag;

}
