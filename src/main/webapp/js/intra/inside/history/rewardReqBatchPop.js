const rewardBatch = {
    global: {
        userArr : [],
        nowUserArr: [],
        editDataSource: {}
    },

    init: function(){
        rewardBatch.mainGrid();
        rewardBatch.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchVal", "numberName"]);

        $("#rewardAll").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
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
                {text: "[외부표창] 학교", value: "11"}
            ],
            index: 0,
            change: rewardBatch.changeRewardAll
        });
    },

    changeRewardAll: function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            $("#rewardTp"+empSeq).data("kendoDropDownList").value($("#rewardAll").val());
        });
    },

    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/user/getEmpList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empName = $("#searchVal").val()
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 600,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (){
                        return  '<span>이름</span>' +
                            '	<input type="text" id="searchVal" class="searchVal" style="width: 200px;" onkeypress="if(window.event.keyCode==13){rewardBatch.mainGrid();}">' ;
                    }
                }, {
                    name : 'button',
                    template : function (){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardBatch.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardBatch.fn_selEmp()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkEmpAll" name="checkEmpAll" onclick="fn_checkAll(\'checkEmpAll\', \'checkEmp\')" style="position: relative; top : 2px"/>',
                    template: function(row){
                        return "<input type='checkbox' id='chk"+row.EMP_SEQ+"' name='checkEmp' value='"+row.EMP_SEQ+"' style='position: relative; top: 2px;' />"
                    },
                    width: 30,
                    attribute: {
                        style: "text-align: center",
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

        $("#popMainGrid").kendoGrid({
            dataSource: rewardBatch.global.editDataSource,
            scrollable: true,
            height: 600,
            toolbar: [
                {
                    name: 'text',
                    template: function(){
                        return '<span>포상번호</span>' +
                            '	<input type="text" id="numberName" class="defaultVal" style="width: 150px;">' ;
                    }
                }, {
                    name: 'text',
                    template: function(){
                        return '<span>포상구분 일괄변경</span>' +
                            '	<input type="text" id="rewardAll" style="width: 150px;">';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rewardBatch.fn_saveApnt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="rewardBatch.fn_delApnt()">' +
                            '	<span class="k-button-text">삭제<span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="rewardBatch.fn_delApntAll()">' +
                            '	<span class="k-button-text">초기화<span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'checkUser\')" style="position: relative; top: 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style='position: relative; top: 2px;'/>"
                    },
                    width: 40,
                    attribute: {
                        style: "text-align:center",
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
                        if(row.REWARD_TP != null){
                            return "<input type='text' id='rewardTp"+row.EMP_SEQ+"' class='formData rewardTp' value='"+row.REWARD_TP+"'>";
                        }else{
                            return "<input type='text' id='rewardTp"+row.EMP_SEQ+"' class='formData rewardTp'>";
                        }
                    }
                }, {
                    title: "포상일자",
                    template : function(row){
                        if(row.REWARD_DAY != null){
                            return "<input type='text' id='rewardDay"+row.EMP_SEQ+"' name='rewardDay' class='formData rewardDay' value='"+row.REWARD_DAY+"'>";
                        }else{
                            return "<input type='text' id='rewardDay"+row.EMP_SEQ+"' name='rewardDay' class='formData rewardDay'>";
                        }
                    },
                    width: 180
                }, {
                    title: "공적사항",
                    template : function(row){
                        if(row.RWD_OFM != null){
                            return "<input type='text' id='rwdOfm"+row.EMP_SEQ+"' name='rwdOfm' class='formData rwdOfm' value='"+row.RWD_OFM+"'>";
                        }else{
                            return "<input type='text' id='rwdOfm"+row.EMP_SEQ+"' name='rwdOfm' class='formData rwdOfm'>";
                        }
                    },
                    width: 150
                }, {
                    title: "시행처",
                    template : function(row){
                        if(row.RWD_ST_COMP != null){
                            return "<input type='text' id='rwdStComp"+row.EMP_SEQ+"' name='rwdStComp' class='formData rwdStComp' value='"+row.RWD_ST_COMP+"'>";
                        }else{
                            return "<input type='text' id='rwdStComp"+row.EMP_SEQ+"' name='rwdStComp' class='formData rwdStComp'>";
                        }
                    },
                    width: 150
                }, {
                    title: "스캔파일",
                    template : function(row){
                        return "<input type='file' id='fileList"+row.EMP_SEQ+"' name='fileList' multiple/>";
                    },
                    width: 180
                }, {
                    title: "비고",
                    template : function(row){
                        if(row.RWD_ETC != null){
                            return "<input type='text' id='rwdEtc"+row.EMP_SEQ+"' name='rwdEtc' class='formData rwdEtc' value='"+row.RWD_ETC+"'>";
                        }else{
                            return "<input type='text' id='rwdEtc"+row.EMP_SEQ+"' name='rwdEtc' class='formData rwdEtc'>";
                        }
                    },
                    width: 150
                }
            ]
        }).data("kendoGrid");

        rewardBatch.dataBinding();
    },

    dataBinding: function(){
        $(document).on("focusout change", ".formData", function(){
            var dataItem = $("#popMainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            var rewardTp = $("#rewardTp"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var rewardDay = $("#rewardDay"+dataItem.EMP_SEQ).val();
            var rwdOfm = $("#rwdOfm"+dataItem.EMP_SEQ).val();
            var rwdStComp = $("#rwdStComp"+dataItem.EMP_SEQ).val();
            var rwdEtc = $("#rwdEtc"+dataItem.EMP_SEQ).val();

            $.each(rewardBatch.global.editDataSource.data, function(i, v){
                if(v.EMP_SEQ == dataItem.EMP_SEQ){
                    v.REWARD_TP = rewardTp;
                    v.REWARD_DAY = rewardDay;
                    v.RWD_OFM = rwdOfm;
                    v.RWD_ST_COMP = rwdStComp;
                    v.RWD_ETC = rwdEtc;
                }
            });
        });
    },

    fn_selEmp: function(){
        let flag = false;
        let userArr = [];
        $("input[name='checkEmp']").each(function(){
            if(this.checked){
                if(rewardBatch.global.userArr.indexOf(this.value) < 0){
                    userArr.push(this.value);
                    rewardBatch.global.userArr.push(this.value);
                    flag = true;
                }
            }
        });
        if(!flag){
            return;
        }
        rewardBatch.global.nowUserArr = userArr;

        let data = {
            userList: userArr.join()
        }

        const result = customKendo.fn_customAjax("/user/getEmpSelList", data);
        let grid = $("#popMainGrid").data("kendoGrid");

        for(let i=0; i<result.list.length; i++){
            rewardBatch.global.editDataSource.data.push(result.list[i]);
            grid.dataSource.read();
        }

        rewardBatch.fn_popGridSetting();
    },

    fn_popGridSetting: function() {
        $(".rwdEtc, .rwdSn, .rwdStComp, .rwdOfm").kendoTextBox();

        $(".rewardTp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
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
                {text: "[외부표창] 학교", value: "11"}
            ]
        });

        $(".rewardDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });
    },

    fn_saveApnt : function(){
        const grid = $("#popMainGrid").data("kendoGrid");

        let flag = true;
        /** 포문 돌려서 포상구분 체크 */
        $.each($('#popMainGrid .k-master-row'), function(i, v){
            let dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            if($(v).find('#rewardTp'+empSeq).data("kendoDropDownList").value() == "") {
                flag = false;
            }
        })
        if(!flag){ alert("포상구분을 선택해주세요."); return; }
        if($("#numberName").val() == "") { alert("포상번호가 작성되지 않았습니다."); return; }

        /** 첨부파일 업로드 때문에 AJAX를 each문으로 진행 */
        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            let formData = new FormData();
            formData.append("menuCd", "reward");
            formData.append("empSeq", String(empSeq));
            formData.append("empName", dataItem.EMP_NAME_KR);
            formData.append("deptSeq", dataItem.DEPT_SEQ);
            formData.append("deptName", dataItem.DEPT_NAME);
            formData.append("teamSeq", dataItem.TEAM_SEQ);
            formData.append("teamName", dataItem.TEAM_NAME);
            formData.append("rewordType", $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").value());
            formData.append("rewordName", $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").text());
            formData.append("rewordDay", $(v).find('#rewardDay'+empSeq).val());
            formData.append("rwdOfm", $(v).find('#rwdOfm'+empSeq).val());
            formData.append("rwdStComp", $(v).find('#rwdStComp'+empSeq).val());
            formData.append("rwdEtc", $(v).find('#rwdEtc'+empSeq).val());

            /** 첨부파일 체크 1:1 */
            if($("#fileList"+empSeq)[0].files[0] != null){
                formData.append("rewardFile", $("#fileList"+empSeq)[0].files[0]);
            }

            formData.append("regEmpSeq", $("#empSeq").val());
            formData.append("numberName", $("#numberName").val());

            const result = customKendo.fn_customFormDataAjax("/inside/setRewardInsert", formData);

            if(result.flag) {
                console.log(result);
            }else{
                alert("결재 중 에러가 발생했습니다.");
            }

            fCommon.global.attFiles = [];
        });
        alert("포상 등록이 완료되었습니다.");
        opener.gridReload();
        //window.close();
    },

    fn_delApnt : function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        let dataItem = {};
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            dataItem = grid.dataItem($(this).closest("tr"));
            grid.removeRow($(this).closest('tr'));
            rewardBatch.global.userArr = rewardBatch.global.userArr.filter((value, index, arr) => {
                return value != dataItem.EMP_SEQ;
            });
        });

        rewardBatch.fn_popGridSetting();
    },

    fn_delApntAll : function(){
        if(!confirm("선택하신 데이터가 전부 삭제됩니다. 초기화 하시겠습니까?")){
            return;
        }
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']").each(function(){
            grid.removeRow($(this).closest('tr'));
        });
        rewardBatch.global.userArr = [];
    }
}
