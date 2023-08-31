/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서등록 팝업창
 */

var now = new Date();
var bookRegisPop = {
    fn_defaultScript: function () {
        $("#bkBuyDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#bkLgCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "CAMTIC", value: "0"}
            ],
            index: 0,
        });

        $("#bkMdCd").kendoDropDownList({
            dataTextField: "BK_CD_NM",
            dataValueField: "BK_MD_CD",
            dataSource: [
                {BK_CD_NM: "중분류를 선택하세요", BK_MD_CD: ""}
            ],
            select: function (){
                if($("#bkMdCd").val() == 0){
                    bookRegisPop.fn_changeBkMdCd();
                }
            },
            index: 0
        });

        $("#bkCd").kendoDropDownList({
            dataTextField: "BK_CD_NM",
            dataValueField: "BK_CD",
            dataSource: [
                {BK_CD_NM: "소분류를 선택하세요", BK_CD: ""}
            ],
            index: 0
        });

        bookRegisPop.fn_changeBkLgCd();
        customKendo.fn_textBox(["bkName", "bkWriter", "bkPubl", "bkCost", "bkCnt", "bkRepl", "bkSmry"]);

        var rsEmpList = customKendo.fn_customAjax("/user/getEmpList");
        var result = rsEmpList.list;

        result.unshift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        $("#bkBuyer").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        result.shift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        result.unshift({EMP_NAME_KR: "사용자", EMP_SEQ: ""})
        $("#bkUser").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        fn_deptSetting();

        result.shift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        result.unshift({EMP_NAME_KR: "사용자 선택", EMP_SEQ: ""})
        $("#bkMng").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        $("#bkMngSub").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        $("#bkCost, #bkCnt").bind("keyup keydown", function() {
            bookRegisPop.inputNumberFormat(this)
        });

        var getData = {
            bkSn : $("#bkSn").val()
        }
        if(getData.bkSn != "" && getData.bkSn != null){
            var sd = customKendo.fn_customAjax("/bookRegisPop/getData", getData);
            result = sd.rs;
            bookRegisPop.fn_setData(result);
        }

    },

    fn_setData : function(e){
        console.log(e)
        $("#bkLgCd").data("kendoDropDownList").value(e.BK_LG_CD);
        if($("#bkLgCd").val() == 0){
            bookRegisPop.fn_changeBkLgCd();
        }

        $("#bkMdCd").data("kendoDropDownList").value(e.BK_MD_CD);
        if($("#bkMdCd").val() != ''){
            bookRegisPop.fn_changeBkMdCd($("#bkMdCd").val());
        }
        $("#bkCd").data("kendoDropDownList").value(e.BK_CD);
        $("#bkName").val(e.BK_NAME);
        $("#bkWriter").val(e.BK_WRITER);
        $("#bkPubl").val(e.BK_PUBL);
        $("#bkCost").val(bookRegisPop.fn_comma(e.BK_BUY_COST));
        $("#bkCnt").val(e.BK_BUY_CNT);
        $("#dept").data("kendoDropDownList").value(e.BK_DEPT_SEQ);
        $("#bkBuyer").data("kendoDropDownList").value(e.BK_BUYER);
        $("#bkUser").data("kendoDropDownList").value(e.BK_USER);
        $("#bkRepl").val(e.BK_REPL);
        $("#bkMng").data("kendoDropDownList").value(e.BK_MNG_SEQ);
        $("#bkMngSub").data("kendoDropDownList").value(e.BK_MNG_SUB_SEQ);
        $("#bkBuyDt").val(e.BK_BUY_DT);
        $("#bkSmry").val(e.BK_SMRY);

    },

    inputNumberFormat: function (obj){
        obj.value = bookRegisPop.fn_comma(obj.value);
    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    fn_bkSave: function (key){
        if($("#bkCdName").val() == "") {
            alert("도서분류를 선택하지 않았습니다");
            return;
        }
        if($("#bkName").val() == "") {
            alert("도서명이 작성되지 않았습니다");
            return;
        }
        if($("#bkWriter").val() == "") {
            alert("저자가 작성되지 않았습니다");
            return;
        }
        if($("#bkPubl").val() == "") {
            alert("출판사가 작성되지 않았습니다");
            return;
        }
        if($("#bkCost").val() == "") {
            alert("구매가가 작성되지 않았습니다");
            return;
        }
        if($("#bkCnt").val() == "") {
            alert("구매수량이 작성되지 않았습니다");
            return;
        }
        if($("#bkBuyer").val() == "" || $("#bkUser").val() == "") {
            alert("구매자/사용자가 선택되지 않았습니다");
            return;
        }
        if($("#bkDeptSeq").val() == "") {
            alert("구매부서가 선택되지 않았습니다");
            return;
        }
        if($("#bkRepl").val() == "") {
            alert("비치장소가 작성되지 않았습니다");
            return;
        }
        if($("#bkMngSeq").val() == "") {
            alert("관리자(정)이 선택되지 않았습니다");
            return;
        }
        if($("#bkMngSubSeq").val() == "") {
            alert("관리자(부)가 선택되지 않았습니다");
            return;
        }

        let data = {
            bkLgCd : $("#bkLgCd").val(),
            bkLgCdName : $("#bkLgCd").data("kendoDropDownList").text(),
            bkMdCd : $("#bkMdCd").val(),
            bkMdCdName : $("#bkMdCd").data("kendoDropDownList").text(),
            bkCd : $("#bkCd").val(),
            bkCdName : $("#bkCd").data("kendoDropDownList").text(),
            bkName : $("#bkName").val(),
            bkWriter : $("#bkWriter").val(),
            bkPubl : $("#bkPubl").val(),
            bkCost : $("#bkCost").val().replace(/,/g, ''),
            bkCnt : $("#bkCnt").val().replace(/,/g, ''),
            bkBuyDt : $("#bkBuyDt").val(),
            bkBuyer : $("#bkBuyer").val(),
            bkBuyerName : $("#bkBuyer").data("kendoDropDownList").text(),
            bkUser : $("#bkUser").val(),
            bkUserName : $("#bkUser").data("kendoDropDownList").text(),
            bkDeptSeq : $("#dept").val(),
            bkDeptName : $("#dept").data("kendoDropDownList").text(),
            bkRepl : $("#bkRepl").val(),
            bkMngSeq : $("#bkMng").val(),
            bkMngName : $("#bkMng").data("kendoDropDownList").text(),
            bkMngSubSeq : $("#bkMngSub").val(),
            bkMngSubName : $("#bkMngSub").data("kendoDropDownList").text(),
            bkSmry : $("#bkSmry").val()
        }

        if(key != null && key != ""){
            data.bkSn = key;
        }

        $.ajax({
            url : "/inside/setBookInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                if(result.code == 200){
                    var formData = new FormData();
                    formData.append("menuCd", $("#menuCd").val());
                    formData.append("empSeq", $("#empSeq").val());
                    formData.append("bkSn", result.params.bkSn);
                    if($("#imgFile")[0].files.length == 1) { //개인사진
                        formData.append("imgFile", $("#imgFile")[0].files[0]);

                        $.ajax({
                            url: '/inside/setBookImgFile',
                            data: formData,
                            type: "post",
                            async: false,
                            datatype: "json",
                            contentType: false,
                            processData: false,
                            success: function () {
                                alert("저장이 완료되었습니다.");
                                opener.gridReload();
                                window.close();
                            },
                            error: function () {
                                alert("정보 등록 중 에러가 발생했습니다.");
                            }
                        });
                    } else {
                        alert("저장이 완료되었습니다.");
                        opener.gridReload();
                        window.close();
                    }
                }
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                //window.close();
            }
        });
        console.log(data);
    },

    fn_close : function (){
        window.close();
    },

    fn_changeBkLgCd: function (){
        var data = {
            bkLgCd : $("#bkLgCd").val()
        }
        var rs = customKendo.fn_customAjax("/bookCode/getMdCode", data);
        var dataSource = rs.rs;
        dataSource.unshift({BK_CD_NM: "중분류를 선택하세요.", BK_MD_CD: ""});
        var bkMdCd = $("#bkMdCd").data("kendoDropDownList");
        bkMdCd.setDataSource(dataSource);
        bkMdCd.bind("change", function(){
            var value = $("#bkMdCd").val();
            bookRegisPop.fn_changeBkMdCd(value);
        });
    },

    fn_changeBkMdCd : function (e){
        var bkCd = $("#bkCd").data("kendoDropDownList");
        var dataSource = [];
        var data = {
            bkLgCd : $("#bkLgCd").val(),
            bkMdCd : e
        }
        var rs = customKendo.fn_customAjax("/bookCode/getCode", data);
        console.log(rs);
        var dataSource = rs.rs;

        dataSource.unshift({BK_CD_NM: "소분류를 선택하세요", BK_CD: ""})
        bkCd.setDataSource(dataSource);
    },

    fn_bkDel: function(e){
        if( !confirm("삭제하시겠습니까?")){
            return false;
        }
        var data = {
            bkSn : e
        }

        $.ajax({
            url : "/inside/setBookDelete",
            data : data,
            type : "post",
            dataType : "json",
            success: function(e){
                alert("삭제되었습니다.");
                opener.parent.bookList.mainGrid();
                window.close();
            }
        })
    }
}



