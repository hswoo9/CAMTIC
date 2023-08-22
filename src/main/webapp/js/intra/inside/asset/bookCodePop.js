/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서등록 팝업창
 */

var now = new Date();
var bookCdPop = {
    fn_defaultScript: function () {
        $("#bkLgCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "대분류를 선택하세요.", value: ""},
                {text: "CAMTIC", value: "0"}
            ],
            index: 0,
            select: function (){
                if($("#bkLgCd").val() == 0){
                    bookCdPop.fn_changeBkLgCd();
                }
            }
        });

        $("#bkLgCd").data("kendoDropDownList").bind("change", function(){
            // bookCdPop.fn_changeBkLgCd();
            if($("#bkLgCd").val() == ""){
                $("#bkMdCd").kendoDropDownList({
                    dataTextField: "BK_CD_NM",
                    dataValueField: "BK_MD_CD",
                    dataSource: [
                        {BK_CD_NM: "중분류를 선택하세요", BK_MD_CD: ""}
                    ],
                    index: 0
                });
            }
        })

        $("#bkMdCd").kendoDropDownList({
            dataTextField: "BK_CD_NM",
            dataValueField: "BK_MD_CD",
            dataSource: [
                {BK_CD_NM: "중분류를 선택하세요", BK_MD_CD: ""}
            ],
            index: 0
        });

        $("#cdValue").kendoTextBox();

        $("#cdValue").on("keyup", function(key){
            if(key.keyCode == 13){
                bookCdPop.addCode();
            }
        });
    },

    fn_changeBkLgCd: function (){
        var data = {
            bkLgCd : $("#bkLgCd").val()
        }
        console.log(data.bkLgCd);
        var rs = customKendo.fn_customAjax("/bookCode/getMdCode", data);
        console.log(rs);
        var dataSource = rs.rs;
        dataSource.unshift({BK_CD_NM: "중분류를 선택하세요.", BK_MD_CD: ""});
        var bkMdCd = $("#bkMdCd").data("kendoDropDownList");
        bkMdCd.setDataSource(dataSource);
    },

    addCode: function (){
        var data ={
            bkLgCd : $("#bkLgCd").val(),
            bkMdCd : $("#bkMdCd").val(),
            bkCdNm : $("#cdValue").val()
        }

        if(data.bkLgCd == ""){
            alert("대분류를 선택해주세요.");
            return false;
        }

        if(data.bkCdNm == ""){
            alert("코드명을 입력해주세요.");
            return false;
        }

        $.ajax({
            url : "/bookCode/setBookCode",
            data :data,
            type : "post",
            dataType : "json",
            success :function(rs){
                if(rs.code == 200){
                    alert("추가되었습니다.");
                    location.reload();
                }
            }
        })
    }
}



