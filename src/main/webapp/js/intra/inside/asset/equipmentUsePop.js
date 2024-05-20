/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비사용 등록 팝업창
 */
var now = new Date();
var now1 = new Date();
var equipmentUsePop = {

    global : {
        eqipmnGbnName : [],
        list : []
    },

    fn_defaultScript: function () {

        //사용기간 - 시작
        $("#usePdStrDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        //사용기간 - 끝
        $("#usePdEndDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setDate(now.getDate() + 1))
        });

        //장비명
        $("#eqipmnName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            index: 0
        });

        $("#userName").kendoTextBox();
        $("#operCn").kendoTextBox();
        $("#useTime").kendoTextBox();
        $("#useAmt").kendoTextBox();
        $("#clientPrtpcoName").kendoTextBox();
        $("#busnName").kendoTextBox();
        $("#perAmt").kendoTextBox();
        $("#perReason").kendoTextBox();
        $("#custNm").kendoTextBox();

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now1.setMonth(now1.getMonth()))
        });

        customKendo.fn_timePicker("time1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("time2", '10', "HH:mm", "18:00");
        customKendo.fn_timePicker("endTime1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("endTime2", '10', "HH:mm", "18:00");

        $("#usePdStrDe, #usePdEndDe, #time1, #time2, #endTime1, #endTime2").attr("readonly", true);

        //장비명 드롭박스 리스트
        $.ajax({
            url : "/asset/getEqipmnList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#eqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        console.log(this.value());

                        var data = {
                            eqipmnGbnCmmnCdSn : this.value()
                        }
                        $.ajax({
                            url : "/asset/getEqipmnNameList",
                            type : "post",
                            async: false,
                            data : data,
                            dataType : "json",
                            success : function (result){
                                var ds = result.list;
                                equipmentUsePop.global.list = ds;
                                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                                $("#eqipmnName").kendoDropDownList({
                                    dataTextField: "TEXT",
                                    dataValueField: "VALUE",
                                    dataSource: ds,
                                    index: 0,
                                    change : function(){
                                        /*for(let i=0; i<equipmentUsePop.global.list.length; i++){
                                            if(equipmentUsePop.global.list[i].VALUE == this.value()){
                                                const empSeq = equipmentUsePop.global.list[i].EMP_SEQ;
                                                $("#hourlyUsageFee").val(equipmentUsePop.global.list[i].HOURLY_USAGE_FEE);
                                                $("#useAmt").val(comma($("#useTime").val() * uncomma($("#hourlyUsageFee").val())));
                                                if(empSeq != null){
                                                    $("#userSn").val(empSeq);
                                                    const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq:empSeq});
                                                    if(empInfo != null){
                                                        $("#userName").val(empInfo.EMP_NAME_KR);
                                                    }
                                                }


                                            }
                                        }*/
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        $.ajax({
            url : "/asset/getPrtpcoGbnNameList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#prtpcoGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                });
            }
        });
        equipmentUsePop.oneDay();

        window.call = function (data){
            equipmentUsePop.fn_EqipmnInfo(data);
        };

        if($("#pjtSn").val() != ""){
            const setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#pjtSn").val()}).rs;
            $("#busnName").val(setParameters.PJT_NM);
            $("#projectAddBtn").hide();
        }
    },

    inputNumberFormat: function (obj){
        obj.value = equipmentUsePop.fn_comma(obj.value);
    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3});+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    equipUseSave : function (){
        /** 사용대금 필수값 해제로 인하여 공백값일시 0원 들어가게 변경 */
        let perAmt = $("#perAmt").val().replace(/,/g, '');
        if($("#perAmt").val() == ""){
            perAmt = 0;
        }

        if(confirm("등록하시겠습니까?")){
            var data = equipmentUsePop.insertDataList(perAmt);

            $.each(data, function(i, v){
                if($("#crmCd").val()){
                    data[i].prtpcoSn = $("#crmCd").val();
                }
            })

            if(data[0].eqipmnGbnCmmnCdSn == null || data[0].eqipmnGbnCmmnCdSn == ''){
                alert("장비명의 첫번째 항목을 선택하세요.")
                return;
            }else if(data[0].eqipmnMstSn == null || data[0].eqipmnMstSn == '') {
                alert("장비명의 두번째 항목을 입력하세요.")
                return;
            }else if(data[0].usePdStrDe == null || data[0].usePdStrDe == '') {
                alert("사용기간 시작일을 입력하세요.")
                return;
            }else if(data[0].userName == null || data[0].userName == '') {
                alert("사용기간 사용자명을 입력하세요.")
                return;
            }else if(data[0].operCn == null || data[0].operCn == '') {
                alert("작업내용을 입력하세요.")
                return;
            }else if(data[0].useTime == null || data[0].useTime == '') {
                alert("사용시간을 입력하세요.")
                return;
            }else if(data[0].regDe == null || data[0].regDe == '') {
                alert("작성일자를 입력하세요.")
                return;
            }else if(data[0].userSn == null || data[0].userSn == '') {
                alert("담당자를 선택하세요.")
                return;
            }else if(data[0].custNm == null || data[0].custNm == '') {
                alert("사용자를 선택하세요.")
                return;
            }else if(data[0].prtpcoGbnSn == null || data[0].prtpcoGbnSn == '') {
                alert("업체구분을 선택하세요.")
                return;
            }

            $.ajax({
                url : '/asset/setEquipmentUseInsert',
                data : {data : JSON.stringify(data)},
                dataType: "json",
                type : "get",
                async : false
            });
            alert("저장 되었습니다.");
            if($("#mainPjtSn").val() == ""){
                opener.gridReload();
            }else{
                const busnClass = opener.commonProject.global.busnClass;
                if(opener.commonProject.global.teamStat == "Y"){
                    if(busnClass == "D"){
                        opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=7";
                    }else if(busnClass == "R"){
                        opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
                    }else if(busnClass == "S"){
                        opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
                    }else{
                        opener.window.location.reload();
                    }
                    /** 협업이 아닐때 */
                }else{
                    if(busnClass == "D"){
                        opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=13";
                    }else if(busnClass == "R"){
                        opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=14";
                    }else if(busnClass == "S"){
                        opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=14";
                    }else{
                        opener.window.location.reload();
                    }
                }
            }
            window.close()
        }
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_EqipmnInfo : function (name){
        $.ajax({
            url : "/asset/getEqipmnOne",
            type : "post",
            data : {
                userName : name
            },
            async: false,
            dataType : "json",
            success : function (rs){
                var result = rs.map;

                console.log(result);

                $("#hourlyUsageFee").val("");

                if(result != null) {
                    $("#eqipmnGbnName").data("kendoDropDownList").value(result.eqipmn_gbn_cmmn_cd_sn);
                    $("#eqipmnGbnName").data("kendoDropDownList").trigger("change");

                    $("#eqipmnName").data("kendoDropDownList").value(result.eqipmn_mst_sn);

                    $("#hourlyUsageFee").val(result.hourly_usage_fee);
                }
            }
        });
    },

    // 시간당 사용대금 계산
    fn_EqipmnHUF : function (time){
        $("#useAmt").val(comma(time * $("#hourlyUsageFee").val()));
    },

    fn_projectPop : function (){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    oneDay : function(){
        if($("#oneDay").is(":checked")){
            $("#usePdEndDe").val($("#usePdStrDe").val());
            $("#endTime1").val($("#time1").val());
            $("#endTime2").val($("#time2").val());
            $("#usePdEndDe").data("kendoDatePicker").enable(false);
            $("#endTime1").data("kendoTimePicker").enable(false);
            $("#endTime2").data("kendoTimePicker").enable(false);
        }else{
            var startDt = $("#usePdStrDe").val().split("-");
            $("#usePdEndDe").val(startDt[0] + "-" + startDt[1] + "-" + (Number(startDt[2]) + 1));
            $("#usePdEndDe").data("kendoDatePicker").min(startDt[0] + "-" + startDt[1] + "-" + (Number(startDt[2]) + 1));
            $("#usePdEndDe").data("kendoDatePicker").enable(true);
            $("#endTime1").data("kendoTimePicker").enable(true);
            $("#endTime2").data("kendoTimePicker").enable(true);
        }

        equipmentUsePop.fn_calTime();
    },

    fn_calTime : function(){
        /** 시작일 시간 */
        var startDt = new Date($("#usePdStrDe").val());
        let startTime1 = $("#time1").val();
        let startTime2 = $("#time2").val();
        var bfDate = new Date(startDt.getFullYear(), startDt.getMonth()+1, startDt.getDate(), startTime1.split(":")[0], startTime1.split(":")[1]);
        var afDate = new Date(startDt.getFullYear(), startDt.getMonth()+1, startDt.getDate(), startTime2.split(":")[0], startTime2.split(":")[1]);

        /** 종료일 시간 */
        var diffSec = afDate.getTime() - bfDate.getTime();

        if(!$("#oneDay").is(":checked")){
            var endDt = new Date($("#usePdEndDe").val());
            let endTime1 = $("#endTime1").val();
            let endTime2 = $("#endTime2").val();
            var bfDate2 = new Date(endDt.getFullYear(), endDt.getMonth()+1, endDt.getDate(), endTime1.split(":")[0], endTime1.split(":")[1]);
            var afDate2 = new Date(endDt.getFullYear(), endDt.getMonth()+1, endDt.getDate(), endTime2.split(":")[0], endTime2.split(":")[1]);

            if(startDt.getTime() != endDt.getTime()){
                const diffDate = Math.abs((startDt.getTime() - endDt.getTime())/(1000 * 60 * 60 * 24));
                diffSec += afDate2.getTime() - bfDate2.getTime();
                if(diffDate > 1){
                    for(var i = 1; i < diffDate; i++){
                        diffSec += (1000 * 60 * 60 * 24);
                    }
                }
            }
        }

        var diffMin = diffSec / 1000 / 60 / 60;
        $("#useTime").val(Math.ceil(diffMin));
        equipmentUsePop.fn_EqipmnHUF(Math.ceil(diffMin));
    },

    insertDataList : function(perAmt){
        /** 시작일 */
        var startDt = new Date($("#usePdStrDe").val());
        let startTime1 = $("#time1").val();
        let startTime2 = $("#time2").val();
        var bfDate = new Date(startDt.getFullYear(), startDt.getMonth()+1, startDt.getDate(), startTime1.split(":")[0], startTime1.split(":")[1]);
        var afDate = new Date(startDt.getFullYear(), startDt.getMonth()+1, startDt.getDate(), startTime2.split(":")[0], startTime2.split(":")[1]);
        var diffSec = afDate.getTime() - bfDate.getTime();

        var arr = new Array();
        var startData = equipmentUsePop.saveData(perAmt);
        startData.usePdStrDe = $("#usePdStrDe").val().replaceAll('-','');
        startData.time1 = $("#time1").val();
        startData.time2 = $("#time2").val();
        startData.useTime = Math.ceil(diffSec / 1000 / 60 / 60);
        startData.useAmt = startData.useTime * $("#hourlyUsageFee").val()
        arr.push(startData);

        if(!$("#oneDay").is(":checked")){
            /** 종료일 시간 */
            var endDt = new Date($("#usePdEndDe").val());
            let endTime1 = $("#endTime1").val();
            let endTime2 = $("#endTime2").val();
            var bfDate2 = new Date(endDt.getFullYear(), endDt.getMonth()+1, endDt.getDate(), endTime1.split(":")[0], endTime1.split(":")[1]);
            var afDate2 = new Date(endDt.getFullYear(), endDt.getMonth()+1, endDt.getDate(), endTime2.split(":")[0], endTime2.split(":")[1]);
            diffSec = afDate2.getTime() - bfDate2.getTime();

            var endData = equipmentUsePop.saveData(perAmt);
            endData.usePdStrDe = $("#usePdEndDe").val().replaceAll('-',''); //사용기간 시작일
            endData.time1 = $("#endTime1").val(); //사용기간 시작시간
            endData.time2 = $("#endTime2").val(); //사용기간 종료시간
            endData.useTime = Math.ceil(diffSec / 1000 / 60 / 60)
            endData.useAmt = endData.useTime * $("#hourlyUsageFee").val()
            arr.push(endData);

            const diffDate = Math.abs((startDt.getTime() - endDt.getTime())/(1000 * 60 * 60 * 24));
            if(diffDate > 1){ //diffDate 2
                for(var i = 1; i < diffDate; i++){
                    var a = new Date($("#usePdStrDe").val());
                    var date = new Date(a.setDate(a.getDate() + i));
                    var data = equipmentUsePop.saveData(perAmt);
                    data.usePdStrDe = date.getFullYear() + "" + ("0" + (date.getMonth()+1)).slice(-2) + date.getDate();
                    data.time1 = "00:00"; //사용기간 시작시간
                    data.time2 = "23:50"; //사용기간 종료시간
                    data.useTime = 24;
                    data.useAmt = data.useTime * $("#hourlyUsageFee").val()
                    arr.push(data);
                }
            }
        }

        return arr;
    },
    
    saveData : function(perAmt){
        var e = {
            pjtSn : $("#pjtSn").val(),
            eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
            eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
            eqipmnName : $("#eqipmnName").data("kendoDropDownList").text(), //장비명
            eqipmnMstSn : $("#eqipmnName").data("kendoDropDownList").value(), //장비마스터 순번
            userName : $("#userName").val(), //사용자명
            userSn : $("#empSeq").val(), //사용자 사원번호
            operCn : $("#operCn").val(), //작업내용
            perAmt : perAmt, //할인금액
            perReason : $("#perReason").val(),
            regDe : $("#regDe").val().replaceAll('-',''), //작성일자
            crtrSn : $("#regEmpSeq").val(), //생성자sn - 로그인한 계정
            clientPrtpcoName : $("#clientPrtpcoName").val(), //의뢰업체명
            prtpcoGbnName : $("#prtpcoGbnName").data("kendoDropDownList").text(), //업체구분명
            prtpcoGbnSn : $("#prtpcoGbnName").data("kendoDropDownList").value(), //업체구분 공통코드sn
            custNm : $("#custNm").val()
        }
        
        return e;
    }
}



