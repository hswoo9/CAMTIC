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
            value : new Date(now.setMonth(now.getMonth()+1))
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

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now1.setMonth(now1.getMonth()))
        });

        customKendo.fn_timePicker("time1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("time2", '10', "HH:mm", "18:00");
        $("#usePdStrDe, #time1, #time2").attr("readonly", true);

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
                                        for(let i=0; i<equipmentUsePop.global.list.length; i++){
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
                                        }
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
        equipmentUsePop.fn_calTime();

        window.call = function (data){
            equipmentUsePop.fn_EqipmnInfo(data);
        };

        if($("#pjtSn") != ""){
            const setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#pjtSn").val()}).rs;
            console.log(setParameters);
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
        let useAmt = $("#useAmt").val().replace(/,/g, '');
        if($("#useAmt").val() == ""){
            useAmt = 0;
        }

        let perAmt = $("#perAmt").val().replace(/,/g, '');
        if($("#perAmt").val() == ""){
            perAmt = 0;
        }

        if(confirm("등록하시겠습니까?")){
            var data = {
                pjtSn : $("#pjtSn").val(),
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                eqipmnName : $("#eqipmnName").data("kendoDropDownList").text(), //장비명
                eqipmnMstSn : $("#eqipmnName").data("kendoDropDownList").value(), //장비마스터 순번
                usePdStrDe : $("#usePdStrDe").val().replaceAll('-',''), //사용기간 시작일
                time1 : $("#time1").val(), //사용기간 시작시간
                time2 : $("#time2").val(), //사용기간 종료시간
                //usePdEndDe : $("#usePdEndDe").val().replaceAll('-',''), //사용기간 종료일
                userName : $("#userName").val(), //사용자명
                userSn : $("#userSn").val(), //사용자 사원번호
                operCn : $("#operCn").val(), //작업내용
                useTime : $("#useTime").val(), //사용시간
                useAmt : useAmt, //사용대금
                perAmt : perAmt, //할인금액
                perReason : $("#perReason").val(),
                regDe : $("#regDe").val().replaceAll('-',''), //작성일자
                crtrSn : $("#empSeq").val(), //생성자sn - 로그인한 계정
                clientPrtpcoName : $("#clientPrtpcoName").val() //의뢰업체명
            }

            if($("#crmCd").val()){
                data.prtpcoSn = $("#crmCd").val()
            }

            if(data.eqipmnGbnCmmnCdSn == null || data.eqipmnGbnCmmnCdSn == ''){
                alert("장비명의 첫번째 항목을 선택하세요.")
                return false;
            }else if(data.eqipmnMstSn == null || data.eqipmnMstSn == '') {
                alert("장비명의 두번째 항목을 입력하세요.")
                return false;
            }else if(data.usePdStrDe == null || data.usePdStrDe == '') {
                alert("사용기간 시작일을 입력하세요.")
                return false;
            //}else if(data.usePdEndDe == null || data.usePdEndDe == '') {
            //    alert("사용기간 종료일을 입력하세요.")
            //    return false;
            }else if(data.userName == null || data.userName == '') {
                alert("사용기간 사용자명을 입력하세요.")
                return false;
            }else if(data.operCn == null || data.operCn == '') {
                alert("작업내용을 입력하세요.")
                return false;
            }else if(data.useTime == null || data.useTime == '') {
                alert("사용시간을 입력하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == '') {
                alert("작성일자를 입력하세요.")
                return false;
            }else if(data.userSn == null || data.userSn == '') {
                alert("사용자를 선택하세요.")
                return false;
            }

            $.ajax({
                url : '/asset/setEquipmentUseInsert',
                data : data,
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

    fn_calTime : function(){
        let startTime = $("#time1").val();
        let endTime = $("#time2").val();
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = startTime.split(":")[0];
        var hour2 = endTime.split(":")[0];
        var min1 = startTime.split(":")[1];
        var min2 = endTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        var diffMin = diffSec / 1000 / 60 / 60;

        $("#useTime").val(Math.ceil(diffMin));
        equipmentUsePop.fn_EqipmnHUF(Math.ceil(diffMin));
    }
}



