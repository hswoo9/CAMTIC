var entryList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){

        entryList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", entryList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", entryList.gridReload);

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 2)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)

        customKendo.fn_datePicker("exnpStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("exnpEndDe", "depth", "yyyy-MM-dd", new Date());

        entryList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "적요", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
        ]
        customKendo.fn_dropDownList("searchKeyword", entryList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", entryList.gridReload);

        customKendo.fn_textBox(["searchValue"]);
        entryList.gridReload();
    },

    mainGrid : function(url, params){
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="entryList.fn_exnpApprove()">' +
                            '	<span class="k-button-text">결의서 승인</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="entryList.fn_regExnpInPop()">' +
                            '	<span class="k-button-text">여입결의서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="entryList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
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
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "문서유형",
                    width: 70,
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
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "적요",
                    field: "EXNP_BRIEFS",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="entryList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\', \'in\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 210,
                }, {
                    title: "세출과목",
                    field: "BUDGET_NM_EX",
                    width: 210
                }, {
                    title: "신청일",
                    width: 70,
                    field: "REG_DT",
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "입금요청일",
                    width: 70,
                    field: "REQ_DE"
                }, {
                    title: "입금예정일",
                    width: 70,
                    field: "DT3"
                }, {
                    title: "입금완료일",
                    width: 70,
                    field: "REQ_END_DE"
                }, {
                    title: "입금금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
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
        entryList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            strDe : $("#exnpStrDe").val(),
            endDe : $("#exnpEndDe").val(),
            payAppType : 2
        }

        entryList.mainGrid("/pay/getExnpList", entryList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, paySn, status){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regExnpInPop : function(){
        var url = "/payApp/pop/regExnpPop.do?status=in&regFlag=new";
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