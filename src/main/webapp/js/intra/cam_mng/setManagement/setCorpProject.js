var setCorpPjt = {


    fn_defaultScript: function (){


        customKendo.fn_textBox(["pjtCd", "pjtNm", "linkPjt", "pjtSubNm", "deptName", "empName"])
        customKendo.fn_datePicker("strDt", "", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", "", "yyyy-MM-dd", new Date());



        $("input[name='sbjSepYn']").change(function(){
            if($("input[name='sbjSepYn']:checked").val() == "Y"){
                $("#checkboxDiv").show();
            }else{
                $("#checkboxDiv").hide();
            }
        });

        setCorpPjt.fn_setData();
    },

    fn_setData : function (){

        var parameters = {
            corpPjtSn : $("#corpPjtSn").val()
        }

        $.ajax({
            url : "/setManagement/getCorpProjectData",
            data : parameters,
            dataType : "json",
            success : function(rs){
                var rs = rs.data;

                console.log(rs);
                $("#pjtCd").val(rs.CORP_PJT_CD);
                $("#pjtNm").val(rs.CORP_PJT_NM);
                $("#linkPjt").val(rs.LINK_PJT);
                $("#strDt").val(rs.STR_DT);
                $("#endDt").val(rs.END_DT);
                if(rs.SBJ_SEP_YN == "Y"){
                    $("input[name='sbjSepYn'][value='Y']").prop("checked", true);
                }else{
                    $("input[name='sbjSepYn'][value='N']").prop("checked", true);
                }
                $("#pjtSubNm").val(rs.CORP_PJT_SUB_NM);
                $("#deptName").val(rs.PM_DEPT_NAME);
                $("#empName").val(rs.PM_EMP_NAME);
                $("#empSeq").val(rs.PM_EMP_SEQ);
                $("#deptSeq").val(rs.PM_DEPT_SEQ);

                setCorpPjt.fn_btnSet(rs);
            }
        });
    },

    fn_save: function (){
        var parameters = {
            pjtCd : $("#pjtCd").val(),
            pjtNm : $("#pjtNm").val(),
            linkPjt : $("#linkPjt").val(),
            strDt : $("#strDt").val(),
            endDt : $("#endDt").val(),
            sbjSep : $("input[name='sbjSepYn']:checked").val(),
            pjtSubNm : $("#pjtSubNm").val(),
            deptName : $("#deptName").val(),
            empName : $("#empName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            regEmpSeq : $("#regEmpSeq").val(),
        }

        if($("#corpPjtSn").val() != ""){
            parameters.corpPjtSn = $("#corpPjtSn").val();
        }

        if($("input[name='sbjSepYn']:checked").val() == "Y"){
            const checkBox = 'input[name="accountType"]:checked';
            const selectedElements = document.querySelectorAll(checkBox);

            let arr = new Array();
            selectedElements.forEach((el) => {
                let row = {
                    value: el.value,
                }
                arr.push(row);
            });

            if(arr.length == 0) {
                alert("사업비 항목이 선택되지 않았습니다.");
                return;
            }

            parameters.accountList = JSON.stringify(arr);
        }

        $.ajax({
            url : "/setManagement/setProject",
            data: parameters,
            type: "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    location.href="/setManagement/pop/setCorpProject.do?corpPjtSn="+rs.params.corpPjtSn;
                }
            }
        });
    },

    fn_request: function(status){
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep2").val();
        var supDepSub = $("#supDepSub2").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        if(supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(pjtStat == ""){
            alert("사업성격을 선택해주세요.");
            return;
        }
        if(pjtStatSub == ""){
            alert("사업성격1을 선택해주세요.");
            return;
        }

        const result = customKendo.fn_customAjax("/setManagement/setRequest", {
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            corpPjtSn : $("#corpPjtSn").val(),
            status : status
        });

        if(result.flag){
            alert("승인 요청이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("처리 중 오류가 발생하였습니다.");
        }

    },

    fn_approve: function(status){

        const result = customKendo.fn_customAjax("/setManagement/setApprove", {
            corpPjtSn : $("#corpPjtSn").val(),
            status : status
        });

        if(result.flag){
            alert("승인이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("처리 중 오류가 발생하였습니다.");
        }

    },

    fn_btnSet: function(pjtMap){
        if(pjtMap != null){
            const status = pjtMap.STATUS;

            if($("#mode").val() != "mng"){
                if(status == "0"){
                    $("#saveBtn").hide();
                    $("#modBtn").show();
                    $("#reqBtn").show();
                }else{
                    $("#saveBtn").hide();
                }
            }else{
                if(status == "10"){
                    $("#saveBtn").hide();
                    $("#appBtn").show();
                }else{
                    $("#saveBtn").hide();
                    $("#appBtn").hide();
                }
            }
        }
    }
}