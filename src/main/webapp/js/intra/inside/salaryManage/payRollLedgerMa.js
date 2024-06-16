var payRollLedgerMa = {

    global: {
        searchAjaxData : "",
        yearFlag : false
    },

    fn_defaultScript : function(){
        customKendo.fn_datePicker("searchYear", "year", "yyyy-MM", new Date());

        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "이름", value: "empName" },
                { text: "부서/팀", value: "deptName" },
                { text: "사업자", value: "buisness" },
            ],
            index: 0,
        });
        customKendo.fn_textBox(["searchValue"])

        payRollLedgerMa.gridReload();
    },

    gridReload : function() {
        payRollLedgerMa.global.searchAjaxData = {
            searchKeyWord : $("#searchKeyWord").val(),
            searchValue : $("#searchValue").val(),
            baseYear : $("#searchYear").val()
        }
        payRollLedgerMa.mainGrid('/salaryManage/getPayRollLedgerList.do', payRollLedgerMa.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            resizable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, 100],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (){
                        return '' +
                            '<input type="text" id="baseYearMonth"/>' +
                            '<input type="file" id="file" style="display: none" onchange="payRollLedgerMa.fileChange(this)"/>' +
                            '<input type="text" id="fileName" readonly class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="$(\'#file\').click()"/>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="$(\'#file\').click()">' +
                            '	<span class="k-button-text">파일선택</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.templateDownload()">' +
                            '	<span class="k-button-text">양식다운로드</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.fileUpload()">' +
                            '	<span class="k-button-text">업로드</span>' +
                            '</button>';
                    }
                }
            ],
            excel: {
                fileName:  '급여대장.xlsx',
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "BUISNESS",
                    title: "사업자",
                    width : 180
                }, {
                    field: "RETIREMENT_PEN",
                    title: "퇴직연금",
                    width : 120,
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.RETIREMENT_PEN);
                    }
                }, {
                    field: "",
                    title: "번호",
                    template: "#= ++record #",
                    width: 50
                }, {
                    field: "DEPT_NAME",
                    title: "부서/팀",
                    width : 180
                }, {
                    field: "EMP_NAME",
                    title: "이름",
                    width : 100,
                }, {
                    field: "JOIN_DATE",
                    title: "입사일자",
                    width : 120,
                }, {
                    field: "BASIC_SALARY",
                    title: "기본급",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.BASIC_SALARY);
                    },
                    width : 100,
                }, {
                    field: "FOOD_PAY",
                    title: "식대",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.FOOD_PAY);
                    },
                    width : 100,
                }, {
                    field: "EXTRA_PAY",
                    title: "수당",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.EXTRA_PAY);
                    },
                    width : 100,
                }, {
                    field: "TOTAL_PAY",
                    title: "지급합계",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.TOTAL_PAY);
                    },
                    width : 100,
                }, {
                    field: "NATIONAL_PEN",
                    title: "국민연금",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.NATIONAL_PEN);
                    },
                    width : 100,
                }, {
                    field: "HEALTH_INS",
                    title: "건강보험",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.HEALTH_INS);
                    },
                    width : 100,
                }, {
                    field: "CARE_INS",
                    title: "장기요양보험",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.CARE_INS);
                    },
                    width : 100,
                }, {
                    field: "EMPLOY_INS",
                    title: "고용보험",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.EMPLOY_INS);
                    },
                    width : 100,
                }, {
                    field: "SCIENCE_DEDUCTION",
                    title: "과학기술인공제",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.SCIENCE_DEDUCTION);
                    },
                    width : 120,
                }, {
                    field: "MEMBERSHIP_FEE",
                    title: "사우회비",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.MEMBERSHIP_FEE);
                    },
                    width : 100,
                }, {
                    field: "TRAVEL_FUND",
                    title: "여행기금",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.TRAVEL_FUND);
                    },
                    width : 100,
                }, {
                    field: "DORMITORY_FEE",
                    title: "기숙사비",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.DORMITORY_FEE);
                    },
                    width : 100,
                }, {
                    field: "INCOME_TAX",
                    title: "소득세",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.INCOME_TAX);
                    },
                    width : 100,
                }, {
                    field: "LOCAL_INCOME_TAX",
                    title: "지방소득세",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.LOCAL_INCOME_TAX);
                    },
                    width : 100,
                }, {
                    field: "SOCIAL_INS",
                    title: "4대보험 정산",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.SOCIAL_INS);
                    },
                    width : 100,
                }, {
                    field: "YEAR_TAX",
                    title: "연말정산소득세",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.YEAR_TAX);
                    },
                    width : 120,

                }, {
                    field: "YEAR_LOCAL_TAX",
                    title: "연말정산지방소득세",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.YEAR_LOCAL_TAX);
                    },
                    width : 140,
                }, {
                    field: "DEDUCTION",
                    title: "공제합계",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.DEDUCTION);
                    },
                    width : 100,
                }, {
                    field: "ACTUAL_PAY",
                    title: "실지급액",
                    attributes : {
                        style : "text-align: right;"
                    },
                    template: function (e) {
                        return comma(e.ACTUAL_PAY);
                    },
                    width : 100,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            }
        }).data("kendoGrid");

        if(!payRollLedgerMa.global.yearFlag){
            customKendo.fn_datePicker("baseYearMonth", "year", "yyyy-MM", new Date());
            payRollLedgerMa.global.yearFlag = true;
        }
    },

    fileChange : function(e){
        var file = $(e)[0].files[0];
        var fileExt = file.name.split(".")[file.name.split(".").length - 1];

        if($.inArray(fileExt, ['xls', 'xlsx']) == -1){
            alert("xls, xlsx 확장자만 업로드할 수 있습니다.");
            $(e).val("");
            return;
        }

        $("#fileName").val($(e)[0].files[0].name);
    },

    fileUpload : function(){
        if($("#baseYearMonth").val() == ""){
            alert("업로드 년월을 선택해주세요.");
            return;
        }

        if($("#file")[0].files.length == 0){
            alert("파일을 선택해주세요.");
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var formData = new FormData();
            formData.append("file", $("#file")[0].files[0]);
            formData.append("baseYearMonth", $("#baseYearMonth").val());
            formData.append("loginEmpSeq", $("#empSeq").val());
            $.ajax({
                url : '/inside/salaryManage/setExcelUpload.do',
                type : 'POST',
                data: formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                beforeSend : function(){
                    var maskHeight = $(document).height();
                    var maskWidth  = $(document).width();
                    var mask       = "<div id='mask' style='position:absolute; z-index:9999999999; background-color:#000000; display:none; left:0; top:0;'></div>";
                    var loadingDiv       = "<div id=\"loadingImg\" style=\"display: none;\"></div>";
                    var loadingImg = "<img src='/css/kendoui/Black/loading_2x.gif' id='imgTag' style='display: block; margin: 0px auto;'/>";
                    $('body').append(mask)
                    $('body').append(loadingDiv)

                    $('#loadingImg').css({
                        "position": "absolute",
                        "display": "block",
                        "margin": "0px auto",
                        "top": "50%",
                        "left": "50%",
                        "z-index": "10000000000",
                    });

                    $('#mask').css({
                        'width' : maskWidth,
                        'height': maskHeight,
                        'opacity' : '0.3'
                    });
                    $('#mask').show();
                    $('#loadingImg').append(loadingImg);
                    $('#loadingImg').show();
                },
                success : function(rs) {
                    if(rs.rs.errorRow != ""){
                        alert("[ " + rs.rs.errorRow + " ]사용자를 찾을 수 없습니다.\n" +
                            "[ " + rs.rs.errorRow + " ]사용자를 제외한 데이터가 저장되었습니다.");
                    }

                    if(rs.rs.error != ""){
                        alert(rs.rs.error);
                    }

                    $('#mask').remove();
                    $('#loadingImg').remove();
                    payRollLedgerMa.gridReload();
                },
            })
        }
    },

    templateDownload : function(){
        let filePath = "/upload/templateForm/payrollRegister.xlsx"
        let fileName = "급여대장업로드양식.xlsx";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }

}