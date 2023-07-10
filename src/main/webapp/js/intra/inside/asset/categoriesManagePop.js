/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 > 카테고리관리 - 카테고리 관리 추가 팝업페이지
 */
var categoriesManagePop = {
    global : {
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        if($("#categoryType").val() == "categoryA"){
            $("#titleName").text("카테고리(대) 추가");
        }else if($("#categoryType").val() == "categoryB"){
            $("#titleName").text("카테고리(중) 추가");
        }else{
            $("#titleName").text("카테고리(소) 추가");
        }

        categoriesManagePop.makeTableInit();

        if($("#mod").val() == "Y"){
            categoriesManagePop.modDataInit()
        }
    },

    makeTableInit : function(){
        var html = "";

        if($("#categoryType").val() == "categoryA"){
            html += "<tr>" +
                        '<th scope="row" className="text-center th-color">' +
                            '<span className="red-star"></span>카테고리(대)' +
                        '</th>' +
                        '<td>' +
                            '<input type="text" id="astCodeNm" style="width: 100%;">' +
                        '</td>' +
                        '<th scope="row" className="text-center th-color">' +
                            '<span className="red-star"></span>코드' +
                        '</th>' +
                        '<td>' +
                            '<input type="text" id="astCode" style="width: 100%;">' +
                        '</td>' +
                     "</tr>";
        }else if($("#categoryType").val() == "categoryB"){
            html += "<tr>" +
                        '<th scope="row" className="text-center th-color">' +
                            '<span className="red-star"></span>카테고리(중)' +
                        '</th>' +
                        '<td colspan="2">' +
                            '<input type="text" id="astCodeNm" style="width: 100%;">' +
                        '</td>' +
                    "</tr>";
        }else{
            html += "<tr>" +
                        "<th scope=\"row\" className=\"text-center th-color\">" +
                            "<span className=\"red-star\"></span>카테고리(소)" +
                        "</th>" +
                        "<td>" +
                            "<input type=\"text\" id=\"astCodeNm\" style=\"width: 100%;\">" +
                        "</td>" +
                        "<th scope=\"row\" className=\"text-center th-color\">" +
                            "<span className=\"red-star\"></span>상각법" +
                        "</th>" +
                        "<td>" +
                            "<input type=\"text\" id=\"astDepreType\">" +
                        "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th scope=\"row\" className=\"text-center th-color\">" +
                            "<span className=\"red-star\"></span>상각률" +
                        "</th>" +
                        "<td>" +
                            "<input type=\"text\" id=\"astDeprePercent\" style=\"text-align: right;width: 90%\"> %" +
                        "</td>" +
                        "<th scope=\"row\" className=\"text-center th-color\">" +
                            "<span className=\"red-star\"></span>내용년한" +
                        "</th>" +
                        "<td colSpan=\"3\">" +
                            "<input type=\"text\" id=\"astUseYear\" style=\"width: 30%; text-align: right;\">년" +
                        "</td>" +
                    "</tr>";
        }

        $("#addCodeTbody").append(html);

        $("#astDepreType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "정액법", value: "1"},
                {text: "정률법", value: "2"},
                {text: "연부금", value: "3"}
            ],
            index: 0
        });

        customKendo.fn_textBox(["astCodeNm", "astCode", "astDeprePercent", "astUseYear"])
    },

    modDataInit : function(){
        var result = customKendo.fn_customAjax("/asset/getAstCategory.do", {astCodeId : $("#astCodeId").val()})
        if(result.flag){
            $("#astCodeId").val(result.data.AST_CODE_ID);
            $("#astUpperCode").val(result.data.AST_UPPER_CODE);
            $("#astCodeNm").val(result.data.AST_CODE_NM);
            $("#astCode").val(result.data.AST_CODE);


            $("#astDepreType").val(result.data.AST_DEPRE_TYPE);
            $("#astDeprePercent").val(result.data.AST_DEPRE_PERCENT);
            $("#astUseYear").val(result.data.AST_USE_YEAR);
        }
    },

    setCategoryCode : function(){
        categoriesManagePop.global.saveAjaxData = {
            astUpperCode : $("#astUpperCode").val(),
            astCodeId : $("#astCodeId").val(),
            astCode : $("#astCode").val(),
            astCodeNm : $("#astCodeNm").val(),
            astDepreType : $("#astDepreType").val(),
            astDeprePercent : $("#astDeprePercent").val(),
            astUseYear : $("#astUseYear").val(),
            empSeq : $("#empSeq").val(),
            categoryType : $("#categoryType").val()
        }

        var result = customKendo.fn_customAjax("/asset/setCategoryCode.do", categoriesManagePop.global.saveAjaxData);
        if(result.flag){
            alert("등록되었습니다.");
            if($("#categoryType").val() == "categoryA"){
                opener.parent.classManage.categoryGridReload();
            }else if($("#categoryType").val() == "categoryB") {
                opener.parent.classManage.categoryAddRow("categoryGridA", $("#astUpperCode").val());
            }else{
                opener.parent.classManage.categoryAddRow("categoryGridB", $("#astUpperCode").val());
            }
            window.close();
        }
    }
}

