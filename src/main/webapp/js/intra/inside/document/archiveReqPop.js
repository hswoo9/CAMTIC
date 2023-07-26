var archiveReq = {
    init: function (){
        archiveReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_datePicker("docYear", 'decade', "yyyy", new Date());
        fn_deptSetting(2);
        customKendo.fn_textBox(["docNum", "empName", "docName", "disYear"]);
        $("#docYear, #empName").attr("readonly", true);

        $.ajax({
            url : "/document/getDocumentPlaceList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#visit").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        });

        $("#prePeriod").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: "" },
                {text: "1년", value: "1"},
                {text: "2년", value: "2"},
                {text: "3년", value: "3"},
                {text: "4년", value: "4"},
                {text: "5년", value: "5"}
            ],
            index: 0
        });

        $("#prePeriod").on("change", function (){
            str = parseInt($('#docYear').val());
            str1 = parseInt($('#prePeriod').val());

            $("#disYear").val(str + str1 - 1);
        });

        $("#docYear").on("change", function (){
            str = parseInt($('#docYear').val());
            str1 = parseInt($('#prePeriod').val());

            $("#disYear").val(str + str1 - 1);
        });
    },

    saveBtn: function(){
        let docYear = $("#docYear").val();
        let docNum = $("#docNum").val();
        let deptSn = $("#dept").val();
        let deptName = $("#dept").data("kendoDropDownList").text();
        let teamSn = $("#team").val();
        let teamName = $("#team").data("kendoDropDownList").text();
        let visit = $("#visit").data("kendoDropDownList").text();
        let managerSn = $("#empSeq").val();
        let managerName = $("#empName").val();
        let prePeriod = $("#prePeriod").val();
        let disYear = $("#disYear").val();
        let docName = $("#docName").val();

        let data = {
            docYear : docYear,
            docNum : docNum,
            deptSn : deptSn,
            deptName : deptName,
            teamSn : teamSn,
            teamName : teamName,
            visit : visit,
            managerSn : managerSn,
            managerName : managerName,
            prePeriod : prePeriod,
            disYear : disYear,
            docName : docName,
        }

        if(docNum == "") { alert("문서번호가 선택되지 않았습니다."); return; }
        if(visit == "") { alert("문서위치가 작성되지 않았습니다."); return; }
        if(docName == "") { alert("문서명이 작성되지 않았습니다."); return; }
        if(managerSn == "") { alert("등록자가 작성되지 않았습니다."); return; }
        if(prePeriod == "") { alert("보존년한이 작성되지 않았습니다."); return; }
        if(disYear == "") { alert("폐기년도가 작성되지 않았습니다."); return; }

        if($("#archiveSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            archiveReq.setArchiveInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            archiveReq.setArchiveUpdate(data);
        }
    },

    setArchiveInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setArchiveInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setArchiveUpdate: function(data){

    }
}