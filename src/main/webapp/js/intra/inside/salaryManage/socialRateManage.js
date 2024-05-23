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

        srm.mainGrid();
    },

    setMakeTable : function() {
        srm.global.searchAjaxData = {
            mainType : 'M',
        }
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

        if($(".newRateInfo").length > 0){
            alert("최대 1개만 추가 및 저장이 가능합니다.");
            return false;
        }

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

        /*if(e == "new"){
            var lastEndDe = new Date($("#endDate" + (srm.global.rateIndex - 1)).val());
            lastEndDe.setDate(lastEndDe.getDate() + 1);
            $("#startDate" + srm.global.rateIndex).val(lastEndDe.getFullYear() + "-" + String(lastEndDe.getMonth() + 1).padStart(2, "0") + "-" + String(lastEndDe.getDate()).padStart(2, "0"));
        }*/
        $("#endDate" + srm.global.rateIndex).val("");
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
            var trSize = $(".rateInfo").length;
            var newTrSize = $(".newRateInfo").length;
            var oldTrSize = $(".oldRateInfo").length;

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
                    if(arrData.startDate == "") {
                        alert("적용시작 날짜를 선택해주세요.");
                        return;
                    }

                    if(trSize == (i+1)){
                        arrData.endDate = '9999-12-31';
                    }else{
                        if(arrData.endDate == ""){
                            alert("적용종료 날짜를 선택해주세요.");
                            return;
                        }
                    }
                    newRateArr.push(arrData);
                }else{
                    if(newTrSize > 0 &&  oldTrSize == (i+1)){
                        var dateString = $("#startDate" + (i+1)).val();
                        var dateObject = new Date(dateString);
                        var yesterday = new Date(dateObject.setDate(dateObject.getDate() - 1));

                        const year = yesterday.getFullYear();
                        const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
                        const day = yesterday.getDate().toString().padStart(2, '0');

                        var formattedDate = year + '-' + month + '-' + day;

                        arrData.endDate = formattedDate;
                    }

                    oldRateArr.push(arrData);
                }

            });

            if(dateCheck(newRateArr, oldRateArr)){
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
            } else {
                alert("중복되는 기간이 존재합니다.");
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

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/account/getAccountList.do",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.userKind = $('#userKind').val();
                    data.empNameKr = $("#kindContent").val();
                    data.kindContent = $("#kindContent").val();
                    data.userGender = $("#userGender").val();
                    data.deptComp = $("#deptComp").val();
                    data.deptTeam = $("#deptTeam").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 472,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srm.accountGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="srm.fn_regAccountToPop()">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    field: "BANK_NAME",
                    title: "은행명",
                    width : 100
                }, {
                    field: "PAY_ACCOUNT",
                    title: "지급계좌",
                    width : 100
                }, {
                    field: "DEPOSITOR",
                    title: "예금주",
                    width : 100
                }, {
                    field: "ACCOUNT_NAME",
                    title: "계좌별칭",
                    width : 100
                }, {
                    title: "수정",
                    width : 30,
                    template: function(data){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="srm.fn_regAccountToPop(\''+data.ACCOUNT_TO_SN+'\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    title: "삭제",
                    width : 30,
                    template: function(data){
                        return '<button type="button" class="k-button k-button-solid-error" onclick="srm.fn_delRegAccountTo(\''+data.ACCOUNT_TO_SN+'\')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }

            ]
        }).data("kendoGrid");
    },

    fn_regAccountToPop : function(key){
        var url = "/account/regAccountToPop.do";

        if(key != null && key != "" && key != undefined){
            url += "?accountToSn=" + key;
        }
        var name = "_blank";
        var option = "width = 900, height = 400, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_delRegAccountTo : function(key){
        if(confirm("삭제하시겠습니까??")) {
            $.ajax({
                url: "/account/delRegAccountTo.do",
                type: "POST",
                data: {
                    accountToSn : key
                },
                success: function(rs){
                    if(rs.code == 200){
                        alert("삭제되었습니다.");
                        srm.accountGridReload();
                    }
                }
            });
        }
    },

    accountGridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}

function dateCheck(newRateArr, oldRateArr){

    var flag = true;
    for(var i = 0 ; i < oldRateArr.length ; i++){
        for(var j = 0 ; j < newRateArr.length ; j++){
            var start_expirationDate = oldRateArr[i].startDate.replace(/-/g, '');
            var end_expirationDate = oldRateArr[i].endDate.replace(/-/g, '');
            var bsDate = newRateArr[j].startDate.replace(/-/g, '');
            var beDate = newRateArr[j].endDate.replace(/-/g, '');

            if(bsDate >= start_expirationDate && bsDate <= end_expirationDate){
                flag = false;
            }

            if(beDate >= start_expirationDate && beDate <= end_expirationDate){
                flag = false;
            }

        }
    }


    return flag;

}

