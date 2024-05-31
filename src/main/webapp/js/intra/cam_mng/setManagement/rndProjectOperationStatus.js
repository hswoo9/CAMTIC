let sum=0;
let prevSaleSum=0;
let prevIncpSum=0;
let nextSaleSum=0;
let nextIncpSum=0;
var rndStat = {

    fn_defaultScript : function (){
        customKendo.fn_textBox(["deptName", "searchText"]);
        customKendo.fn_datePicker("year", 'decade', "yyyy", new Date());

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "R&D", value: "R" },
                { text: "비R&D", value: "S" },
            ],
            index: 0
        });

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "프로젝트코드", value: "1" },
                { text: "프로젝트명", value: "2" },
                { text: "업체명", value: "3" },
                { text: "담당자", value: "4" }
            ],
            index: 0
        });

        this.mainGrid();
    },

    gridReload : function (){
        this.mainGrid();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/project/getRndProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.busnClass = $("#busnClass").val();
                    data.busnSubClass = $("#busnSubClass").val();
                    data.searchValue = $("#searchValue").val();
                    data.searchText = $("#searchText").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.empName = $("#empName").val();
                    data.pjtYear = $("#pjtYear").val();
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
            selectable: "row",
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="rndStat.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(e){
                /** 합계 */
                $("#total").text(fn_numberWithCommas(sum));
                $("#prevSaleTotal").text(fn_numberWithCommas(prevSaleSum));
                $("#prevIncpTotal").text(fn_numberWithCommas(prevIncpSum));
                $("#nextSaleTotal").text(fn_numberWithCommas(nextSaleSum));
                $("#nextIncpTotal").text(fn_numberWithCommas(nextIncpSum));
                sum = 0;
                prevSaleSum = 0;
                prevIncpSum = 0;
                nextSaleSum = 0;
                nextIncpSum = 0;
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 40
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 60
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 80,
                    template: function(e){
                        if(e.DELV_APPROVE_STAT == "100"){
                            return e.PJT_CD;
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 280,
                }, {
                    field: "CRM_NM",
                    title: "주관기관(업체명)",
                    width: 120,
                }, {

                    field: "STR_DT2",
                    title: "수주일",
                    width: 80,
                }, {
                    field: "END_DT2",
                    title: "종료일자",
                    width: 80,
                    footerTemplate: "합계"
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: 100,
                    template: function(e){
                        sum += Number(e.PJT_AMT);
                        return '<div style="text-align: right;">'+rndStat.comma(e.PJT_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<div id='total' style='text-align: right;'></div>";
                    }
                }, {
                    field: "PREV_SALE_AMT",
                    title: "전년도 매출액",
                    width: 100,
                    template: function(e){
                        prevSaleSum += Number(e.PREV_SALE_AMT);
                        return '<div style="text-align: right;">'+rndStat.comma(e.PREV_SALE_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<div id='prevSaleTotal' style='text-align: right;'></div>";
                    }
                }, {
                    field: "PREV_INCP_AMT",
                    title: "전년도 운영수익",
                    width: 100,
                    template: function(e){
                        prevIncpSum += Number(e.PREV_INCP_AMT);
                        return '<div style="text-align: right;">'+rndStat.comma(e.PREV_INCP_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<div id='prevIncpTotal' style='text-align: right;'></div>";
                    }
                }, {
                    field: "NEXT_SALE_AMT",
                    title: "차년도 매출액",
                    width: 100,
                    template: function(e){
                        nextSaleSum += Number(e.NEXT_SALE_AMT);
                        return '<div style="text-align: right;">'+rndStat.comma(e.NEXT_SALE_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<div id='nextSaleTotal' style='text-align: right;'></div>";
                    }
                }, {
                    field: "NEXT_INCP_AMT",
                    title: "차년도 운영수익",
                    width: 100,
                    template: function(e){
                        nextIncpSum += Number(e.NEXT_INCP_AMT);
                        return '<div style="text-align: right;">'+rndStat.comma(e.NEXT_INCP_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<div id='nextIncpTotal' style='text-align: right;'></div>";
                    }
                }, {
                    title: "",
                    width: 50,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="rndStat.fn_rndProjectAmtUpdate('+e.PJT_SN+', '+ e.GOVT_PJT_SN +')">수정</button>'
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_rndProjectAmtUpdate : function(key, subKey){
        var url = "/setManagement/pop/updRndProjectAmt.do?pjtSn=" + key;

        if(subKey != "" && subKey != null && subKey != undefined){
            url += "&govtPjtSn=" + subKey;
        }

        var name = "_blank";
        var option = "width = 850, height = 450, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
};