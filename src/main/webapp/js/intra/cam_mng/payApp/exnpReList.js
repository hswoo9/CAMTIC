var exnpReList = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function (){
        exnpReList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", exnpReList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", exnpReList.gridReload);
        exnpReList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]
        customKendo.fn_dropDownList("searchKeyword", exnpReList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        exnpReList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="exnpReList.fn_exnpApprove()">' +
                            '	<span class="k-button-text">반제결의서 승인</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpReList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    width: 30,
                    template : function(e){
                        if(e.TYPE == "반제(지출)"){
                            if(e.RE_STAT == "N"){
                                return '<input type="checkbox" name="check" value="'+e.EXNP_SN+'"/>';
                            } else {
                                return '';
                            }
                        } else {
                            return '';
                        }
                    }
                }, {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "구분",
                    width: 80,
                    field: "TYPE"
                }, {
                    title: "결의일자",
                    width: 70,
                    field: "R_DT",
                }, {
                    title: "적요",
                    field: "EXNP_BRIEFS",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpReList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 210,
                    template: function (e){
                        return e.PJT_NM;
                    }
                }, {
                    title: "세출과목",
                    field: "BUDGET_NM_EX",
                    width: 210
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">'+comma(cost)+'</div>';

                        // if(e.RE_STAT == "Y"){
                        //     return '<div style="text-align: right">'+comma(cost)+'</div>';
                        // } else {
                        //     return '<div style="text-align: right">'+0+'</div>';
                        // }
                    }
                }, {
                    title: "상태",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return "미승인"
                        } else {
                            return "승인"
                        }
                    }
                }, {
                    title: "첨부",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return ""
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="exnpReList.fn_regPayAttPop('+e.PAY_APP_SN+', '+e.EXNP_SN+')">첨부</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=check]").prop("checked", true);
            else $("input[name=check]").prop("checked", false);
        });
    },

    gridReload: function(){
        exnpReList.global.searchAjaxData = {
            empSeq: $("#myEmpSeq").val(),
            searchDept: $("#searchDept").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        }

        exnpReList.mainGrid("/pay/getExnpReList", exnpReList.global.searchAjaxData);
    },

    fn_reqRegPopup: function(key, paySn){
        url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    fn_exnpApprove : function (){

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        $("input[name=check]:checked").each(function(){
            var parameters = {
                exnpSn : this.value,
                regEmpSeq : $("#myEmpSeq").val(),
                empSeq : $("#myEmpSeq").val(),
                exnpG20Stat : 'Y',
            }

            const result = customKendo.fn_customAjax("/pay/resolutionExnpAppr", parameters);
        });

        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_regPayAttPop : function (key, exnpKey){
        var url = "/payApp/pop/regReListFilePop.do?payAppSn=" + key + "&exnpSn=" + exnpKey;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }

}