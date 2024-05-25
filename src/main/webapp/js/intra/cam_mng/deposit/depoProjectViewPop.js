var depoPrjMng = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function(){


        depoPrjMng.fn_popMainGrid();

        customKendo.fn_datePicker("frDt", '', "yyyy-MM-dd", new Date(depoPrjMng.global.now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("toDt", '', "yyyy-MM-dd", new Date(depoPrjMng.global.now.getFullYear() + '-12-31'));

        depoPrjMng.gridReload();
    },

    gridReload: function(){
        $("#popMainGrid").data("kendoGrid").dataSource.read();
    },

    fn_popMainGrid : function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/g20/getProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pjtFromDate = $("#frDt").val();
                    data.pjtToDate = $("#toDt").val();
                    data.searchValue = $("#pjtNm").val();
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

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (e){
                        return '<span>조회기간</span> ' +
                            '<input type="text" id="frDt" style="width: 120px;" onchange="depoPrjMng.dateValidationCheck(\'frDt\', this.value)">' +
                            '~' +
                            '<input type="text" id="toDt" style="width: 120px; margin-right: auto;" onchange="depoPrjMng.dateValidationCheck(\'enDt\', this.value)">';
                    }
                }, {
                    name : 'text',
                    template : function (e){
                        return '<label for="pjtNm" class="k-label">프로젝트 명</label> ' +
                            '<input type="text" class="k-input" id="pjtNm" style="width: 250px; margin-right: 5px;" onkeyup="depoPrjMng.fn_enterKey();"/>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoPrjMng.gridReload()">' +
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
                    width: 30
                }, {
                    field: "pjtSeq",
                    title: "프로젝트 코드",
                    width: 80
                }, {
                    field: "pjtName",
                    title: "프로젝트 명",
                    width: 400,
                    template: function(e){
                        return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="depoPrjMng.fn_projectPopView(\'' + e.pjtSeq + '\')";>' + e.pjtName + '</a>'
                    }
                }, {
                    field: "pjtFromDate",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "pjtToDate",
                    title: "종료일자",
                    width: 80,
                }, {
                    title: "",
                    width: "5%",
                    template: function(e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-base" onclick="depoPrjMng.fn_selectProject(\''+e.pjtName+'\', \''+e.pjtSeq+'\');">선택</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_enterKey: function(){
        $("#pjtNm").keydown(function(e){
            if(e.keyCode == 13){
                depoPrjMng.gridReload();
            }
        });
    },

    fn_selectProject: function(name, cd){
        opener.parent.selectProject(name, cd);

        window.close();
    },

    dateValidationCheck : function (id, val){
        var sDt = new Date($("#frDt").val());
        var nDt = new Date($("#toDt").val());

        if(id == "frDt"){
            if(sDt > nDt){
                $("#toDt").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#frDt").val(val);
            }
        }
    },

    // project 상세페이지
    fn_projectPopView : function (key){
        var url = "/mng/pop/projectMngPop.do?pjtCd=" + key;

        var name = "blank";
        var option = "width = 1280, height = 850, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },
}