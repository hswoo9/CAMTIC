var roomManage = {
    init: function(){
        roomManage.dataSet();
        roomManage.mainGrid();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText", "roomName", "visit", "manyPeople", "coronationMoneySn", "empName","remarkCn"]);
        let useArr = [
            {text: "사용", value: "Y"},
            {text: "미사용", value: "N"}
        ]
        customKendo.fn_dropDownList("useType", useArr, "text", "value", 1);
        let searchArr = [
            {text: "회의실 명", value: "1"},
            {text: "장소", value: "2"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);
        useArr = [
            {text: "사용", value: "Y"},
            {text: "미사용", value: "N"}
        ]
        customKendo.fn_dropDownList("active", useArr, "text", "value", 2);
        let coronationArr = [
            {text: "가능", value: "Y"},
            {text: "불가능", value: "N"}
        ]
        customKendo.fn_dropDownList("coronation", coronationArr, "text", "value", 2);
        customKendo.fn_datePicker("regDt", 'month', "yyyy-MM-dd", new Date());
        $("#regDt, #empName").attr("readonly", true);
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getRoomCodeList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="roomManage.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="roomManage.clearBtn()">' +
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
            dataBound : roomManage.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'roomPk\');"/>',
                    template : "<input type='checkbox' name='roomPk' class='roomPk'/>",
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: "10%",
                }, {
                    field: "ROOM_NAME",
                    title: "회의실 명",
                    width: "15%"
                }, {
                    field: "VISIT",
                    title: "장소",
                    width: "15%"
                }, {
                    field: "MANY_PEOPLE",
                    title: "수용 인원",
                    width: "10%"
                }, {
                    field: "MANAGER_NAME",
                    title: "등록자",
                    width: "15%"
                }, {
                    field: "REG_DT",
                    title: "등록일자",
                    width: "15%"
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
            const roomCodeSn = dataItem.ROOM_CODE_SN;
            roomManage.getRoomCodeInfo(roomCodeSn);
        });
    },

    getRoomCodeInfo: function(roomCodeSn){
        $.ajax({
            url : "/inside/getRoomCodeInfo",
            data : {
                roomCodeSn : roomCodeSn
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                const data = result.data;

                $("#roomCodeSn").val(data.ROOM_CODE_SN);
                $("#active").data("kendoDropDownList").value(data.ACTIVE);
                $("#roomName").val(data.ROOM_NAME);
                $("#visit").val(data.VISIT);
                $("#manyPeople").val(data.MANY_PEOPLE);
                $("#coronation").data("kendoDropDownList").value(data.CORONATION_ACTIVE);
                $("#coronationMoneySn").val(data.CORONATION_MONEY_SN);
                $("#empSeq").val(data.MANAGER_SN);
                $("#empName").val(data.MANAGER_NAME);
                $("#remarkCn").val(data.REMARK_CN);
            },
            error : function() {
                alert("데이터 조회 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    clearBtn: function(){
        $("#roomCodeSn").val("");
        $("#active").data("kendoDropDownList").value("");
        $("#roomName").val("");
        $("#visit").val("");
        $("#manyPeople").val("");
        $("#coronation").data("kendoDropDownList").value("");
        $("#coronationMoneySn").val("");
        $("#empSeq").val("");
        $("#empName").val("");
        $("#regDt").val("");
        $("#remarkCn").val("");
    },

    saveBtn: function(){
        let roomCodeSn = $("#roomCodeSn").val();
        let active = $("#active").val();
        let roomName = $("#roomName").val();
        let visit = $("#visit").val();
        let manyPeople = $("#manyPeople").val();
        if(manyPeople == "") {
            manyPeople = 0;
        }
        let coronationActive = $("#coronation").data("kendoDropDownList").value();
        let coronationName = $("#coronation").data("kendoDropDownList").text();
        let coronationMoneySn = $("#coronationMoneySn").val();
        if(coronationMoneySn == "") {
            coronationMoneySn = 0;
        }
        let empName = $("#empName").val();
        let empSeq = $("#empSeq").val();
        let regDt = $("#regDt").val();
        let remarkCn = $("#remarkCn").val();

        if(active == ""){ alert("사용여부가 선택되지 않았습니다."); return;}
        if(roomName == ""){ alert("회의실명이 작성되지 않았습니다."); return;}
        if(visit == ""){ alert("장소가 작성되지 않았습니다."); return;}
        if(manyPeople == ""){ alert("수용인원이 작성되지 않았습니다."); return;}
        if(empSeq == ""){ alert("등록자가 선택되지 않았습니다."); return;}

        let data = {
            roomCodeSn : roomCodeSn,
            active : active,
            roomName : roomName,
            visit : visit,
            manyPeople : manyPeople,
            coronationActive : coronationActive,
            coronationName : coronationName,
            coronationMoneySn : coronationMoneySn,
            empName : empName,
            empSeq : empSeq,
            regDt : regDt,
            remarkCn : remarkCn
        }

        if($("#roomCodeSn").val() == "") {
            if(!confirm("회의실을 등록 하시겠습니까?")){
                return;
            }
            roomManage.setRoomCodeInsert(data);
        }else {
            if(!confirm("회의실을 정보를 수정하시겠습니까?")){
                return;
            }
            roomManage.setRoomCodeUpdate(data);
        }
    },

    setRoomCodeInsert: function(data){
        $.ajax({
            url : "/inside/setRoomCodeInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("회의실 등록이 완료되었습니다.");
                gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setRoomCodeUpdate: function(data){
        $.ajax({
            url : "/inside/setRoomCodeUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("회의실 정보 수정이 완료되었습니다.");
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
        const ch = $('#mainGrid tbody .roomPk:checked');
        let checkedList = new Array();
        $.each(ch, function(i,v){
            checkedList.push( $("#mainGrid").data("kendoGrid").dataItem($(v).closest("tr")).ROOM_CODE_SN);
        });

        if(checkedList.length == 0){
            alert('삭제 할 항목을 선택해 주세요.');
            return;
        }

        let data = {
            roomCodeSn : checkedList.join()
        }

        if(!confirm("해당 삭제버튼은 사용여부가 아닌, 완전 삭제입니다. 삭제 하시겠습니까?")){
            return;
        }
        roomManage.setRoomCodeDelete(data);
    },

    setRoomCodeDelete: function(data){
        $.ajax({
            url : "/inside/setRoomCodeDelete",
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
}
