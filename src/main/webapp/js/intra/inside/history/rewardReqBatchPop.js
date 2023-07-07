var now = new Date();

var rewardReqBatchPop = {

    init : function(){
        rewardReqBatchPop.dataSet();
        rewardReqBatchPop.mainGrid();
    },

    dataSet() {
        customKendo.fn_textBox(["searchVal", "numberName"]);
        fn_deptSetting();
    },

    mainGrid : function() {
        var data = {
            deptSeq : $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val(),
            empName : $("#searchVal").val()
        }

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/user/getEmpList", data),
            scrollable: true,
            height: 481,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReqBatchPop.fn_selEmp()">' +
                            '	<span class="k-button-text">선택완료</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'checkUser\')" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 30,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 100,
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 60,
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            console.log(e);
        });
    },

    gridReload: function (){
        rewardReqBatchPop.mainGrid();
    },

    fn_selEmp: function(){
        var empArr = [];
        $("input[name='checkUser']").each(function(){
            if(this.checked){
                empArr.push(this.value);
            }
        });

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 100,
            transport: {
                read : {
                    url : "/user/getEmpSelList",
                    dataType : "json",
                    contentType:'application/json; charset=utf-8',
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    return JSON.stringify({"empArr" : empArr});
                }
            },
            schema : {
                data: function (data) {
                    console.log(data);
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
                error: function (data){
                    console.log(data);
                }
            },
        });


        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            height: 600,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rewardReqBatchPop.fn_saveApnt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="rewardReqBatchPop.fn_delApnt()">' +
                            '	<span class="k-button-text">취소<span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="rewardReqBatchPop.fn_checkAll()" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 50,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "ERP_EMP_SEQ",
                    title: "사번",
                    width: 100
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 100
                }, {
                    title: "포상구분",
                    template : function (row){
                        return "<input type='text' id='rewardTp"+row.EMP_SEQ+"' class='rewardTp' />";
                    }
                }, {
                    title: "포상일자",
                    template : function(row){
                        return "<input type='text' id='rewardDay"+row.EMP_SEQ+"' name='rewardDay' class='rewardDay'>";
                    },
                    width: 180
                }, {
                    title: "공적사항",
                    template : function(row){
                        return "<input type='text' id='rwdOfm"+row.EMP_SEQ+"' name='rwdOfm' class='rwdOfm'>";
                    },
                    width: 150
                }, {
                    title: "시행처",
                    template : function(row){
                        return "<input type='text' id='rwdStComp"+row.EMP_SEQ+"' name='rwdStComp' class='rwdStComp'>";
                    },
                    width: 150
                }, {
                    title: "스캔파일",
                    template : function(row){
                        return "<input type='file' id='rwdFile"+row.EMP_SEQ+"' name='rwdFile' class='rwdFile'>";
                    },
                    width: 180
                }, {
                    title: "비고",
                    template : function(row){
                        return "<input type='text' id='rwdEtc"+row.EMP_SEQ+"' name='rwdEtc' class='rwdEtc'>";
                    },
                    width: 150
                }
            ]
        }).data("kendoGrid");

        rewardReqBatchPop.fn_popGridSetting();
    },

    fn_popGridSetting : function() {
        $(".rwdEtc, .rwdSn, .rwdStComp, .rwdOfm").kendoTextBox();

        $(".rewardTp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "포상구분", value: ""},
                {text: "[내부표창] 공로상", value: "9"},
                {text: "[내부표창] 기타", value: "10"},
                {text: "[내부표창] 우수사원(개인)", value: "4"},
                {text: "[내부표창] 우수사원(단체)", value: "3"},
                {text: "[내부표창] 캠틱인(개인)", value: "2"},
                {text: "[내부표창] 캠틱인(단체)", value: "1"},
                {text: "[외부표창] 기타", value: "8"},
                {text: "[외부표창] 유관기관", value: "7"},
                {text: "[외부표창] 중앙정부", value: "5"},
                {text: "[외부표창] 지자체", value: "6"},
                {text: "[외부표창] 학교", value: "11"},
            ],
            index:0
        });

        $(".rewardDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    fn_saveApnt : function(){
        let arr = new Array();
        const grid = $("#popMainGrid").data("kendoGrid");
        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            if($(v).find('#rewardTp'+empSeq).data("kendoDropDownList").value() == "") {
                alert("포상구분 선택해주세요.");
                return;
            }
            let data = {
                empSeq            : empSeq,
                erpEmpSeq         : dataItem.ERP_EMP_SEQ,
                empName           : dataItem.EMP_NAME_KR,
                deptSeq           : dataItem.DEPT_SEQ,
                deptName          : dataItem.DEPT_NAME,
                teamSeq           : dataItem.TEAM_SEQ,
                teamName          : dataItem.TEAM_NAME,
                rewordType		  : $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").value(),
                rewordName		  : $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").text(),
                rewordDay         : $(v).find('#rewardDay'+empSeq).val(),
                rwdOfm            : $(v).find('#rwdOfm'+empSeq).val(),
                rwdStComp         : $(v).find('#rwdStComp'+empSeq).val(),
                rwdEtc            : $(v).find('#rwdEtc'+empSeq).val()
            }
            arr.push(data);
        });

        let empSeq = $("#empSeq").val();
        let numberName = $("#numberName").val();

        if(numberName == "") {
            alert("포상번호가 작성되지 않았습니다.");
            return;
        }

        let data = {
            rewardArr: JSON.stringify(arr),
            empSeq: empSeq,
            numberName: numberName
        };
        console.log("set reward DATA");
        console.log(arr);

        $.ajax({
            url : "/inside/setRewardInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("포상 등록이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                //window.close();
            }
        });
    },

    fn_delApnt : function(){
        var grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
        });

        rewardReqBatchPop.fn_popGridSetting();
    }
}
