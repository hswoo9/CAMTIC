/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 자산리스트 - 자산 추가
 */
var now = new Date();
var addAssetPop = {

    global: {
        codeDropDown : [{
            AST_MC_CODE_NM : "대분류",
            AST_MC_CODE : ""
        }],
        mdCode : [{
            AST_MD_CODE_NM : "중분류",
            AST_MD_CODE : ""
        }],
        dtCode : [{
            AST_DT_CODE_NM : "소분류",
            AST_DT_CODE : ""
        }],
        insideCodeDropDown : "",
    },

    fn_defaultScript: function () {
        addAssetPop.fn_astCodeSet();
        addAssetPop.fn_insideCodeSet();

        $("#select1").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "value",
            dataSource: addAssetPop.edCodeDataSource("B01")
        });

        $("#select2").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "value",
            dataSource: addAssetPop.edCodeDataSource("B02")
        });

        $('#select3').kendoDropDownList({
            dataTextField: "AST_MC_CODE_NM",
            dataValueField: "AST_MC_CODE",
            dataSource: addAssetPop.global.codeDropDown
        });

        $('#select3').on('change', function(){
            var data = {
                AST_MC_CODE : $('#select3').val(),
            }
            var tmp = customKendo.fn_customAjax('/inside/getAssetMdCodeList',data);
            addAssetPop.global.mdCode = [{
                AST_MD_CODE_NM : "중분류",
                AST_MD_CODE : ""
            }];
            addAssetPop.global.dtCode = [{
                AST_DT_CODE_NM : "소분류",
                AST_DT_CODE : ""
            }];
            $('#select5').data('kendoDropDownList').setDataSource(addAssetPop.global.dtCode);
            $('#select5').data('kendoDropDownList').select(0);
            $.each(tmp.rs, function(index, item) {
                addAssetPop.global.mdCode.push(item);
            })
            if(addAssetPop.global.mdCode.length > 1) {
                $('#select4').data('kendoDropDownList').setDataSource(addAssetPop.global.mdCode);
                $('#select4').data('kendoDropDownList').select(0);
            }else{
            }
        });

        $('#select4').kendoDropDownList({
            dataTextField: "AST_MD_CODE_NM",
            dataValueField: "AST_MD_CODE",
            dataSource: addAssetPop.global.mdCode
        });

        $('#select4').on('change', function(){
            var data = {
                AST_MC_CODE : $('#select3').val(),
                AST_MD_CODE : $('#select4').val(),
            }
            var tmp = customKendo.fn_customAjax('/inside/getAssetDtCodeList',data);
            addAssetPop.global.dtCode = [{
                AST_DT_CODE_NM : "소분류",
                AST_DT_CODE : ""
            }];
            $.each(tmp.rs, function(index, item) {
                addAssetPop.global.dtCode.push(item);
            })
            if(addAssetPop.global.dtCode.length > 1) {
                $('#select5').data('kendoDropDownList').setDataSource(addAssetPop.global.dtCode);
                $('#select5').data('kendoDropDownList').select(0);
            }else{
            }
        });

        $('#select5').kendoDropDownList({
            dataTextField: "AST_DT_CODE_NM",
            dataValueField: "AST_DT_CODE",
            dataSource: addAssetPop.global.dtCode
        });

        $("#addAssetStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "활용", value: "1" },
                { text: "불용·불용", value: "2" },
                { text: "불용·요정", value: "3" },
                { text: "불용·유휴", value: "4" },
                { text: "불용·부족", value: "5" },
                { text: "처분·폐기", value: "6" }
            ],
            index: 0
        });

        $("#assetName").kendoTextBox();
        $("#staffSlect").kendoTextBox();
        $("#purchasePrice").kendoTextBox();
        $("#standard").kendoTextBox();
        $("#name").kendoTextBox();
        $("#purchaseCompany").kendoTextBox();
        $("#company").kendoTextBox();
        $("#nation").kendoTextBox();
        $("#num").kendoTextBox();

        $("#unit").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "EA", value: "EA" },
                { text: "Copy", value: "Copy" },
                { text: "Set", value: "Set" },
                { text: "입력", value: "입력" }
            ],
            index: 0
        });

        $("#regisType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "개별등록", value: "개별등록" },
                { text: "일괄등록", value: "일괄등록" },
            ],
            index: 0
        });

        $("#barcodeType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "대", value: "대" },
                { text: "소", value: "소" },
            ],
            index: 0
        });

        $("#source").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "법인운영", value: "법인운영" },
                { text: "연구개발", value: "연구개발" },
                { text: "교육사업", value: "교육사업" },
                { text: "개발사업", value: "개발사업" },
                { text: "기능보강", value: "기능보강" },
                { text: "지원사업", value: "지원사업" },
                { text: "기타사업", value: "기타사업" }
            ],
            index: 0
        });

        $("#business").kendoTextBox();

        $("#installPlace").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "설치장소", value: "설치장소" },
                { text: "11B-대한드론축구협회", value: "11B-대한드론축구협회" },
                { text: "1B-1F-101", value: "1B-1F-101" },
                { text: "1B-1F-102", value: "1B-1F-102" },
                { text: "1B-1F-공용", value: "1B-1F-공용" }
            ],
            index: 0
        });

        $("#user").kendoTextBox();
        $("#usage").kendoTextBox();
        $("#remark").kendoTextBox();

    },

    rdTaskPopup : function() {
        var url = "/Inside/Pop/rdTaskPop.do";
        var name = "rdTaskPop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    fn_astCodeSet : function() {
        $.ajax({
            url : '/inside/getAssetMcCodeList',
            type : "post",
            async : false,
            dataType : "json",
            success : function(result) {
                $.each(result.rs, function(index, item){
                    addAssetPop.global.codeDropDown.push(item);
                })
                console.log(addAssetPop.global.codeDropDown);
            }
        })
    },

    fn_insideCodeSet : function() {
        $.ajax({
            url : '/inside/getInsideCodeList',
            type : "post",
            async : false,
            dataType : "json",
            success : function(result) {
                console.log(result);
                addAssetPop.global.insideCodeDropDown = result.rs;
            }
        })
    },

    edCodeDataSource : function(code) {
        var data = [];
        var defaultCode = "";
        if(code != ""){
            switch (code){
                case "B01" :
                    defaultCode = "자산소속"
                    break
                case "B02" :
                    defaultCode = "자산분류"
                    break
                case "B03" :
                    defaultCode = "자산상태"
                    break
            }
            data.push({"INSIDE_DT_CODE_NM": defaultCode, "value" : ""});
        }else {
            data.push({"INSIDE_DT_CODE_NM": "선택하세요", "value" : ""});
        }

        for(var i = 0 ; i < addAssetPop.global.insideCodeDropDown.length ; i++){
            addAssetPop.global.insideCodeDropDown[i].value = addAssetPop.global.insideCodeDropDown[i].INSIDE_MC_CODE + addAssetPop.global.insideCodeDropDown[i].INSIDE_MD_CODE + addAssetPop.global.insideCodeDropDown[i].INSIDE_DT_CODE;
            if(addAssetPop.global.insideCodeDropDown[i].INSIDE_MC_CODE + addAssetPop.global.insideCodeDropDown[i].INSIDE_MD_CODE == code){
                data.push(addAssetPop.global.insideCodeDropDown[i]);
            }
        }
        return data;
    },
    fn_saveAstInfo : function() {
        var data = {
            TEST1 : $("#select1").val(),
            TEST2 : $("#select2").val(),
            TEST3 : $("#select3").val(),
            TEST4 : $("#select4").val(),
            TEST5 : $("#select5").val(),
        }
        var test = customKendo.fn_customAjax('/inside/setAssetInfo',data);
        //console.log(test.rs);
    },

    fn_cancelAstPop : function() {
        window.close();
    }
}

var overWk = {
    fn_defaultScript : function(){

        $("#startDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#endDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

    }
}


