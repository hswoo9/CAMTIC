var lectList = {
    fn_defaultScript: function (){
        lectList.buttonGrid();
    },

    buttonGrid: function (){

        $("#radioSelectLecType").kendoRadioGroup({
            items: [
                { label : "단위사업 리스트", value : "1" },
                { label : "교육단위사업 리스트", value : "2" },
                { label : "컨설팅단위사업 리스트", value : "3" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
            change : function(e){
                var idx = this.value();

                if(idx == 1){
                    $("#unitMainGrid").html("");
                    $("#unitMainGrid").show();
                    $("#lecSaveBtn").show();
                    $("#lectureMainGrid").hide();
                    $("#eduSaveBtn").hide();
                    $("#consultingMainGrid").hide();
                    $("#conSaveBtn").hide();
                    $("#lecTitleWrap").text("◎ 단위사업 리스트");
                    lectList.unitMainGrid();
                } else if (idx == 2){
                    $("#lectureMainGrid").html("");
                    $("#unitMainGrid").hide();
                    $("#lecSaveBtn").hide();
                    $("#lectureMainGrid").show();
                    $("#eduSaveBtn").show();
                    $("#consultingMainGrid").hide();
                    $("#conSaveBtn").hide();
                    $("#lecTitleWrap").text("◎ 교육단위사업 리스트");
                    lectList.mainGrid();
                } else if (idx == 3){
                    $("#consultingMainGrid").html("");
                    $("#unitMainGrid").hide();
                    $("#lecSaveBtn").hide();
                    $("#lectureMainGrid").hide();
                    $("#eduSaveBtn").hide();
                    $("#consultingMainGrid").show();
                    $("#conSaveBtn").show();
                    $("#lecTitleWrap").text("◎ 컨설팅단위사업 리스트");
                    lectList.consultingGrid();
                }
            }
        });

        $("#radioSelectLecType").data("kendoRadioGroup").trigger("change");
    },

    gridReload: function(){
        $("#lectureMainGrid").data("kendoGrid").dataSource.read();
    },

    unitGridReload : function (){
        $("#unitMainGrid").data("kendoGrid").dataSource.read();
    },

    consultingGridReload : function (){
        $("#consultingMainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getLectureList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10
        });

        $("#lectureMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: this.onDataBound,
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "LEC_FIELD_NAME",
                    title: "대분류",
                    width: "10%"
                }, {
                    field: "LEC_FIELD_NAME1",
                    title: "중분류",
                    width: "10%"
                }, {
                    field: "LEC_TITLE_BS",
                    title: "강좌명(사업명)"
                }, {
                    title: "교육기간",
                    width: "15%",
                    template: function(e){
                        return e.LEC_STR_DE + "~" + e.LEC_END_DE;
                    }
                }, {
                    title: "정원",
                    width: "3%",
                    template: function(e){
                        return e.RECR_MEM_CNT+"명";
                    }
                }, {
                    title: "신청",
                    width: "3%",
                    template: function(e){
                        return e.TOT_B+"명";
                    }
                }, {
                    title: "대기",
                    width: "3%",
                    template: function(e){
                        return e.TOT_C+"명";
                    }
                }, {
                    title: "접수",
                    width: "3%",
                    template: function(e){
                        return e.TOT_D+"명";
                    }
                }, {
                    title: "취소",
                    width: "3%",
                    template: function(e){
                        return e.TOT_E+"명";
                    }
                }, {
                    title: "수료",
                    width: "3%",
                    template: function(e){
                        return e.TOT_F+"명";
                    }
                }, {
                    field: "LEC_STATUS_NAME",
                    title: "현재상태",
                    width: "10%"
                }, {
                    title: "복사",
                    width: "10%",
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="lectList.fn_copy('+ e.LEC_SN +')">' +
                            '	<span class="k-button-text">복사</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" style="margin-left: 5px;" onclick="lectList.fn_delete('+ e.LEC_SN +')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_copy: function(pk){
        if(!confirm("해당 교육단위사업을 복사하시겠습니까?")) {
            return;
        }

        $.ajax({
            url : "/projectUnRnd/setLecCopyInsert",
            data : {
                pk : pk
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(){
                lectList.gridReload();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");

            }
        });
    },

    fn_delete: function(pk){

        if(!confirm("해당 교육단위사업을 삭제하시겠습니까?")) {
            return;
        }

        $.ajax({
            url : "/projectUnRnd/delLecture",
            data : {
                pk : pk
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(){
                lectList.gridReload();
            },
            error : function() {
                alert("데이터  중 에러가 발생했습니다.");

            }
        });


    },

    fn_conDelete: function(pk){

        if(!confirm("해당 컨설팅단위사업을 삭제하시겠습니까?")) {
            return;
        }

        $.ajax({
            url : "/projectUnRnd/delConsulting",
            data : {
                pk : pk
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(){
                lectList.consultingGridReload();
            },
            error : function() {
                alert("데이터  중 에러가 발생했습니다.");

            }
        });


    },



    onDataBound: function(){
        const grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            lecturePop.fn_lectureReqPop($("#pjtSn").val(), dataItem.LEC_SN);
        });
    },


    unitMainGrid : function (){
        let unitDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getUnitBusnList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10
        });

        $("#unitMainGrid").kendoGrid({
            dataSource: unitDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectList.unitGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "LEC_NM",
                    title: "단위사업명",
                    width: "15%"
                }, {
                    title: "기간",
                    width: "10%",
                    template: function(e){
                        return e.STR_DT + "~" + e.END_DT;
                    }
                }, {
                    title: "사업목적",
                    width: "20%",
                    template: function(e){
                        return e.UNIT_OBJ;
                    }
                }, {
                    title: "업체 수",
                    width: "5%",
                    template: function(e){
                        return e.CRM_CNT;
                    }
                }, {
                    title: "업체정보",
                    width: "5%",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectList.lectureTeamListPop('+e.PJT_SN+','+e.PJT_UNIT_SN+')">보기</button>';
                    }
                }, {
                    title : "기타",
                    width : "5%",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-primary" onclick="lectList.lectureTeamPop('+e.PJT_SN+','+e.PJT_UNIT_SN+')">수정</button>' +
                            '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" style="margin-left: 5px;" onclick="lectList.fn_delUnitBusn('+e.PJT_UNIT_SN+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    consultingGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getConsultingList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10
        });

        $("#consultingMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="lectList.consultingGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: this.onDataBound1,
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "CON_FIELD_NAME",
                    title: "분야",
                    width: "10%"
                },  /*{
                    field: "CON_BUSN_CLASS_NAME",
                    title: "단위사업명"
                },*/
                {
                    field: "CON_TITLE_PR",
                    title: "과제명"
                }, {
                    title: "협약기간",
                    width: "15%",
                    template: function(e){
                        return e.CON_STR_DE + "~" + e.CON_END_DE;
                    }
                }, {
                    field: "LEC_STATUS_NAME",
                    title: "현재상태",
                    width: "10%"
                }, {
                    title: "",
                    width: "5%",
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" style="margin-left: 5px;" onclick="lectList.fn_conDelete('+ e.CON_SN +')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound1: function(){
        const grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            lecturePop.fn_consultingReqPop($("#pjtSn").val(), dataItem.CON_SN);
        });
    },

    fn_delUnitBusn: function (key){

        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            pjtUnitSn : key
        }

        $.ajax({
            url : "/projectUnRnd/delUnitBusn",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("해당 단위사업이 삭제되었습니다.");
                    lectList.unitMainGrid();
                }
            }
        });


    },

    lectureTeamPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureTeamPop.do?pjtSn="+pjtSn;
        if(pk != null && pk != ""){
            url += "&pjtUnitSn="+pk;
        }
        const name = "lectureReqPop";
        const option = "width = 860, height = 500, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    lectureTeamListPop: function(key, sn){
        let url = "/projectUnRnd/lectureTeamListPop.do?pjtSn="+key+"&pjtUnitSn="+sn;
        const name = "lectureReqPop";
        const option = "width = 1250, height = 650, top = 100, left = 300, location = no";
        window.open(url, name, option);
    }
}