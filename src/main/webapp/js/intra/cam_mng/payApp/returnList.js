var returnList = {

    global : {
        dropDownDataSource: "",
        searchAjaxDat : "",
        saveAjaxData: "",
    },

    fn_defaultScript : function (){

        returnList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", returnList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", returnList.gridReload);

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 2)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)

        customKendo.fn_datePicker("exnpStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("exnpEndDe", "depth", "yyyy-MM-dd", new Date());


        returnList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "적요", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
        ]

        customKendo.fn_dropDownList("searchKeyword", returnList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", returnList.gridReload);

        customKendo.fn_textBox(["searchValue"]);
        returnList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="returnList.fn_exnpApprove()">' +
                            '	<span class="k-button-text">결의서 승인</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="returnList.fn_regExnpRePop()">' +
                            '	<span class="k-button-text">반납결의서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="returnList.gridReload()">' +
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
                        if(e.DOC_STATUS == "100"){
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
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "지출유형",
                    width: 80,
                    template : function(e){
                        return '반납';
                    }
                }, {
                    title: "증빙유형",
                    width: 80,
                    template: function(e){
                        if(e.EVI_TYPE == 1){
                            return "세금계산서";
                        } else if (e.EVI_TYPE == 2){
                            return "계산서";
                        } else if(e.EVI_TYPE == 3){
                            return "신용카드";
                        } else if(e.EVI_TYPE == 4){
                            return "직원지급";
                        } else if(e.EVI_TYPE == 5){
                            return "사업소득자";
                        } else if(e.EVI_TYPE == 9){
                            return "기타소득자";
                        } else {
                            return "기타";
                        }
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM_EX",
                    width: 200
                }, {
                    title: "거래처",
                    width: 200,
                    template: function(e){
                        if(e.CNT > 1){
                            return e.CRM_NAME + " 외 " + Number(e.CNT-1);
                        } else {
                            return e.CRM_NAME
                        }
                    }
                }, {
                    title: "적요(제목)",
                    field: "EXNP_BRIEFS",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="entryList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\', \'in\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title : "작성자",
                    width: 80,
                    field: "REG_EMP_NAME"
                }, {
                    title: "반납금액",
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
                    field: "EXNP_DE",
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
                        // if(e.RE_STAT == "N"){
                        //     return ""
                        // } else {
                        return '<button type="button" class="k-button k-button-solid-base" onclick="exnpReList.fn_regPayAttPop('+e.PAY_APP_SN+', '+e.EXNP_SN+')">첨부</button>';
                        // }
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

    gridReload : function(){
        returnList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            strDe : $("#exnpStrDe").val(),
            endDe : $("#exnpEndDe").val(),
            payAppType : 3
        }

        returnList.mainGrid("/pay/getExnpList", returnList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, paySn, status){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?exnpSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regExnpRePop : function(){
        var url = "/payApp/pop/regExnpPop.do?status=re&regFlag=new";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_exnpApprove : function (){

        if($("input[name='check']:checked").length == 0){
            alert("선택된 결의서가 없습니다.");
            return;
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }
        
        $("#my-spinner").show();
        $("input[name=check]:checked").each(function(){
            var parameters = {
                exnpSn : this.value,
                regEmpSeq : $("#myEmpSeq").val(),
                empSeq : $("#myEmpSeq").val(),
                exnpG20Stat : 'Y',
            }

            const result = customKendo.fn_customAjax("/pay/resolutionExnpAppr", parameters);
        });

        alert("승인되었습니다.");
        $("#my-spinner").hide();

        $("#mainGrid").data("kendoGrid").dataSource.read();
    },
}