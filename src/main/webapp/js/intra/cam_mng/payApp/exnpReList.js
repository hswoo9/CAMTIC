var exnpReList = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
        });

        exnpReList.global.dropDownDataSource = [
            { text: "승인", value: "Y" },
            { text: "미결", value: "N" },
        ]
        customKendo.fn_dropDownList("searchStatus", exnpReList.global.dropDownDataSource, "text", "value");
        $("#searchStatus").data("kendoDropDownList").bind("change", exnpReList.gridReload);
        exnpReList.global.dropDownDataSource = [
            { text: "프로젝트", value: "PJT_NM" },
            { text: "예산비목", value: "BUDGET_NM" },
            { text: "거래처", value: "CRM_NM" },
            { text: "제목", value: "EXNP_BRIEFS" },
        ]
        customKendo.fn_dropDownList("searchKeyword", exnpReList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", exnpReList.gridReload);
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
            excel : {
                fileName : "지출 반제결의 목록.xlsx",
                filterable : true
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
                    name: 'excel',
                    text: '엑셀다운로드'
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
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    width: 120,
                    field: "DOC_NO"
                }, {
                    title: "지출유형",
                    width: 80,
                    field: "TYPE"
                }, {
                    title: "증빙유형",
                    width: 80,
                    field: "EVID_TYPE_TEXT",
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM_EX",
                    width: 200,
                    template: function(e){
                        return e.BUDGET_NM_EX.replaceAll("/", "-");
                    }
                }, {
                    title: "거래처",
                    width: 200,
                    template: function(e){
                        if(e.CRM_CNT > 1){
                            return e.CRM_NM + " 외 " + Number(e.CRM_CNT-1);
                        } else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "적요(제목)",
                    field: "EXNP_BRIEFS",
                    width: 250,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpReList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\')">'+e.EXNP_BRIEFS+'</div>';
                    }
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
                    title: "결의일자",
                    width: 80,
                    field: "R_DT",
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
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
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchStatus: $("#searchStatus").val(),
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