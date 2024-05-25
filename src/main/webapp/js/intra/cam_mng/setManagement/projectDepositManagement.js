let sum=0;
var prjDepositMng = {

    fn_defaultScript : function (){
        customKendo.fn_textBox(["deptName", "searchText"]);
        customKendo.fn_datePicker("year", 'decade', "yyyy", new Date());

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS"
        };
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        bcDs.rs.pop(); // 법인 삭제
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "미등록", value: "999" },
                { text: "설정 완료", value: "1000" }
            ],
            index: 0
        });

        $("#searchValue2").kendoDropDownList({
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

        $("#busnSubClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "미수주", value: "Y" },
                { text: "예상", value: "'Y', 'E', 'E1', 'E2', 'R', 'S'" },
                { text: "진행", value: "'E3', 'E4', 'E5', 'R2', 'R2', 'S2'" },
                { text: "완료", value: "'E6', 'E7', 'R3', 'S3'" }
            ],
            index: 4
        });

        this.mainGrid();
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridSearch : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
        $("#mainGrid").data("kendoGrid").dataSource.page(1);
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/project/getProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.busnClass = $("#busnClass").val();
                    data.searchValue = $("#searchValue").val();
                    data.searchValue2 = $("#searchValue2").val();
                    data.searchText = $("#searchText").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.regEmpSeq = $("#regEmpSeq").val();
                    data.myDeptSeq = $("#myDeptSeq").val();
                    data.busnSubClass = "'E', 'E2', 'E3', 'E4', 'E5', 'R2', 'S', 'R', 'S2','E6', 'E7', 'R3', 'S3'";

                    data.year = $("#year").val();

                    data.manageYn = 'Y';
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="prjDepositMng.gridSearch()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(e){
                /** 합계 */
                $("#total").text(fn_numberWithCommas(sum));
                sum = 0;

                /** 협업 없을때 조회 기능 숨김처리 */
                const grid = this;
                grid.tbody.find("tr").each(function(){
                    var dataItem = grid.dataItem($(this));
                    if(dataItem.PNT_PJT_SN_CK == null){
                        $(this).find(".k-i-expand").hide();
                    }
                });
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 100
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    template: function(e){
                        var pjtNm = e.PJT_NM;
                        return pjtNm;
                    }
                }, {

                    field: "STR_DT",
                    title: "수주일",
                    width: 100,
                    template: function (e) {
                        if (e.STR_DT == null || e.STR_DT == "") {
                            return "";
                        }
                        var date = new Date(e.STR_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth() + 1;
                        mm = mm >= 10 ? mm : '0' + mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0' + dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy + '-' + mm + '-' + dd;
                    }
                }, {
                    field: "END_DT",
                    title: "종료일자",
                    width: 100,
                    template: function(e){
                        if(e.END_DT == null || e.END_DT == ""){
                            return "";
                        }
                        var date = new Date(e.END_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    },
                    footerTemplate: "합계"
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: 100,
                    template: function(e){
                        sum += Number(e.PJT_AMT);
                        return '<div style="text-align: right;">'+prjDepositMng.comma(e.PJT_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<span id='total'></span>";
                    }
                }, {
                    title : "세무정보",
                    width : 100,
                    template : function(e){
                        var depoSetSn = "";

                        if(e.DEPO_SET_SN != null && e.DEPO_SET_SN != "" && e.DEPO_SET_SN != undefined){
                            depoSetSn = e.DEPO_SET_SN;
                        }

                        var style = "";

                        if(e.TAX_GUBUN != null && e.TAX_GUBUN != "" && e.TAX_GUBUN != undefined){
                            style = 'style="background-color: #7aff00 !important"';
                        }

                        return '<button type="button" class="k-button k-button-solid-base" '+style+' onclick="prjDepositMng.fn_taxInfoPop('+e.PJT_SN+', '+depoSetSn+')">세무</button>';
                    }
                }, {
                    title : "예산정보",
                    width : 100,
                    template : function(e){
                        var depoSetSn = "";
                        var style = "";

                        if(e.DEPO_SET_SN != null && e.DEPO_SET_SN != "" && e.DEPO_SET_SN != undefined){
                            depoSetSn = e.DEPO_SET_SN;
                        }

                        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
                            if(e.BUDGET_SN != null && e.BUDGET_SN != "" && e.BUDGET_SN != undefined){
                                style = 'style="background-color: #7aff00 !important"';
                            }
                            return '<button type="button" class="k-button k-button-solid-base" '+style+' onclick="prjDepositMng.fn_depoSetPopView('+e.PJT_SN+', '+depoSetSn+')">예산</button>';
                        } else {
                            if(e.BUDGET_GUBUN != null && e.BUDGET_GUBUN != "" && e.BUDGET_GUBUN != undefined){
                                style = 'style="background-color: #7aff00 !important"';
                            }
                            return '<button type="button" class="k-button k-button-solid-base" '+style+' onclick="prjDepositMng.fn_depoNotBusnSetPopView('+e.PJT_SN+', '+depoSetSn+')">예산</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    // project 상세페이지
    fn_depoSetPopView : function (key, depoSetSn){
        var url = "/pay/pop/regPayDepoSetPop.do";

        if(key != null && key != ""){
            url = "/pay/pop/regPayDepoSetPop.do?pjtSn=" + key;
        }

        if(depoSetSn != null && depoSetSn != "" && depoSetSn != undefined){
            url += "&depoSetSn=" + depoSetSn;
        }

        var name = "예산설정";
        var option = "width = 950, height = 250, top = 100, left = 400, location = no, scrollbars = no";
        var popup = window.open(url, name, option);
    },

    // R&D / 비R&D 예산설정 팝업
    fn_depoNotBusnSetPopView : function (key, depoSetSn){
        var url = "/pay/pop/depoNotBusnSetPopView.do";

        if(key != null && key != ""){
            url = "/pay/pop/depoNotBusnSetPopView.do?pjtSn=" + key;
        }

        if(depoSetSn != null && depoSetSn != "" && depoSetSn != undefined){
            url += "&depoSetSn=" + depoSetSn;
        }

        var name = "예산설정";
        var option = "width = 950, height = 395, top = 100, left = 400, location = no, scrollbars = no";
        var popup = window.open(url, name, option);
    },

    // 민간사업 세무설정
    fn_taxInfoPop : function(key, depoSetSn){
        var url = "/pay/pop/taxInfoPop.do";

        if(key != null && key != ""){
            url = "/pay/pop/taxInfoPop.do?pjtSn=" + key;
        }

        if(depoSetSn != null && depoSetSn != "" && depoSetSn != undefined){
            url += "&depoSetSn=" + depoSetSn;
        }

        var name = "세무설정";
        var option = "width = 950, height = 500, top = 100, left = 400, location = no, scrollbars = no";
        var popup = window.open(url, name, option);
    },

    // 정부사업 세무설정
    fn_taxNotBusnInfoPop : function(key, depoSetSn){
        var url = "/pay/pop/taxNotBusnInfoPop.do";

        if(key != null && key != ""){
            url = "/pay/pop/taxNotBusnInfoPop.do?pjtSn=" + key;
        }

        if(depoSetSn != null && depoSetSn != "" && depoSetSn != undefined){
            url += "&depoSetSn=" + depoSetSn;
        }

        var name = "세무설정";
        var option = "width = 950, height = 500, top = 100, left = 400, location = no, scrollbars = no";
        var popup = window.open(url, name, option);
    }
};

function gridReload(){
    prjDepositMng.gridReload();
}