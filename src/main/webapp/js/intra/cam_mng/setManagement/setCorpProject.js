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

        if($("#corpPjtSn").val() != ""){
            $("#saveBtn").css("display", "none");
            $("#modBtn").css("display", "");
            $("#approveBtn").css("display", "");
        }

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
                $("#pjtCd").val();
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
    }
}