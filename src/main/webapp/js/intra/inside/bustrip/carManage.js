var carManage = {
    init: function(){
        carManage.dataSet();
        carManage.mainGrid();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText", "carClassName", "carNum", "empName", "remarkCn"]);
        let useArr = [
            {text: "사용", value: "Y"},
            {text: "미사용", value: "N"}
        ]
        customKendo.fn_dropDownList("useType", useArr, "text", "value", 1);
        fn_deptSetting();
        let searchArr = [
            {text: "차량 종류", value: "차량 종류"},
            {text: "차량 번호", value: "차량 번호"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);
        useArr = [
            {text: "사용", value: "Y"},
            {text: "미사용", value: "N"}
        ]
        customKendo.fn_dropDownList("active", useArr, "text", "value", 2);
        let useDeptArr = [
            {text: "전체 부서", value: "N"},
            {text: "사용 부서 선택", value: "Y"}
        ]
        customKendo.fn_dropDownList("useDeptType", useDeptArr, "text", "value", 2);
        $("#useDeptType").data("kendoDropDownList").bind("change", carManage.fn_toggleUseDept)
        const deptArr = customKendo.fn_customAjax("/dept/getDeptAList", {deptLevel : 1}).rs;
        $("#useDept").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataTextField: "dept_name",
            dataValueField: "dept_seq",
            dataSource: deptArr
        });
        customKendo.fn_datePicker("regDt", 'month', "yyyy-MM-dd", new Date());
        $("#regDt, #empName").attr("readonly", true);
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getCarCodeList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.mod = "manage";
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 496,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="carManage.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="carManage.clearBtn();">' +
                            '	<span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : carManage.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'carPk\');"/>',
                    template : "<input type='checkbox' name='carPk' class='carPk'/>",
                    width: 40
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량 종류",
                    width: 100
                }, {
                    field: "CAR_NUM_NAME",
                    title: "차량 번호",
                    width: 100
                }, {
                    title: "사용 부서",
                    template: function(row){
                        if(row.CAR_USE_DEPT_ACTIVE == "Y"){
                            const useDeptArr = (row.CAR_USE_DEPT_NAME == null ? "" : row.CAR_USE_DEPT_NAME).split(",");
                            $("#useDept").data("kendoDropDownTree").value(useDeptArr);
                            const deptLength = useDeptArr.length
                            if(deptLength != 1) {
                                return useDeptArr[0]+" 외 "+(useDeptArr.length-1)+"개 부서";
                            }else {
                                return useDeptArr[0];
                            }
                        }else {
                            return "전체";
                        }
                    }
                }, {
                    field: "MANAGER_NAME",
                    title: "등록자",
                    width: 70
                }, {
                    field: "REG_DT",
                    title: "등록일자",
                    width: 90
                }, {
                    title: "사용여부",
                    width: 50,
                    template: function(row){
                        if(row.ACTIVE == "Y"){
                            return "사용";
                        }else {
                            return "미사용";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function () {
            const dataItem = grid.dataItem($(this));
            const carCodeSn = dataItem.CAR_CODE_SN;
            carManage.getCarCodeInfo(carCodeSn);
        });
    },

    getCarCodeInfo: function(carCodeSn){
        $.ajax({
            url : "/inside/getCarCodeInfo",
            data : {
                carCodeSn : carCodeSn
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                const data = result.data;

                $("#carCodeSn").val(data.CAR_CODE_SN);
                $("#active").data("kendoDropDownList").value(data.ACTIVE);
                $("#carClassName").val(data.CAR_CLASS_NAME);
                $("#carNum").val(data.CAR_NUM_NAME);
                if(data.CAR_USE_DEPT_ACTIVE == "Y") {
                    $("#useDeptType").data("kendoDropDownList").value(data.CAR_USE_DEPT_ACTIVE);
                }else {
                    $("#useDeptType").data("kendoDropDownList").value("N");
                }
                carManage.fn_toggleUseDept();
                $("#empSeq").val(data.MANAGER_SN);
                $("#empName").val(data.MANAGER_NAME);
                $("#regDt").val(data.REG_DT);
                $("#remarkCn").val(data.REMARK_CN);
                if(data.CAR_USE_DEPT_ACTIVE == "Y") {
                    const useDeptArr = data.CAR_USE_DEPT_SN.split(",");
                    $("#useDept").data("kendoDropDownTree").value(useDeptArr);
                }
            },
            error : function() {
                alert("데이터 조회 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    clearBtn: function(){
        $("#carCodeSn").val("");
        $("#active").data("kendoDropDownList").value("");
        $("#carClassName").val("");
        $("#carNum").val("");
        $("#useDeptType").data("kendoDropDownList").value("");
        carManage.fn_toggleUseDept();
        $("#empSeq").val("");
        $("#empName").val("");
        $("#remarkCn").val("");
        $("#useDept").data("kendoDropDownTree").value("");
    },

    saveBtn: function(){
        let carCodeSn = $("#carCodeSn").val();
        let active = $("#active").val();
        let carClassName = $("#carClassName").val();
        let carNum = $("#carNum").val();
        let useDeptType = $("#useDeptType").val();
        let carUseDeptSn = $("#useDept").data("kendoDropDownTree").value().toString();
        let carUseDeptName = "";
        $.each($(".k-checkbox:checked"), function(index, item) {
            if(index != 0) {
                carUseDeptName += ",";
            }
            carUseDeptName += $(item).parent().parent().find('.k-treeview-leaf-text').text();
        });
        let empName = $("#empName").val();
        let empSeq = $("#empSeq").val();
        let regDt = $("#regDt").val();
        let remarkCn = $("#remarkCn").val();

        if(active == ""){ alert("사용여부가 선택되지 않았습니다."); return;}
        if(carClassName == ""){ alert("차량종류가 작성되지 않았습니다."); return;}
        if(useDeptType == ""){ alert("사용부서여부가 선택되지 않았습니다."); return;}
        if(empSeq == ""){ alert("등록자가 선택되지 않았습니다."); return;}

        let data = {
            carCodeSn : carCodeSn,
            active : active,
            carClassName : carClassName,
            carNum : carNum,
            useDeptType : useDeptType,
            carUseDeptSn : carUseDeptSn,
            carUseDeptName : carUseDeptName,
            empSeq : empSeq,
            empName : empName,
            regDt : regDt,
            remarkCn : remarkCn
        }

        if($("#carCodeSn").val() == "") {
            if(!confirm("차량을 등록 하시겠습니까?")){
                return;
            }
            carManage.setCarCodeInsert(data);
        }else {
            if(!confirm("차량 정보를 수정하시겠습니까?")){
                return;
            }
            carManage.setCarCodeUpdate(data);
        }
    },

    setCarCodeInsert: function(data){
        console.log(data);
        $.ajax({
            url : "/inside/setCarCodeInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("차량 등록이 완료되었습니다.");
                gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setCarCodeUpdate: function(data){
        console.log(data);
        $.ajax({
            url : "/inside/setCarCodeUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("차량 정보 수정이 완료되었습니다.");
                gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    delBtn: function(){
        const ch = $('#mainGrid tbody .carPk:checked');
        let checkedList = new Array();
        $.each(ch, function(i,v){
            checkedList.push( $("#mainGrid").data("kendoGrid").dataItem($(v).closest("tr")).CAR_CODE_SN);
        });

        if(checkedList.length == 0){
            alert('삭제 할 항목을 선택해 주세요.');
            return;
        }

        let data = {
            carCodeSn : checkedList.join()
        }

        if(!confirm("해당 삭제버튼은 사용여부가 아닌, 완전 삭제입니다. 삭제 하시겠습니까?")){
            return;
        }
        carManage.setCarCodeDelete(data);
    },

    setCarCodeDelete: function(data){
        $.ajax({
            url : "/inside/setCarCodeDelete",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("데이터 삭제가 완료되었습니다.");
                gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 삭제 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    fn_toggleUseDept: function(){
        const useDeptType = $("#useDeptType").data("kendoDropDownList").value();
        if(useDeptType != "Y") {
            $(".varTR").hide();
        }else {
            $(".varTR").show();
        }
    }
}
