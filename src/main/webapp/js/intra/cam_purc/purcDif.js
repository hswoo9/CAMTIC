let sum1 = 0;
let sum2 = 0;
let sum3 = 0;

var purcDif = {

    global : {
        dropDownDataSource : []
    },

    fn_defaultScript : function (){
        purcDif.global.dropDownDataSource = [];
        // customKendo.fn_dropDownList("searchDept", purcDif.global.dropDownDataSource, "text", "value");
        // $("#searchDept").data("kendoDropDownList").bind("change", purcDif.gridReload);

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
            purcDif.gridReload();
        });
        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
            purcDif.gridReload();
        });

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "법인운영", value: "C"},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "V"},
            ],
        });

        $("#busnClass").data("kendoDropDownList").bind("change", purcDif.gridReload);

        purcDif.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcDif.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        purcDif.mainGrid();
    },

    mainGrid: function(url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/purc/getPurcClaimList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#myEmpSeq").val();
                    data.searchDept = $("#searchDept").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.busnClass = $("#busnClass").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();

                    return data;
                }
            },
            schema: {
                data: function (data) {
                    for(let i=0; i<data.list.length; i++){
                        sum1 += Number(data.list[i].TOT_PURC_ITEM_AMT);
                        sum2 += Number(data.list[i].TOT_AMT);
                    }
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
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                // {
                //     name: 'button',
                //     template: function(){
                //         return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcDif.fn_reqClaiming()">' +
                //             '	<span class="k-button-text">구매청구서 작성</span>' +
                //             '</button>';
                //     }
                // },
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcDif.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매성과 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            /*dataBound : function(e){
                sum1 = 0;
                sum2 = 0;
                sum3 = 0;
            },*/
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 160,
                }, {
                    field: "CLAIM_DE",
                    title: "청구일",
                    width: 120,
                }, {
                    field: "GOODS_DT",
                    title: "납품(예정)일",
                    width: 120
                }, {
                    field: "CLAIM_TITLE",
                    title: "제목",
                    template : function(e){
                        return '<div onclick="purcDif.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')" style="font-weight: bold; cursor: pointer; text-align: left ">' + e.CLAIM_TITLE + '</div>'
                    }
                }, {
                    field: "CLAIM_EMP_NAME",
                    title: "발주자",
                    width: 100
                }, {
                    field: "PURC_EMP_NAME",
                    title: "요청자",
                    width: 100,
                    template: function(e){
                        if(e.PURC_EMP_NAME != null && e.PURC_EMP_NAME != ""){
                            return e.PURC_EMP_NAME;
                        } else {
                            return e.CLAIM_EMP_NAME;
                        }
                    }
                }, {
                    field: "PURC_DEPT_NAME",
                    title: "요청팀명",
                    width: 100,
                    template: function(e){
                        if(e.PURC_DEPT_NAME != null && e.PURC_DEPT_NAME != ""){
                            return e.PURC_DEPT_NAME;
                        }else{
                            return e.CLAIM_DEPT_NAME;
                        }
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 160,
                    footerTemplate: "합계"
                }, {
                    field: "TOT_PURC_ITEM_AMT",
                    title: "요청금액",
                    width: 100,
                    template: function (e){
                        // sum1  += Number(e.TOT_PURC_ITEM_AMT);
                        return '<div style="text-align: right">'+comma(e.TOT_PURC_ITEM_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(sum1)+"</div>";
                    }
                }, {
                    field: "TOT_AMT",
                    title: "청구금액",
                    width: 100,
                    template: function (e){
                        // sum2  += Number(e.TOT_AMT);
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(sum2)+"</div>";
                    }
                },
                // {
                //     title: "할인금액",
                //     width: 100,
                //     template: function (e){
                //         sum3  += Number(e.TOT_DIF_AMT);
                //         return '<div style="text-align: right">'+comma(e.TOT_DIF_AMT)+'</div>'
                //     },
                //     footerTemplate: function(){
                //         return "<div style='text-align: right'>"+comma(sum3)+"</div>";
                //     }
                // }
                // , {
                //     title: "상태",
                //     width: 120,
                //     template: function (e){
                //         if(e.STATUS != null && e.STATUS != ""){
                //             if(e.STATUS == 100){
                //                 return "구매청구완료";
                //             }else if(e.STATUS > 0){
                //                 return "구매청구작성중";
                //             }else if(e.STATUS == 0){
                //                 return "구매요청완료";
                //             }
                //         }else{
                //             return "미작성";
                //         }
                //     }
                // }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_reqClaiming : function (key, subKey){
        var url = "/purc/pop/reqClaiming.do";

        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;

            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }

        var name = "blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_reqOrder : function (key, subKey){
        var url = "/purc/pop/reqOrder.do";
        if(key != null && key != ""){
            url = "/purc/pop/reqOrder.do?claimSn=" + key;
            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }
        var name = "blank";
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_inspectionPopup : function (key, mod){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key + "&mode=" + mod;
        }
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}