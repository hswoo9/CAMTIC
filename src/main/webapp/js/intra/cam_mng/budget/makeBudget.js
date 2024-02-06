var makeBudget = {

    global : {

    },

    fn_defaultScript: function (){

        customKendo.fn_datePicker("baseYear", "decade", "yyyy", new Date());

        $("#baseYear").change(function (){
            makeBudget.makeBudgetGrid()
        });

        makeBudget.makeBudgetGrid();
    },


    makeBudgetGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/budget/getBudgetList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.baseYear = $("#baseYear").val();
                    data.pjtFromDate = $("#baseYear").val() + "-01-01";
                    data.pjtToDate = $("#baseYear").val() + "-12-31";
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

        $("#makeBudgetGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="">' +
                            '	<span class="k-button-text">마감</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-primary" onclick="makeBudget.fn_modBudget()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="makeBudget.fn_popBudgetDetail()">' +
                            '	<span class="k-button-text">예산등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="makeBudget.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" class="k-checkbox k-checkbox-item" name="checkAll"/>',
                    width: 30,
                    template: function(e){
                        return '<input type="checkbox" class="k-checkbox k-checkbox-item" name="mChecks" value="' + e.BG_VAL + e.PJT_BUDGET_SN + '"/>';
                    }
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 30
                }, {
                    title : "분류",
                    width: 80,
                    template: function(e){
                        var className = "";

                        if(e.PJT_CLASS == "M"){
                            className = "법인운영";
                        } else if(e.PJT_CLASS == "S"){
                            className = "비R&D";
                        } else if(e.PJT_CLASS == "R"){
                            className = "R&D";
                        } else if(e.PJT_CLASS == "D"){
                            className = "엔지니어링";
                        } else if(e.PJT_CLASS == "V"){
                            className = "기타/용역";
                        }

                        return className;
                    }
                }, {
                    title : "예산코드",
                    width: 100,
                    template: function(e){
                        return e.JANG_CD + e.GWAN_CD + e.HANG_CD;
                    }
                }, {
                    title : "장",
                    field : "JANG_NM",
                    width: 100
                }, {
                    field: "GWAN_NM",
                    title: "관",
                    width: 100,
                }, {
                    field: "HANG_NM",
                    title: "항",
                    width: 80,
                }, {
                    title: "예산금액",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.BUDGET_AMT)+'</div>';
                    }
                }, {
                    title: "변경이력",
                    width: 50,
                    template : function(e){
                        return '<button type="button" class="k-button k-button-solid-base">변경이력</button>'
                    }
                }, {
                    title: "수정",
                    width: 40,
                    template: function(e){
                        if(e.DD_LINE_STAT == 'N'){
                            return '<button type="button" class="k-button k-button-solid-primary" onclick="makeBudget.fn_modBudget(' + e.PJT_BUDGET_SN + ', \''+e.BG_VAL+'\')">수정</button>'
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if(this.checked){
                $("input[name='mChecks']").prop("checked", true);
            } else {
                $("input[name='mChecks']").prop("checked", false);
            }
        });
    },

    gridReload : function (){
        $("#makeBudgetGrid").data("kendoGrid").dataSource.read();
    },

    fn_popBudgetDetail: function (key){
        var url = "/budget/pop/regMakeBudget.do";

        if(key != "" && key != null){
            url += "?key=" + key;
        }

        var name = "_blank";
        var option = "width = 900, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    fn_modBudget : function (){
        var arr = [];
        $("input[name='mChecks']:checked").each(function(){
            arr.push($(this).val());
        });

        if(arr.length == 0){
            alert("수정하실 예산을 선택해주세요.");
            return;
        }

        var url = "/budget/pop/regMakeBudget.do?arKey=" + arr;

        var name = "_blank";
        var option = "width = 900, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}