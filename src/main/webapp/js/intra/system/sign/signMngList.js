let bustSum = 0;

var signMngList = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript: function(){
        signMngList.pageSet();
        signMngList.gridReload();
    },

    pageSet: function(){
        const ciKindList = [
            { CM_CODE_NM : "기관장", CM_CODE : "001" },
        ]
        customKendo.fn_dropDownList("kind", ciKindList, "CM_CODE_NM", "CM_CODE", 3);

        const useYNList = [
            { text: "사용", value: "1" },
            { text: "미사용", value: "2" }
        ]
        customKendo.fn_dropDownList("useYN", useYNList, "CM_CODE_NM", "CM_CODE");

        customKendo.fn_textBox(["txtSearch", "formCompName", "siName", "siDept", "authSelectedText", "siMemo"]);

        $("#authSelectedText").attr("readonly", true);

        $("#ciKind").kendoRadioGroup({
            items: [
                { label : "기관장", value : "001" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "001",
        });

        $("#active").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });
    },

    gridReload: function (){
        signMngList.global.searchAjaxData = {
            ciKindVal : $("#kind").data("kendoDropDownList").value(),
            active : $("#useYN").data("kendoDropDownList").value(),
            siName : $("#txtSearch").val()
        }

        signMngList.mainGrid("/sign/getSignInfoList", signMngList.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#signInfoGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 555,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            dataBound : function(e){
                const grid = this;
                grid.element.off('dbclick');

                grid.tbody.find("tr").dblclick(function (e) {
                    var dataItem = grid.dataItem($(this));
                    signMngList.dataSet(dataItem);
                });
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "FORM_COMP_NAME",
                    title : "회사",
                    width: 160
                }, {
                    field : "CI_KIND_VAL",
                    title : "종류",
                    width: 80,
                    template : function(e){
                        console.log(e);
                        if(e.CI_KIND_VAL == "001"){
                            return "기관장"
                        }else if(e.CI_KIND_VAL == "002"){
                            return "부서장"
                        }else {
                            return "관인생략"
                        }
                    }
                }, {
                    field : "SI_NAME",
                    title : "관인",
                    width: 160
                }, {
                    field : "ACTIVE",
                    title : "사용여부",
                    width: 80,
                    template : function(e){
                        console.log(e);
                        if(e.ACTIVE == "Y"){
                            return "사용"
                        }else{
                            return "미사용"
                        }
                    }
                }, {
                    title : "삭제",
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="signMngList.delBtn('+e.SIGN_SEQ+')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    },
                    width: 60
                }/*, {
                    field : "USE_FORM_NAME",
                    title : "사용범위",
                    width: 100
                }*/
            ]
        }).data("kendoGrid");
    },

    dataClear : function() {
        $("#signSeq").val("");
        $("#siName").val("");
        $("#ciKind").data("kendoRadioGroup").value("001");
        $("#active").data("kendoRadioGroup").value("Y");
        $("#authSelectedText").val("");
        $("#formIdList").val("");
        $("#siMemo").val("");

        $("#preview").attr("src", "");
        $("#preview").hide();
        $("#emptySign").show();
    },

    dataSet: function(data){
        console.log(data);
        $("#signSeq").val(data.SIGN_SEQ);
        $("#siName").val(data.SI_NAME);
        $("#ciKind").data("kendoRadioGroup").value(data.CI_KIND_VAL);
        $("#active").data("kendoRadioGroup").value(data.ACTIVE);
        $("#authSelectedText").val(data.USE_FORM_NAME);
        $("#formIdList").val(data.USE_FORM_VAL);
        $("#siMemo").val(data.REMARK_VAL);
        $("#preview").attr("src", data.FILE_NO);
        $("#preview").show();
        $("#emptySign").hide();
    },

    readURL : function(input) {
        signMngList.global.attFiles = $(input)[0].files;

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview').src = e.target.result;
                $("#emptySign").hide();
                $("#preview").show();
                console.log(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            document.getElementById('preview').src = "";
        }
    },

    saveBtn : function() {
        var formData = new FormData();
        formData.append("empSeq", $("#regEmpSeq").val());
        formData.append("formCompName", $("#formCompName").val());
        formData.append("siName", $("#siName").val());
        formData.append("ciKindVal", $("#ciKind").data("kendoRadioGroup").value());
        formData.append("active", $("#active").data("kendoRadioGroup").value());
        formData.append("useFormVal", $("#formIdList").val());
        formData.append("useFormName", $("#authSelectedText").val());
        formData.append("remarkVal", $("#siMemo").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        if(signMngList.global.attFiles != null){
            for(var i = 0; i < signMngList.global.attFiles.length; i++){
                formData.append("mpf", signMngList.global.attFiles[i]);
            }
        }

        if ($("#signSeq").val() != "") {
            formData.append("signSeq", $("#signSeq").val());
        }

        if(!confirm("저장하시겠습니까?")){
            return;
        }
        signMngList.setSignInfo(formData);
    },

    delBtn : function(key){
        if(!confirm("삭제하시겠습니까?")) {
            return;
        }

        var data = {
            signSeq : key,
        }

        $.ajax({
            url : "/sign/setSignInfoDel",
            type : "POST",
            data : data,
            dataType : 'json',
            traditional : true,
            success : function (rs){
                alert("삭제되었습니다.");
                signMngList.dataClear();
                signMngList.gridReload();
            }
        });
    },

    setSignInfo : function(formData){
        $.ajax({
            url : "/sign/setSignInfo",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : "multipart/form-data",
            async : false,
            success : function (rs){
                alert("저장되었습니다.");
                signMngList.dataClear();
                signMngList.gridReload();
            }
        });
    },

    formSelectPop : function() {
        window.open("/etc/formSelectPopup.do", 'window', "width=1525, height=1305, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    },

}