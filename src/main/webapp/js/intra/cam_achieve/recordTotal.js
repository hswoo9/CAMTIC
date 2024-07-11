let pjtAmtSum=0;
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
                    url : '/cam_achieve/getProjectList',
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

                    field: "PJT_STR_DE2",
                    title: "시작일",
                    width: 100,
                    template: function (e) {
                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
                            if(e.PJT_STR_DE2 == null || e.PJT_STR_DE2 == ""){
                                return e.PJT_STR_DE;
                            }
                            // var date = new Date(e.STR_DT);
                            // var yyyy = date.getFullYear();
                            // var mm = date.getMonth()+1;
                            // mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                            // var dd = date.getDate();
                            // dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                            // return yyyy+'-'+mm+'-'+dd;
                            return e.PJT_STR_DE2;
                        } else {
                            return e.DELV_EST_DE || "";
                        }
                    }
                }, {
                    field: "PJT_END_DE2",
                    title: "종료일",
                    width: 100,
                    template: function(e){
                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
                            if(e.PJT_END_DE2 == null || e.PJT_END_DE2 == ""){
                                return e.PJT_END_DE;
                            }
                            // var date = new Date(e.END_DT);
                            // var yyyy = date.getFullYear();
                            // var mm = date.getMonth()+1;
                            // mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                            // var dd = date.getDate();
                            // dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                            // return yyyy+'-'+mm+'-'+dd;
                            return e.PJT_END_DE2;
                        } else {
                            return e.DELV_DATE || "";
                        }

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
                        var pjtNm = e.PJT_NM;
                        /*if(e.BUSN_CLASS == "S"){
                            pjtNm = e.BS_TITLE;
                        }*/
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="camPrj.fn_projectPopView('+e.PJT_SN+', \'' + e.BUSN_CLASS + '\')">' + pjtNm + '</div>';
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
                        if(e.YEAR_CLASS == "M"){
                            return '<div style="text-align: right;">'+comma(e.ALL_PJT_AMT)+'</div>';
                        } else {
                            return '<div style="text-align: right;">'+comma(e.PJT_AMT)+'</div>';
                        }
                    }
                }, {
                    field: "PJT_AMT",
                    title: "총사업비",
                    width: 100,
                    template: function(e){
                        var totalCost = 0

                        totalCost = e.PJT_AMT;
                        pjtAmtSum += Number(totalCost || 0);
                        return '<div style="text-align: right;">'+comma(totalCost)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(pjtAmtSum)+"</div>";
                    }
                }, {
                    title: "매출액",
                    width: 100,
                    template: function(e){
                        exnpCompAmtSum += Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0);
                        console.log(e);
                        return '<div style="text-align: right;">'+comma(Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(exnpCompAmtSum)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        incpCompAmtSum += Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpCompAmtSum)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        tmpSaleAmtSum += Number(e.PJT_AMT || 0) - Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0);
                        return '<div style="text-align: right;">'+comma(Number(Number(e.PJT_AMT || 0) - Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0)))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(tmpSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "예상수익",
                    width: 100,
                    template: function(e){
                        console.log(Number(e.INV_AMT || 0));
                        console.log(Number(e.incpCompAmt || 0));
                        console.log(Number(e.befExpProfitAmt || 0));
                        console.log(Number(e.aftProfitAmt || 0));
                        tmpProfitAmtSum += Number(e.PJT_AMT || 0) - Number(e.INV_AMT || 0) - Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0);
                        return '<div style="text-align: right;">'+comma(Number(e.PJT_AMT || 0) - Number(e.INV_AMT || 0) - Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0))+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(tmpProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        befExpSaleAmtSum += Number(e.befExpSaleAmt || 0);
                        return '<div style="text-align: right;">'+comma(e.befExpSaleAmt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(befExpSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        befExpProfitAmtSum += Number(e.befExpProfitAmt || 0);
                        return '<div style="text-align: right;">'+comma(e.befExpProfitAmt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(befExpProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        aftSaleAmtSum += Number(e.aftSaleAmt || 0);
                        return '<div style="text-align: right;">'+comma(e.aftSaleAmt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(aftSaleAmtSum)+"</div>";
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        aftProfitAmtSum += Number(e.aftProfitAmt || 0);
                        return '<div style="text-align: right;">'+comma(e.aftProfitAmt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(aftProfitAmtSum)+"</div>";
                    }
                }, {
                    title: "설정",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="recordTotal.fn_modPaySetting('+e.PJT_SN+')">설정</button>';
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

    fn_modPaySetting: function (key){

        var url = "/cam_achieve/pop/paySetting.do?pjtSn=" + key;

        var name = "_blank";
        var option = "width = 800, height = 200, top = 100, left = 200, location = no"


        var popup = window.open(url, name, option);

    }
}