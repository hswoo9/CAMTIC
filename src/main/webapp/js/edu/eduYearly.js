var eduCommon = {

    global : {
        allList : [],
        codeDropDown : [],
    },

    getDefaultScript : function(){
        $.ajax({
            url : getContextPath() + "/common/getUserInfoSetCodeList.do",
            type : "post",
            async: false,
            dataType : "json",
            success : function(rs){
                console.log(rs);
                eduCommon.global.allList = rs.rs;
            }
        });

        $.ajax({
            url : getContextPath() + "/edu/getCodeList",
            type : "post",
            async: false,
            dataType : "json",
            success : function(rs){
                eduCommon.global.codeDropDown = rs.rs;
            }
        });

        $("#commonTime").kendoTextBox({
            change: function(e){
                eduCommon.sumTotal("commonTime", e.value);
            }
        });
        $("#leadershipTime").kendoTextBox({
            change: function(e){
                eduCommon.sumTotal("leadershipTime", e.value);
            }
        });
        $("#dutyTime").kendoTextBox({
            change: function(e){
                eduCommon.sumTotal("dutyTime", e.value);
            }
        });
        $("#socialContributionTime").kendoTextBox({
            change: function(e){
                eduCommon.sumTotal("socialContributionTime", e.value);
            }
        });
        $("#totalTime").kendoTextBox();

        $("#strDate").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        $("#endDate").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        $("#educationYear").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        var now = new Date();	// 현재 날짜 및 시간
        var year = now.getFullYear();	// 연도
        $("#nowYear").text(year);
        // 교육기간 - 시작
        $("#strDateDay").kendoDatePicker({
            format : "yyyy-MM-dd",
            culture : "ko-KR",
            value : new Date(year, 0, 1)
        });

        // 교육기간 - 끝
        $("#endDateDay").kendoDatePicker({
            format : "yyyy-MM-dd",
            culture : "ko-KR",
            value : new Date(year, 5, 1)
        });


        $("#empDuty").kendoDropDownList({
            dataTextField: "DP_NAME",
            dataValueField: "DP_SEQ",
            dataSource : eduCommon.allCodeDataSource("DUTY")
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource : [
                {text : "수강과목명", value : "ED_TITLE"},
                {text : "교육기관명", value : "ED_ORG_NAME"}
            ]
        });

        $("#empDept").kendoDropDownList({
            dataTextField: "dept_name",
            dataValueField: "dept_seq",
            dataSource : eduCommon.allCodeDataSource("DEPT")
        });

        $("#empPosition").kendoDropDownList({
            dataTextField: "DP_NAME",
            dataValueField: "DP_SEQ",
            dataSource : eduCommon.allCodeDataSource("POSITION")
        });

        $("#eduEvalTarget").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource : [
                {text : "선택", value : ""},
                {text : "대상", value : "Y"},
                {text : "미대상", value : "N"}
            ]
        });

        $("#searchText").kendoTextBox();

        // mainGrid Checkbox
        $('.checkAll').kendoCheckBox({
            checked: false
        });

        $("#searchBtn").click(function(){
            eduCommon.gridReload();
        });

        // 교육종류
        $("#edKindCode").kendoDropDownList({
            dataTextField: "ED_DT_CODE_NM",
            dataValueField: "value",
            dataSource : eduCommon.edCodeDataSource("C01")
        });

        // 교육구분
        $("#edSecCode").kendoDropDownList({
            dataTextField: "ED_DT_CODE_NM",
            dataValueField: "value",
            dataSource : eduCommon.edCodeDataSource("C02")
        });

        // 교육유형
        $("#edTypeCode").kendoDropDownList({
            dataTextField: "ED_DT_CODE_NM",
            dataValueField: "value",
            dataSource : eduCommon.edCodeDataSource("C03")
        });

        // 직무분야
        $("#edJobTypeCode").kendoDropDownList({
            dataTextField: "ED_DT_CODE_NM",
            dataValueField: "value",
            dataSource : eduCommon.edCodeDataSource("C04")
        });


    },

    allCodeDataSource : function(code){

        var data = [];
        var defaultCode = "";
        switch (code){
            case "DUTY" :
                defaultCode = "직위";
                data.push({"DP_NAME": defaultCode, "DP_SEQ" : ""});
                var dutyList = eduCommon.global.allList.dutyList;
                for(var i = 0 ; i < dutyList.length ; i++){
                    data.push(dutyList[i]);
                }
                break
            case "POSITION" :
                defaultCode = "직급";
                data.push({"DP_NAME": defaultCode, "DP_SEQ" : ""});
                var positionList = eduCommon.global.allList.positionList;
                for(var i = 0 ; i < positionList.length ; i++){
                    data.push(positionList[i]);
                }
                break
            case "DEPT" :
                defaultCode = "부서";
                data.push({"dept_name": defaultCode, "dept_seq" : ""});
                var deptList = eduCommon.global.allList.deptList;
                for(var i = 0 ; i < deptList.length ; i++){
                    data.push(deptList[i]);
                }
                break
        }

        return data;
    },



    sumTotal : function(target, value){
        var returnTotalTime = 0;
        if(isNaN(value)){
            alert("숫자만 입력 가능합니다.");
            $("#" + target).data("kendoTextBox").value(0);
        }

        var commonTime = $("#commonTime").data("kendoTextBox").value();
        if(!isNaN(commonTime)){ returnTotalTime = returnTotalTime + Number(commonTime);}
        var leadershipTime = $("#leadershipTime").data("kendoTextBox").value();
        if(!isNaN(leadershipTime)){ returnTotalTime = returnTotalTime + Number(leadershipTime);}
        var dutyTime = $("#dutyTime").data("kendoTextBox").value();
        if(!isNaN(dutyTime)){ returnTotalTime = returnTotalTime + Number(dutyTime);}
        var socialContributionTime = $("#socialContributionTime").data("kendoTextBox").value();
        if(!isNaN(socialContributionTime)){ returnTotalTime = returnTotalTime + Number(socialContributionTime);}

        $("#totalTime").val(returnTotalTime);
    },

    edCodeDataSource : function(code){
        var data = [];
        var defaultCode = "";
        switch (code){
            case "C01" :
                defaultCode = "교육종류"
                break
            case "C02" :
                defaultCode = "교육구분"
                break
            case "C03" :
                defaultCode = "교육유형"
                break
            case "C04" :
                defaultCode = "직무분야"
                break
            default :
                defaultCode = "전체"
                break
        }

        data.push({"ED_DT_CODE_NM": defaultCode, "value" : ""});

        for(var i = 0 ; i < eduCommon.global.codeDropDown.length ; i++){
            eduCommon.global.codeDropDown[i].value = eduCommon.global.codeDropDown[i].ED_MC_CODE + eduCommon.global.codeDropDown[i].ED_MD_CODE + eduCommon.global.codeDropDown[i].ED_DT_CODE;
            if(eduCommon.global.codeDropDown[i].ED_MC_CODE + eduCommon.global.codeDropDown[i].ED_MD_CODE == code){
                data.push(eduCommon.global.codeDropDown[i]);
            }
        }

        return data;
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    userSearchPopup : function(){
        window.open('/common/userPopup.do?code=&no=' , '조직도', 'scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=875, height=700');
    },


}
