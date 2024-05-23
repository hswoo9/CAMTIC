const rewardBatch = {
    global: {
        userArr : [],
        nowUserArr: [],
        editDataSource: {},
        delArr: [],
    },

    init: function(){
        rewardBatch.mainGrid();
        rewardBatch.editGrid();
        rewardBatch.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchVal", "numberName"]);

        let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "32"});
        rewardDataSource.unshift({CM_CODE_NM : "선택하세요", CM_CODE : ""});


        $("#rewardAllTp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {value : "", text : "선택하세요"},
                {value : "0", text : "내부"},
                {value : "1", text : "외부"},
            ],change : function(e){
                if(this.value()){
                    let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "32"});
                    rewardDataSource = rewardDataSource.filter(e => e.CM_CODE_DESC.indexOf(this.text()) > -1);
                    rewardDataSource.unshift({CM_CODE_NM : "선택하세요", CM_CODE : ""});
                    $("#rewardAll").kendoDropDownList({
                        dataTextField: "CM_CODE_NM",
                        dataValueField: "CM_CODE",
                        dataSource: rewardDataSource,
                        index: 0,
                        change: rewardBatch.changeRewardAll
                    });
                }
            },

        });

        $("#rewardAll").kendoDropDownList({
            dataTextField: "CM_CODE_NM",
            dataValueField: "CM_CODE",
            dataSource: [{
                CM_CODE_NM : "선택하세요", CM_CODE : ""
            }],
            index: 0,
            change: rewardBatch.changeRewardAll
        });


        /*
        $("#rewardAll").kendoDropDownList({
            dataTextField: "CM_CODE_NM",
            dataValueField: "CM_CODE",
            dataSource: rewardDataSource,
            index: 0,
            change: rewardBatch.changeRewardAll
        });
         */


        if($("#mode").val() == "upd"){
            let data = {
                pk: $("#pk").val()
            }
            const result = customKendo.fn_customAjax("/inside/getUpdRewardList", data);
            let grid = $("#popMainGrid").data("kendoGrid");
            let userArr = result.list;

            for(let i=0; i<userArr.length; i++){
                rewardBatch.global.userArr.push(userArr[i].EMP_SEQ);
                rewardBatch.global.editDataSource.data.push(userArr[i]);
                grid.dataSource.read();
            }
            rewardBatch.global.nowUserArr = rewardBatch.global.userArr;

            if(userArr.length > 0){
                $("#numberName").val(userArr[0].RWD_SN);
            }

            rewardBatch.fn_popGridSetting();

            for(let i=0; i<userArr.length; i++){
                $("#rewardTp" + userArr[i].EMP_SEQ).data("kendoDropDownList").trigger("change");
                $("#rewordName" + userArr[i].EMP_SEQ).data("kendoDropDownList").value(userArr[i].REWORD_NAME);
            }

        }
    },

    changeRewardAll: function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            //$("#rewardTp"+empSeq).data("kendoDropDownList").value($("#rewardAllTp").val());
            //$("#rewordName"+empSeq).data("kendoDropDownList").value($("#rewardAll").val());

            let rewardTpValue = $("#rewardAllTp").val();
            console.log("rewardTpValue",rewardTpValue);
            $("#rewardTp" + empSeq).data("kendoDropDownList").value(rewardTpValue);

            let rewordNameValue = $("#rewardAll").val();
            console.log("rewordNameValue",rewordNameValue);
            $("#rewordName" + empSeq).data("kendoDropDownList").value(rewordNameValue);

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
                    data.workStatusCode = 'Y';
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (){
                        return  '<span>이름</span>' +
                            '	<input type="text" id="searchVal" class="searchVal" style="width: 200px;" onkeypress="if(window.event.keyCode==13){gridReload();}">' ;
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
    },

    editGrid: function(){
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
                },
                {
                    name: 'text',
                    template: function(){
                        return '<span>내/외부 일괄변경</span>' +
                            '	<input type="text" id="rewardAllTp" style="width: 150px;">';
                    }
                },
                {
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
                    template : "<input type='checkbox' id='chk#=REWORD_ID#' name='checkUser' value='#=REWORD_ID#' style=\"top: 3px; position: relative\" />",
                    // template : function (e){
                    //     if(e.REWORD_ID != null){
                    //
                    //         return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.REWORD_ID+"' style='position: relative; top: 2px;'/>"
                    //     }else{
                    //         return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style='position: relative; top: 2px;'/>"
                    //     }
                    // },
                    width: 40,
                    attribute: {
                        style: "text-align:center",
                    }
                }, {
                    field: "ERP_EMP_SEQ",
                    title: "사번",
                    width: 80
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 80
                }, {
                    title: "내/외부",
                    template : function (row){
                        if(row.REWARD_TP != null){
                            return "<input type='text' id='rewardTp"+row.EMP_SEQ+"' class='formData rewardTp' empSeq='" + row.EMP_SEQ + "' value='"+row.REWARD_TP+"'>";
                        }else{
                            return "<input type='text' id='rewardTp"+row.EMP_SEQ+"' class='formData rewardTp' empSeq='" + row.EMP_SEQ + "'>";
                        }
                    },
                    width : 180
                }, {
                    title: "포상 구분",
                    template : function (row){
                        if(row.REWORD_NAME != null){
                            return "<input type='text' id='rewordName"+row.EMP_SEQ+"' class='formData rewordName'  empSeq='" + row.EMP_SEQ + "' value='"+row.REWORD_NAME+"'>";
                        }else{
                            return "<input type='text' id='rewordName"+row.EMP_SEQ+"' class='formData rewordName' empSeq='" + row.EMP_SEQ + "'>";
                        }
                    },
                    width : 180
                }, {
                    title: "포상일자",
                    template : function(row){
                        if(row.REWARD_DAY != null){
                            return "<input type='text' id='rewardDay"+row.EMP_SEQ+"' name='rewardDay' class='formData rewardDay' value='"+row.REWARD_DAY+"'>";
                        }else{
                            return "<input type='text' id='rewardDay"+row.EMP_SEQ+"' name='rewardDay' class='formData rewardDay'>";
                        }
                    },
                    width: 120
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
                        if(row.file_no != 0){
                            return '<span id="file' + row.EMP_SEQ + 'Name" style="font-size:11px;cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">' + row.file_org_name + '.' + row.file_ext + '</span>' +
                                '<input type="hidden" id="file' + row.EMP_SEQ + 'Sn" name="file' + row.EMP_SEQ + 'Sn" value="' + row.file_no + '">' +
                                '<label For="file' + row.EMP_SEQ + '" class="k-button k-button-solid-base" style="float:left;">파일첨부</label>' +
                                '<input type="file" id="file' + row.EMP_SEQ + '" name="file' + row.EMP_SEQ + '" onChange="rewardBatch.fileChange(this)" style="display: none">';
                        }else{
                            return '<span id="file' + row.EMP_SEQ + 'Name" style="font-size:11px"></span>' +
                                '<input type="hidden" id="file' + row.EMP_SEQ + 'Sn" name="file' + row.EMP_SEQ + 'Sn">' +
                                '<label For="file' + row.EMP_SEQ + '" class="k-button k-button-solid-base" style="float:left;">파일첨부</label>' +
                                '<input type="file" id="file' + row.EMP_SEQ + '" name="file' + row.EMP_SEQ + '" onChange="rewardBatch.fileChange(this)" style="display: none">';
                        }
                    },
                    width: 220
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
            var rewordName = $("#rewordName"+dataItem.EMP_SEQ).val();
            var rewardDay = $("#rewardDay"+dataItem.EMP_SEQ).val();
            var rwdOfm = $("#rwdOfm"+dataItem.EMP_SEQ).val();
            var rwdStComp = $("#rwdStComp"+dataItem.EMP_SEQ).val();
            var rwdEtc = $("#rwdEtc"+dataItem.EMP_SEQ).val();

            $.each(rewardBatch.global.editDataSource.data, function(i, v){
                if(v.EMP_SEQ == dataItem.EMP_SEQ){
                    v.REWORD_TYPE = rewardTp;
                    v.REWARD_NAME = rewordName;
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
            result.list[i].REWORD_ID = "";
            rewardBatch.global.userArr.push(userArr[i].EMP_SEQ);
            rewardBatch.global.editDataSource.data.push(result.list[i]);
            rewardBatch.editGrid();
            //grid.dataSource.read();
        }

        rewardBatch.fn_popGridSetting();
    },

    fn_popGridSetting: function() {
        $(".rwdEtc, .rwdSn, .rwdStComp, .rwdOfm").kendoTextBox();

        $(".rewardTp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {value : "", text : "선택하세요"},
                {value : "0", text : "내부"},
                {value : "1", text : "외부"},
            ],
            change : function(e){
                if(this.value()){
                    let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "32"});
                    rewardDataSource = rewardDataSource.filter(e => e.CM_CODE_DESC.indexOf(this.text()) > -1);
                    rewardDataSource.unshift({CM_CODE_NM : "선택하세요", CM_CODE : ""});

                    $("#rewordName" + $(e.sender.element).attr("empSeq")).kendoDropDownList({
                        dataTextField: "CM_CODE_NM",
                        dataValueField: "CM_CODE",
                        dataSource: rewardDataSource
                    });
                }
            }
        });

        let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "32"});
        rewardDataSource.unshift({CM_CODE_NM : "선택하세요", CM_CODE : ""});

        $(".rewordName").kendoDropDownList({
            dataTextField: "CM_CODE_NM",
            dataValueField: "CM_CODE",
            dataSource: rewardDataSource
                /*
                [{
                CM_CODE_NM : "선택하세요", CM_CODE : ""
            }]
                 */
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
        $.each($('input[name="checkUser"]'), function(i, v){
            let dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            if($(v).closest("tr").find('#rewordName'+empSeq).data("kendoDropDownList").value() == "") {
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
            formData.append("rewordId", dataItem.REWORD_ID);
            formData.append("menuCd", "reward");
            formData.append("empSeq", String(empSeq));
            formData.append("erpEmpSeq", dataItem.ERP_EMP_SEQ);
            formData.append("empName", dataItem.EMP_NAME_KR);
            formData.append("deptSeq", dataItem.DEPT_SEQ);
            formData.append("deptName", dataItem.DEPT_NAME);
            formData.append("teamSeq", dataItem.TEAM_SEQ);
            formData.append("teamName", dataItem.TEAM_NAME);
            formData.append("rewordType", $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").value());
            formData.append("rewordTypeName", $(v).find('#rewardTp'+empSeq).data("kendoDropDownList").text());
            formData.append("rewordName", $(v).find('#rewordName'+empSeq).val());
            formData.append("rewordDay", $(v).find('#rewardDay'+empSeq).val());
            formData.append("rwdOfm", $(v).find('#rwdOfm'+empSeq).val());
            formData.append("rwdStComp", $(v).find('#rwdStComp'+empSeq).val());
            formData.append("rwdEtc", $(v).find('#rwdEtc'+empSeq).val());

            /** 첨부파일 체크 1:1 */
            if($("#file"+empSeq)[0].files[0] != null){
                formData.append("rewardFile", $("#file"+empSeq)[0].files[0]);
            }

            formData.append("regEmpSeq", $("#empSeq").val());
            formData.append("numberName", $("#numberName").val());

            const result = customKendo.fn_customFormDataAjax("/inside/setRewardInsert", formData);

            if (result.flag) {
                console.log(result);
            }
            fCommon.global.attFiles = [];
        });

        if(rewardBatch.global.delArr.length > 0){
            var rewordArr = "";
            for(var i=0; i<rewardBatch.global.delArr.length; i++){
                rewordArr += "," + rewardBatch.global.delArr[i];
            }

            $.ajax({
                url : "/inside/setRewardDelete",
                type : "POST",
                data : {
                    "rewordArr" : rewordArr.substring(1),
                    "empSeq" : $("#empSeq").val()
                },
                success : function(){
                    console.log("success");
                }
            })
        }

        alert("처리되었습니다.");
        opener.gridReload();
        window.close();
    },

    fn_delApnt : function(){
        var grid = $("#popMainGrid").data("kendoGrid");
        var dataItemAr = [];
        var dataItem = {};

        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            dataItemAr.push(grid.dataItem($(this).closest("tr")));
            if(grid.dataItem($(this).closest("tr")).REWORD_ID){
                rewardBatch.global.delArr.push(grid.dataItem($(this).closest("tr")).REWORD_ID);
            }
        });

        for(let i = 0; i < dataItemAr.length; i++){
            dataItem = dataItemAr[i];
            grid.removeRow(dataItem);
            rewardBatch.global.userArr = rewardBatch.global.userArr.filter((value, index, arr) => {
                return value != dataItem.EMP_SEQ;
            });
            rewardBatch.global.editDataSource.data = rewardBatch.global.editDataSource.data.filter(param => String(param.EMP_SEQ) != String(dataItem.EMP_SEQ));
        }

        rewardBatch.editGrid();
        rewardBatch.fn_popGridSetting();


        // const grid = $("#popMainGrid").data("kendoGrid");
        // let dataItem = {};
        // $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
        //     dataItem = grid.dataItem($(this).closest("tr"));
        //     grid.removeRow($(this).closest('tr'));
        //     rewardBatch.global.userArr = rewardBatch.global.userArr.filter((value, index, arr) => {
        //         return value != dataItem.EMP_SEQ;
        //     });
        //
        //     rewardBatch.global.editDataSource.data = rewardBatch.global.editDataSource.data.filter(param => String(param.EMP_SEQ) != String(dataItem.EMP_SEQ));
        // });
        //
        // rewardBatch.editGrid();
        // rewardBatch.fn_popGridSetting();
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
        rewardBatch.global.editDataSource.data = [];
        rewardBatch.editGrid();
    },

    fileChange : function(e){
        if($("#" + $(e).attr("id") + "Sn").val()){
            if(confirm("기존 파일은 삭제됩니다. 진행하시겠습니까?")){
                var result = customKendo.fn_customAjax("/common/commonFileDel", {fileNo : $("#" + $(e).attr("id") + "Sn").val()})
                if(result.flag){
                    $(e).prev().prev().prev().text($(e)[0].files[0].name);
                }
            }
        }else{
            $(e).prev().prev().prev().text($(e)[0].files[0].name);
        }


    },
}
