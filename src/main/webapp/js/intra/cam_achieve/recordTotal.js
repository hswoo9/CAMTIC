let pjtAmtSum=0;
let pjtAmt2Sum=0;
let exnpCompAmtSum=0;
let incpCompAmtSum=0;
let tmpSaleAmtSum=0;
let tmpProfitAmtSum=0;
let befExpSaleAmtSum=0;
let befExpProfitAmtSum=0;
let aftSaleAmtSum=0;
let aftProfitAmtSum=0;

var recordTotal = {

    fn_defaultScript: function(){
        var pjtYear = customKendo.fn_customAjax("/project/getPjtYear", {});
        customKendo.fn_dropDownList("pjtYear", pjtYear.list, "TEXT", "YEAR");

        customKendo.fn_textBox(["deptName", "searchText", "empName"]);

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");


        $("#busnSubClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "미수주", value: "Y" },
                { text: "예상", value: "'Y', 'E', 'E1', 'E2', 'R', 'S'" },
                { text: "진행", value: "'E3', 'E4', 'E5', 'E6', 'E7', 'R2', 'R2', 'S2', 'R3', 'S3'" },
                { text: "완료", value: "res" }
            ],
            index: 0
        });

        $("#consultDt").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "시작일자", value: "1" },
                { text: "완료일자", value: "2" }
            ],
            index: 0
        });

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "진행 프로젝트(담당)", value: "1" },
                { text: "전체 프로젝트(담당)", value: "2" },
                { text: "진행중 프로젝트(전체)", value: "3" },
            ],
            index: 0
        });
        // $("#searchValue").data("kendoDropDownList").value("1");

        $("#searchValue2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "프로젝트명", value: "2" },
                { text: "프로젝트코드", value: "1" },
                { text: "업체명", value: "3" },
                { text: "담당자", value: "4" },
            ],
            index: 0
        });

        $("#empName").on("keyup", function(key){
            if(key.keyCode == 13){
                recordTotal.mainGrid();
            }
        })

        recordTotal.mainGrid();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/cam_achieve/getProjectList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.busnClass = $("#busnClass").val();
                    data.busnSubClass = $("#busnSubClass").val();
                    data.consultDt = $("#consultDt").val();
                    data.searchValue = $("#searchValue").val();
                    data.searchValue2 = $("#searchValue2").val();
                    data.searchText = $("#searchText").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.regEmpSeq = $("#regEmpSeq").val();
                    data.myDeptSeq = $("#myDeptSeq").val();
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
            dataBound: function(e){
                /** 합계 */
                $("#total").text(fn_numberWithCommas(pjtAmtSum));
                pjtAmtSum=0;
                pjtAmt2Sum=0;
                exnpCompAmtSum=0;
                incpCompAmtSum=0;
                tmpSaleAmtSum=0;
                tmpProfitAmtSum=0;
                befExpSaleAmtSum=0;
                befExpProfitAmtSum=0;
                aftSaleAmtSum=0;
                aftProfitAmtSum=0;
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="recordTotal.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "YEAR",
                    title: "기준년도",
                    width: 100
                }, {
                    field: "PJT_STR_DE2",
                    title: "시작일",
                    width: 100,
                    template: function (e) {
                        return e.LIST_STR_DE || "";
                    }
                }, {
                    field: "PJT_END_DE2",
                    title: "종료일",
                    width: 100,
                    template: function(e){
                        return e.LIST_END_DE || "";
                    },
                    footerTemplate: "합계"
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 100
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 450,
                    template: function(e){
                        console.log("e", e);
                        console.log("befExpSaleAmt", Number(e.befExpSaleAmt || 0));
                        console.log("aftSaleAmt", Number(e.aftSaleAmt || 0));
                        console.log("befExpProfitAmt", Number(e.befExpProfitAmt || 0));
                        console.log("aftProfitAmt", Number(e.aftProfitAmt || 0));
                        var pjtNm = e.PJT_NM;
                        /*if(e.BUSN_CLASS == "S"){
                            pjtNm = e.BS_TITLE;
                        }*/
                        var text = "achieve"
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="camPrj.fn_projectPopView('+e.PJT_SN+', \'' + e.BUSN_CLASS + '\', \'' + text + '\')">' + pjtNm + '</div>';
                    }
                }, {
                    field: "CRM_NM",
                    title: "주관기관(업체명)",
                    width: 120,
                    template: function(e){
                        return "<div style=\"text-align: left;\">" + (e.CRM_NM || '') + "</div>";
                    }
                }, {
                    title: "수주금액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        pjtAmt2Sum += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(pjtAmt2Sum)+"</div>";
                    }
                }, {
                    field: "PJT_AMT",
                    title: "총사업비",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        pjtAmtSum += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(pjtAmtSum)+"</div>";
                    }
                }, {
                    title: "매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        exnpCompAmtSum += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(exnpCompAmtSum)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        incpCompAmtSum += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpCompAmtSum)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        tmpSaleAmtSum += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(tmpSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "예상수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        tmpProfitAmtSum += Number(amt);
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(tmpProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        befExpSaleAmtSum += Number(e.befExpSaleAmt2 || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.befExpSaleAmt2 || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(befExpSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        befExpProfitAmtSum += Number(e.befExpProfitAmt2 || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.befExpProfitAmt2 || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(befExpProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        aftSaleAmtSum += Number(e.aftSaleAmt2 || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.aftSaleAmt2 || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(aftSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        aftProfitAmtSum += Number(e.aftProfitAmt2 || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.aftProfitAmt2 || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(aftProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "설정",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="recordTotal.fn_modPaySetting('+e.PJT_SN+', '+e.YEAR+')">설정</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        // $("#mainGrid").data("kendoGrid").setOptions({
        //     selectable : true
        // });

        camPrj.fn_tableSet();
    },

    fn_modPaySetting: function (key, year){

        var url = "/cam_achieve/pop/paySetting.do?pjtSn=" + key + "&year=" + year;

        var name = "_blank";
        var option = "width = 800, height = 200, top = 100, left = 200, location = no"


        var popup = window.open(url, name, option);

    }
}