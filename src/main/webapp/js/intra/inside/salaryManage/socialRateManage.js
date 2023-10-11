var srm = {
    
    global : {
        rateIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        customKendo.fn_datePicker("startDate0", '', "yyyy-MM-dd", srm.global.now);
        customKendo.fn_datePicker("endDate0", '', "yyyy-MM-dd", srm.global.now);
        customKendo.fn_textBox(["nationalPension0", "limitAmt0", "healthInsurance0",
            "longCareInsurance0", "employInsurance0", "accidentInsurance0"])

        $(".numberInput").keyup(function(){
            $(this).val(srm.comma(srm.uncomma($(this).val())));
        });

        srm.setMakeTable();
    },

    setMakeTable : function() {
        var result = customKendo.fn_customAjax("/salaryManage/getSocialRateManageList.do", srm.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            for(var i = 0; i < list.length; i++){
                srm.addRow('old');

                $("#rate" + i).find("#socialRateSn" + i).val(list[i].SOCIAL_RATE_SN)
                $("#rate" + i).find("#startDate" + i).val(list[i].START_DATE)
                $("#rate" + i).find("#endDate" + i).val(list[i].END_DATE)
                $("#rate" + i).find("#nationalPension" + i).val(list[i].NATIONAL_PENSION)
                $("#rate" + i).find("#limitAmt" + i).val(srm.comma(list[i].LIMIT_AMT))
                $("#rate" + i).find("#healthInsurance" + i).val(list[i].HEALTH_INSURANCE)
                $("#rate" + i).find("#longCareInsurance" + i).val(list[i].LONG_CARE_INSURANCE)
                $("#rate" + i).find("#employInsurance" + i).val(list[i].EMPLOY_INSURANCE)
                $("#rate" + i).find("#accidentInsurance" + i).val(list[i].ACCIDENT_INSURANCE)

            }
        }
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="rateInfo ' + e + 'RateInfo" id="rate' + srm.global.rateIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="socialRateSn' + srm.global.rateIndex + '" name="socialRateSn' + srm.global.rateIndex + '">' +
                    '<input type="text" id="startDate' + srm.global.rateIndex + '" name="startDate' + srm.global.rateIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="endDate' + srm.global.rateIndex + '" name="endDate' + srm.global.rateIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="nationalPension' + srm.global.rateIndex + '" name="nationalPension' + srm.global.rateIndex + '" class="percentInput">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="limitAmt' + srm.global.rateIndex + '" name="limitAmt' + srm.global.rateIndex + '" class="numberInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="healthInsurance' + srm.global.rateIndex + '" name="healthInsurance' + srm.global.rateIndex + '" class="percentInput">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="longCareInsurance' + srm.global.rateIndex + '" name="longCareInsurance' + srm.global.rateIndex + '" class="percentInput">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="employInsurance' + srm.global.rateIndex + '" name="employInsurance' + srm.global.rateIndex + '" class="percentInput">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="accidentInsurance' + srm.global.rateIndex + '" name="accidentInsurance' + srm.global.rateIndex + '" class="percentInput">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" rateNum="' + srm.global.rateIndex + '" onclick="srm.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_datePicker("startDate" + srm.global.rateIndex, '', "yyyy-MM-dd", srm.global.now);
        customKendo.fn_datePicker("endDate" + srm.global.rateIndex, '', "yyyy-MM-dd", srm.global.now);
        customKendo.fn_textBox(["nationalPension" + srm.global.rateIndex, "limitAmt" + srm.global.rateIndex,
            "healthInsurance" + srm.global.rateIndex, "longCareInsurance" + srm.global.rateIndex,
            "employInsurance" + srm.global.rateIndex, "accidentInsurance" + srm.global.rateIndex])

        $(".numberInput").keyup(function(){
            $(this).val(srm.comma(srm.uncomma($(this).val())));
        });

        srm.global.rateIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            srm.global.saveAjaxData = {
                socialRateSn : $(e).closest("tr").find("#socialRateSn" + $(e).attr("rateNum")).val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/salaryManage/setSocialRateDel.do", srm.global.saveAjaxData);
            if(result.flag){
                alert("삭제되었습니다.");
                $(e).closest("tr").remove();
            }
        }
    },

    setSocialRate : function(){
        if(confirm("저장하시겠습니까?")){
            var newRateArr = new Array();
            var oldRateArr = new Array();
            $.each($(".rateInfo"), function(i, v){
                var arrData = {
                    socialRateSn : $(this).find("#socialRateSn" + i).val(),
                    startDate : $(this).find("#startDate" + i).val(),
                    endDate : $(this).find("#endDate" + i).val(),
                    nationalPension : $(this).find("#nationalPension" + i).val(),
                    limitAmt : srm.uncomma($(this).find("#limitAmt" + i).val()),
                    healthInsurance : $(this).find("#healthInsurance" + i).val(),
                    longCareInsurance : $(this).find("#longCareInsurance" + i).val(),
                    employInsurance : $(this).find("#employInsurance" + i).val(),
                    accidentInsurance : $(this).find("#accidentInsurance" + i).val(),
                    empSeq : $("#empSeq").val()
                }

                if($(this).hasClass("newRateInfo")){
                    newRateArr.push(arrData);
                }else{
                    oldRateArr.push(arrData);
                }
            })

            srm.global.saveAjaxData = {
                newRateArr : JSON.stringify(newRateArr),
                oldRateArr : JSON.stringify(oldRateArr)
            }

            var result = customKendo.fn_customAjax("/salaryManage/setSocialRate.do", srm.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                srm.global.rateIndex = 0;
                srm.setMakeTable();
            }
        }
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}
