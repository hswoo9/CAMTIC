var qrCodeSet = {


    fn_defaultScript : function (){

        var positionDs = customKendo.fn_customAjax("/inside/getClassPositionList");
        $("#positionClass").kendoDropDownList({
            dataTextField: "AST_CP_CODE_NM",
            dataValueField: "AST_CP_CODE",
            dataSource: positionDs.rs,
            index: 0
        });

        var divisionDs = customKendo.fn_customAjax("/inside/getClassDivisionList");
        $("#assetDivision").kendoDropDownList({
            dataTextField: "AST_TYPE_CODE_NM",
            dataValueField: "AST_TYPE_CODE",
            dataSource: divisionDs.rs,
            index: 0
        });

        $("#ctgB").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: [
                {AST_CODE_NM : "중분류를 선택하세요.", AST_CODE : ""}
            ],
            change : function (e){
                console.log(this.dataItem());
                var ctgCDs = customKendo.fn_customAjax("/inside/getClassCtgBList", {astUpperCode : this.dataItem().AST_CODE_ID});
                ctgCDs.rs.unshift({"AST_CODE_NM" : "소분류를 선택하세요.", "AST_CODE" : ""})
                $("#ctgC").data("kendoDropDownList").setDataSource(ctgCDs.rs);
            }
        });

        $("#ctgC").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: [
                {AST_CODE_NM : "소분류를 선택하세요.", AST_CODE : ""}
            ],
        });

        var ctgADs = customKendo.fn_customAjax("/inside/getClassCtgAList")
        ctgADs.rs.unshift({"AST_CODE_NM" : "대분류를 선택하세요.", "AST_CODE" : ""})
        $("#ctgA").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: ctgADs.rs,
            index: 0,
            change : function (e){
                var ctgBDs = customKendo.fn_customAjax("/inside/getClassCtgBList", {astUpperCode : this.dataItem().AST_CODE_ID});
                ctgBDs.rs.unshift({"AST_CODE_NM" : "중분류를 선택하세요.", "AST_CODE" : ""})
                $("#ctgB").data("kendoDropDownList").setDataSource(ctgBDs.rs);
            }
        });

        customKendo.fn_textBox(["prodName", "modelNm"]);

        customKendo.fn_datePicker("prodByDt", "depth", "yyyy-MM-dd", new Date())

        let projectDataSource = [
            { text: "해당없음", value: "0" },
            { text: "연구개발", value: "1" },
            { text: "개발사업", value: "2" },
            { text: "교육사업", value: "3" },
            { text: "일자리사업", value: "4" },
            { text: "지원사업", value: "5" },
            { text: "평생학습", value: "6" },
            { text: "캠스타트업", value: "7" }
        ]

        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 2);
        $("#project").data("kendoDropDownList").bind("change", function(){
            if($("#project").val() == 0 || $("#project").val() == ""){
                $("#busnLine").css("display", "none");
            } else {
                $("#busnLine").css("display", "");
            }
        })

    },

    pad:function(n, width){
        n = n + '';

        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    fn_save : function (){
        var data = {
            positionClass : $("#positionClass").val(), // 소속관리
            assetDivision : $("#assetDivision").val(), // 구분관리
            ctgA : $("#ctgA").val(),                   // 대분류
            ctgB : $("#ctgB").val(),                   // 중분류
            ctgC : $("#ctgC").val(),                   // 소분류
            modelNm : $("#modelNm").val(),             // 자금출처
            prodName : $("#prodName").val(),           // 제품명
            prodBuyDt : $("#prodByDt").val(),           // 취득일(구매일)
            empSeq : $("#empSeq").val()
        }

        data.code = data.positionClass + data.assetDivision + data.ctgA + data.ctgB + data.ctgC;

        var rs = customKendo.fn_customAjax("/asset/cntQrCodeGroup", data);
        data.qrCd = data.code + "-" + qrCodeSet.pad(rs.rs, 3);
        console.log();
        if(data.ctgA == "" || data.ctgA == null
            || data.ctgB == "" || data.ctgB == null
            || data.ctgC == "" || data.ctgC == null){
            alert("카테고리를 선택해주세요.");
            return false;
        }

        if(data.modelNm == "" || data.modelNm == null){
            alert("자금출처를 입력해주세요.");
            return false;
        }

        if (data.prodName == "" || data.prodName == null){
            alert("자산명을 입력해주세요.");
            return false;
        }

        data.data = JSON.stringify(data);

        $.ajax({
            url: "/asset/qrCodeSet",
            type: "post",
            data: data,
            dataType: "json",
            success: function (data) {
                alert("성공!");
                opener.parent.qrCode.mainGrid();
            }
        })

    }
}