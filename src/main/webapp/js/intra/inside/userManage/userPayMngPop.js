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

            var nationalPay = fn_nationalPay(e, this);
            var healthPay = fn_healthPay(e, this);
            var longCarePay = fn_longCarePay(e, this);
            var employPay = fn_employPay(e, this);
            var accPay = fn_accPay(e, this);
            var busnPay = fn_busnPay(e);
            var retirePay = fn_retirePay(e, null, this);
            var bsPay = fn_bsPay(e, null, this);


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

            var foodPay = list[count].FOOD_PAY;
            if(foodPay == null || foodPay == ""){
                foodPay = 0;
            }

            var busn = list[count].BUSN_PAY == null ? "" : list[count].BUSN_PAY;

            var retire = list[count].RETIRE_PAY == null ? "" : list[count].RETIRE_PAY;

            html += '' +
                '<tr id="tr'+count+'">' +
                '   <td><input type="text" style="font-size: 11px" id="startDt'+count+'" name="startDt" /></td>' +
                '   <td><input type="text" style="font-size: 11px" id="endDt'+count+'" name="endDt" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="basicSalary'+count+'" name="basicSalary" value="'+ popUserPay.comma(list[count].BASIC_SALARY) +'" onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ',\'Y\')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="foodPay'+count+'" name="foodPay" value="'+ popUserPay.comma(foodPay) +'" onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ',\'Y\')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="extraPay'+count+'" name="extraPay" value="'+popUserPay.comma(extraPay)+'" onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ',\'Y\')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="bonus'+count+'" name="bonus" value="'+popUserPay.comma(bonus)+'" onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ',\'Y\')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                '   <td><input type="text" style="font-size: 11px" id="socialRateSn'+count+'" name="socialRateSn"/></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="nationalPay'+count+'" name="nationalPay" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="healthPay'+count+'" name="healthPay" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="longCarePay'+count+'" name="longCarePay" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="employPay'+count+'" name="employPay" /></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="accPay'+count+'" name="accPay" /></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="busnPay'+count+'" name="busnPay" value="'+ popUserPay.comma(busn) +'" onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>' +
                '   <td><input type="text" style="text-align: right;font-size: 11px" id="retirePay'+count+'" name="retirePay" value="'+popUserPay.comma(retire)+'"  onkeyup="popUserPay.inputNumberFormat(this);popUserPay.socialRateChange(' + count + ')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>' +
                '   <td><input type="text" disabled style="text-align: right;font-size: 11px" id="bsPay'+count+'" name="bsPay" /></td>' +
                '   <td style="text-align: center;">' +
                '       <button type="button" class="k-button k-button-solid-info" onclick="popUserPay.fn_save(this, '+list[count].SALARY_SN+')">저장</button>' +
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

            customKendo.fn_dropDownList("socialRateSn" + count, dataSource.list, "DT_RNG", "SOCIAL_RATE_SN", 2);

            var ddl = $("#socialRateSn" + count).data("kendoDropDownList");
            ddl.list.width(200);
            ddl.value(list[count].SOCIAL_RATE_SN);
            ddl.bind("change", popUserPay.socialRateChange(count));
            ddl.trigger("change");
            dataSource.list.shift();
        }

    },

    socialRateChange : function(count, auto){
        var data = {
            socialRateSn : $("#socialRateSn" + count).val()
        }

        var result = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", data);
        var e = result.list[0];

        var basicSalary = $("#basicSalary" + count).val();
        var foodPay = $("#foodPay" + count).val();
        var extraPay = $("#extraPay" + count).val();
        var bonus = $("#bonus" + count).val();
        var busnPay = $("#busnPay" + count).val();
        var retirePay = $("#retirePay" + count).val();
        e.BASIC_SALARY = basicSalary;
        e.FOOD_PAY = foodPay;
        e.EXTRA_PAY = extraPay;
        e.BONUS = bonus;

        if(auto != "Y"){
            e.BUSN_PAY = busnPay;
            e.RETIRE_PAY = retirePay;
        }

        $("#nationalPay" + count).val(fn_nationalPay(e, $("#nationalPay" + count)));
        $("#healthPay" + count).val(fn_healthPay(e, $("#healthPay" + count)));
        $("#longCarePay" + count).val(fn_longCarePay(e, $("#longCarePay" + count)));
        $("#employPay" + count).val(fn_employPay(e, $("#employPay" + count)));
        $("#accPay" + count).val(fn_accPay(e, $("#accPay" + count)));


        $("#busnPay" + count).val(fn_busnPay(e, $("#accPay" + count)));
        $("#retirePay" + count).val(fn_retirePay(e, count, $("#retirePay" + count)));


        $("#bsPay" + count).val(fn_bsPay(e, count, $("#bsPay" + count)));

    },

    fn_save : function (e, key){
        var parameters = {
            socialRateSn : $(e).closest("tr").find("input[name='socialRateSn']").val(),
            startDt : $(e).closest("tr").find("input[name='startDt']").val(),
            endDt : $(e).closest("tr").find("input[name='endDt']").val(),
            basicSalary : popUserPay.uncomma($(e).closest("tr").find("input[name='basicSalary']").val()),
            foodPay : popUserPay.uncomma($(e).closest("tr").find("input[name='foodPay']").val()),
            extraPay : popUserPay.uncomma($(e).closest("tr").find("input[name='extraPay']").val()),
            bonus : popUserPay.uncomma($(e).closest("tr").find("input[name='bonus']").val()),
            busnPay : popUserPay.uncomma($(e).closest("tr").find("input[name='busnPay']").val()),
            retirePay : popUserPay.uncomma($(e).closest("tr").find("input[name='retirePay']").val()),
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
        $("#userPayMngBody").find("tr").not($(e).closest("tr")).each(function(){
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

function fn_nationalPay(e, i){
    /** 국민연금 = (기본급 + 상여금)/ 국민연금요율(%) */
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
    var nationalPension = Math.floor(Math.floor(cnt * (e.NATIONAL_PENSION / 100))/10)*10;

    if(nationalPension > Number(e.LIMIT_AMT)){
        return e.LIMIT_AMT.toString().toMoney();
    }else{
        return nationalPension.toString().toMoney();
    }
}

function fn_healthPay(e, i){
    /** 건강보험 = (기본급 + 상여금) / 건강보험요율(%)*/
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
    return (Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10).toString().toMoney();
}

function fn_longCarePay(e, i){
    /** 장기요양보험 = (건강보험합계 / 장기요양보험요율(%))*/
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
    var healthInsuranceCnt = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;

    return (Math.floor(Math.floor(healthInsuranceCnt * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10).toString().toMoney();
}

function fn_employPay(e, i){
    /** 고용보험 = (기본급 + 상여금) / 고용보험요율(%)*/
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
    return (Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function fn_accPay(e, i){
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
    return (Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function fn_busnPay(e, i){
    /** 사대보험 사업자부담분 = 국민연금 + 건강보험 + 장기요양보험 +고용보험 + 산재보험 */
    if(e.BUSN_PAY != null && e.BUSN_PAY != ""){
        return e.BUSN_PAY;
    }else{
        /** 기본급 */
        var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
            Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
            Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));

        /** 국민연금 */
        var nationalPension = Math.floor(cnt * (e.NATIONAL_PENSION / 100));
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

        return (Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance)).toString().toMoney();
    }

}

function fn_retirePay(e, c, i){
    /** 퇴직금 추계액 = (기본급 + 식대 + 수당 + 상여)/12 */
    if(e.RETIRE_PAY != null && e.RETIRE_PAY != ""){
        return e.RETIRE_PAY;
    }else{
        var startDt;
        if(c != null){
            startDt = new Date($("#startDt" + c).val());
        }else{
            startDt = new Date($("#startDt").val());
        }

        if(isLessOneYear(startDt)){
            return 0;
        }else{
            var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
                Number(popUserPay.uncomma($(i).closest("tr").find("input[name='foodPay']").val())) +
                Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
                Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));
            return (Math.floor((cnt/12)/10) * 10).toString().toMoney();
        }
    }
}

function fn_bsPay(e, c, i){
    /** 기준급여 = (기본급 + 수당 + 상여 + 사업자부담분 + 퇴직금추계액) */
    var startDt;
    if(c != null){
        startDt = new Date($("#startDt" + c).val());
    }else{
        startDt = new Date($("#startDt").val());
    }

    /** 기본급 */
    var cnt = Number(popUserPay.uncomma($(i).closest("tr").find("input[name='basicSalary']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='foodPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='extraPay']").val())) +
        Number(popUserPay.uncomma($(i).closest("tr").find("input[name='bonus']").val()));

    /** 국민연금 */
    var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
    if(nationalPension > Number(e.LIMIT_AMT)){
        nationalPension = Number(e.LIMIT_AMT);
    }
    /** 건강보험 */
    var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;
    /** 장기요양보험 */
    var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10;
    /** 고용보험 */
    var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

    var sum = Number(cnt);

    if(e.BUSN_PAY != null && e.BUSN_PAY != ""){
        sum += Number(popUserPay.uncomma(e.BUSN_PAY));
    }else{
        sum += Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance);
    }

    if(e.RETIRE_PAY != null && e.RETIRE_PAY != ""){
        sum += Number(popUserPay.uncomma(e.RETIRE_PAY));
    }else{
        if(!isLessOneYear(startDt)){
            sum += (Math.floor((cnt/12)/10) * 10);
        }
    }

    return (Math.floor(sum/10) * 10).toString().toMoney();
}

function dateCheck(startDate, endDate, bsDate, beDate){

    var flag = true;
    var start_expirationDate = startDate.replace(/-/g, '');
    var end_expirationDate = endDate.replace(/-/g, '');
    var bsDate = bsDate.replace(/-/g, '');
    var beDate = beDate.replace(/-/g, '');

    if(bsDate >= start_expirationDate && bsDate <= end_expirationDate){
        flag = false;
    }

    if(beDate >= start_expirationDate && beDate <= end_expirationDate){
        flag = false;
    }

    return flag;
}

function isLessOneYear(j){
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    return j >= oneYearAgo;
}
