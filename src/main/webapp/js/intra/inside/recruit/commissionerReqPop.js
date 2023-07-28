var commissionerReq = {

    init(){
        commissionerReq.dataSet();
    },

    dataSet(){
        customKendo.fn_textBox(["id", "pwd", "name", "firstRrnName", "secondRrnName", "telNum", "email", "belong", "dutyPosition", "bmk"]);

        $("#gender").kendoRadioGroup({
            items: [
                { label : "남", value : "M" },
                { label : "여", value : "F" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "M",
        }).data("kendoRadioGroup");

        //$("#applyOverWorkType").data("kendoRadioGroup").value($("#APPLY_OVER_WORK_TYPE").val());
    },

    saveBtn(){
        let id = $("#id").val();
        let pwd = $("#pwd").val();
        let name = $("#name").val();
        let firstRrnName = $("#firstRrnName").val();
        let secondRrnName = $("#secondRrnName").val();
        let telNum = $("#telNum").val();
        let email = $("#email").val();
        let belong = $("#belong").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let gender = $("#gender").data("kendoRadioGroup").value();
        let dutyPosition = $("#dutyPosition").val();
        let bmk = $("#bmk").val();

        let data = {
            id: id,
            pwd: pwd,
            name: name,
            firstRrnName: firstRrnName,
            secondRrnName: secondRrnName,
            telNum: telNum,
            email: email,
            belong: belong,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            gender : gender,
            dutyPosition : dutyPosition,
            bmk : bmk
        }

        if(id == ""){ alert("임시아이디가 작성되지 않았습니다."); return;}
        if(pwd == ""){ alert("임시비밀번호가 작성되지 않았습니다."); return;}
        if(name == ""){ alert("성명 작성되지 않았습니다."); return;}
        if(firstRrnName == "") { alert("주민등록번호 앞자리가 작성되지 않았습니다."); return;}
        if(secondRrnName == "") { alert("주민등록번호 뒷자리가 작성되지 않았습니다."); return;}
        if(gender == "") { alert("직급(직책)이 작성되지 않았습니다."); return;}

        if(!confirm("평가위원을 저장하시겠습니까?")){
            return;
        }
        commissionerReq.setCommissionerInsert(data);
    },

    setCommissionerInsert(data){
        $.ajax({
            url : "/inside/setCommissionerInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("평가위원이 저장되었습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}

