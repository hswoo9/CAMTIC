var regCardToPop = {

    global : {

    },

    fn_defaultScript : function (){

        customKendo.fn_textBox(["trNm", "pjtNm", "empName", "cardToPurpose2", "hrBizVisitCrm", "purcReqPurpose"]);
        customKendo.fn_datePicker("cardToDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("cardFromDe", "depth", "yyyy-MM-dd", new Date());

        $("#cardToTime, #cardFromTime").kendoTimePicker({
            format: "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#cardToPurpose").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "출장", value : "출장"},
                {text : "구매", value : "구매"},
                {text : "회의", value : "회의"},
                {text : "영업", value : "영업"},
                {text : "식대", value : "식대"},
                {text : "기타", value : "기타"},
            ],
            dataTextField : "text",
            dataValueField : "value",
            change : function(e){
                console.log(this.value())
                if(this.value() == "기타"){
                    $("#cardToPurpose2Div").css("display", "");
                    $("#cardToBustripDiv").css("display", "none");
                    $("#cardToMeeting").css("display", "none");
                    $("#cardToPurcDiv").css("display", "none");
                    $("#hrBizReqId").val("");
                    $("#hrBizVisitCrm").val("");
                } else if(this.value() == "출장"){
                    $("#cardToBustripDiv").css("display", "");
                    $("#cardToPurcDiv").css("display", "none");
                    $("#cardToMeeting").css("display", "none");
                    $("#cardToPurpose2Div").css("display", "none");
                } else if(this.value() == "구매"){
                    $("#cardToPurcDiv").css("display", "");
                    $("#cardToPurpose2Div").css("display", "none");
                    $("#cardToBustripDiv").css("display", "none");
                    $("#cardToMeeting").css("display", "none");
                }else if(this.value() == "회의"){
                    $("#cardToPurpose2Div").css("display", "none");
                    $("#cardToBustripDiv").css("display", "none");
                    $("#cardToPurcDiv").css("display", "none");
                    $("#hrBizReqId").val("");
                    $("#hrBizVisitCrm").val("");
                    $("#cardToMeeting").css("display", "");
                } else {
                    $("#cardToPurpose2Div").css("display", "none");
                    $("#cardToBustripDiv").css("display", "none");
                    $("#cardToMeeting").css("display", "none");
                    $("#cardToPurcDiv").css("display", "none");
                    $("#hrBizReqId").val("");
                    $("#hrBizVisitCrm").val("");
                }
            }
        });

        $("#businessYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "해당없음", value : "N"},
                {text : "사업선택", value : "Y"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        if($("#cardToSn").val() != ""){
            regCardToPop.fn_dataSet();
        }
    },

    fn_dataSet : function (){
        var data = {
            cardToSn : $("#cardToSn").val()
        }

        if($("#cardToSn").val() != ""){
            $.ajax({
                url : "/card/getCardToInfo",
                data : data,
                dataType : "json",
                success : function(rs){
                    var rs = rs.cardInfo;

                    $("#trCd").val(rs.TR_CD);
                    $("#trNm").val(rs.TR_NM);
                    $("#cardToDe").val(rs.CARD_TO_DE);
                    $("#empSeq").val(rs.USE_EMP_SEQ);
                    $("#empName").val(rs.USE_EMP_NAME);
                    $("#jiroNm").val(rs.JIRO_NM);
                    $("#baNb").val(rs.BA_NB);
                    $("#depositor").val(rs.DEPOSITOR);
                    $("#cardBaNb").val(rs.CARD_BA_NB);
                    $("#regEmpSeq").val(rs.REG_EMP_SEQ);

                    $("#cardToTitle").text("반출/사용 수정");

                    $("#saveBtn").css("display", "none");
                    $("#modBtn").css("display", "");
                }
            });
        }
    },

    fn_businessChk : function (){
        if($("#businessYn").val() == "Y"){
            $("#busWrap").show();
        } else {
            $("#busWrap").hide();
        }
    },

    fn_popRegDet : function (v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_save : function (){
        var checkFlag = true;

        $.ajax({
            url : '/card/getCardUseCheck',
            type : 'POST',
            data: {cardBaNb : $("#cardBaNb").val()},
            dataType : "json",
            async : false,
            success: function(e) {
                var checkCnt = 0;

                checkCnt = e.checkCnt;

                if(checkCnt > 0){
                    alert("사용중인 카드입니다.");
                    fn_selCardInfo("", "", "", "", "", "", "", ""); // 카드정보 초기화
                    checkFlag = false;
                    return;
                }
            }
        });

        if(!checkFlag){return;}

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),             // 반출날짜
            cardToTime: $("#cardToTime").val(),         // 반출시간
            cardFromDe: $("#cardFromDe").val(),           // 반납예정날짜
            cardFromTime: $("#cardFromTime").val(),   // 반납예정시간
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            cardBaNb: $("#cardBaNb").val(),     // 카드번호
            cardToPurpose : $("#cardToPurpose").val(),  // 반출목적
            businessYn : $("#businessYn").val(),  // 관련사업유무
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            pjtNm : $("#pjtNm").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            frKey : null,
            visitCrm : $("#hrBizVisitCrm").val(),
        }

        if($("#cardToPurpose").val() == "출장"){
            parameters.frKey = $("#hrBizReqId").val();

            if(parameters.frKey == ""){
                alert("출장신청서를 선택해주세요.");
                return;
            }
        } else if($("#cardToPurpose").val() == "구매"){
            if($("#purcSn").val() != ""){
                parameters.frKey = $("#purcSn").val();
            } else {
                parameters.frKey = null;
            }
        }

        if(parameters.trNm == ""){
            alert("카드를 선택해주세요.");
            return;
        }

        if(parameters.empName == ""){
            alert("신청자를 선택해주세요.");
            return;
        }

        if(parameters.cardToPurpose == ""){
            alert("반출목적을 선택해주세요.");
            return;
        }

        if(parameters.cardToPurpose == "출장" && parameters.hrBizReqId == ""){
            alert("출장내역을 선택해주세요.");
            return;
        }

        if(parameters.businessYn == ""){
            alert("관련사업을 선택해주세요.");
            return;
        }

        if(parameters.businessYn == "Y" && parameters.pjtCd == ""){
            alert("관련사업을 선택해주세요.");
            return;
        }

        if(parameters.cardToPurpose == "기타"){
            if($("#cardToPurpose2").val() == ""){
                alert("반출목적을 입력해주세요.");
                return;
            }
            parameters.cardToPurpose = $("#cardToPurpose2").val()
        }

        console.log(parameters.frKey);


        $.ajax({
            url : "/card/saveRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.statementList.mainGrid();
                    opener.parent.$("#mainHistGrid").css("display", "none");

                    if($("#chkMeeting").prop("checked")){

                        var url = "/card/pop/regMeeting.do?cardToSn=" + rs.params.cardToSn;

                        var name = "blank";
                        var option = "width = 1000, height = 700, top = 100, left = 300, location = no"
                        var popup = window.open(url, name, option);
                    }
                    window.close();

                }
            }
        });
    },

    fn_update : function (){
        if(!confirm("수정하시겠습니까?")){
            return;
        }


        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            jiroNm: $("#jiroNm").val(),
            baNb: $("#baNb").val(),
            depositor: $("#depositor").val(),
            cardBaNb: $("#cardBaNb").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            cardToSn : $("#cardToSn").val()
        }

        if(parameters.trNm == ""){
            alert("카드를 선택해주세요.");
            return;
        }

        if(parameters.empName == ""){
            alert("신청자를 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/card/updRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("수정되었습니다.");
                    opener.parent.statementList.mainGrid();
                    window.close();
                }
            }
        })
    },

    fn_projectPop : function (){
        var url = "/project/pop/g20ProjectView.do?";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_bustripPop : function (){
        var url = "/bustrip/pop/cardToBustripListView.do?";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_purcPop : function (){
        var url = "/purc/pop/purcListView.do";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_selBustrip : function (dataItem){
        $("#hrBizReqId").val(dataItem.HR_BIZ_REQ_ID);
        $("#hrBizVisitCrm").val(dataItem.VISIT_CRM);
        $("#cardToDe").val(dataItem.TRIP_DAY_FR);
        $("#cardToTime").val(dataItem.TRIP_TIME_FR);
        $("#cardFromDe").val(dataItem.TRIP_DAY_TO);
        $("#cardFromTime").val(dataItem.TRIP_TIME_TO);

        if(dataItem.PJT_SN){
            $("#pjtSn").val(dataItem.PJT_SN);
            $("#pjtNm").val(dataItem.BUSN_NAME);
            $("#pjtCd").val(dataItem.PJT_CD);

            $("#businessYn").data("kendoDropDownList").value('Y');
        } else {
            $("#businessYn").data("kendoDropDownList").value('N');
        }

        regCardToPop.fn_businessChk();
    },

    fn_selPurc: function (key, purcReqPurpose){
        $("#purcSn").val(key);
        $("#purcReqPurpose").val(purcReqPurpose);
    }
}