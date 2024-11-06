var budgetChoicePop = {

    global: {

    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        budgetChoicePop.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getEnaraBudgetCdList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    data.fsYear = $("#fromMonth").val();
                    data.bgNm = $("#bgNm").val();

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
        });

        var mg = $("#budgetChoice").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 650,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns: [
                {
                    field : "ASSTN_EXPITM_TAXITM_CODE",
                    title : "보조비세목코드",
                    width : 60
                },
                {
                    field : "ASSTN_EXPITM_NM",
                    title : "보조비목명",
                    width : 80
                },
                {
                    field : "ASSTN_TAXITM_NM",
                    title : "보조세목명",
                    width : 80
                },
                {
                    title : "보조비목세목설명",
                    width : 300,
                    template: function(e){
                        return (e.ASSTN_TAXITM_CODE_DC || "")
                    }
                },
                {
                    title : "",
                    width : 40,
                    template: function(e){
                        if($("#type").val() == "rs"){
                            return '<button type="button" class="k-button k-button-solid-base" onclick="budgetChoicePop.fn_setSubmitBudgetCode('+e.ASSTN_EXPITM_TAXITM_CODE+', \''+e.ASSTN_TAXITM_NM+'\')">선택</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="budgetChoicePop.fn_setEnaraBudgetCode('+e.CNTC_SN+','+e.ASSTN_EXPITM_TAXITM_CODE+', \''+e.ASSTN_EXPITM_NM+'\', \''+e.ASSTN_TAXITM_NM+'\')">설정</button>'
                        }
                    }
                }
                ]
        }).data("kendoGrid");
    },

    fn_setEnaraBudgetCode : function(sn, cd, exp, tax){
        if(!confirm("설정하시겠습니까?")){
            return;
        }


        var data = {
            fsyr : $("#fromMonth").val(),
            budgetSn : $("#budgetSn").val(),
            cntcSn : sn,
            asstnExpitmTaxitmCode : cd,
            asstnExpitmNm : exp,
            asstnTaxitmNm : tax
        };

        $.ajax({
            type : "post",
            url : "/kukgoh/setEnaraBudgetCode",
            data : data,
            success : function(rs) {
                if(rs.code == 200){
                    alert(rs.message);
                    opener.parent.budgetConfigView.gridReload();
                    window.close();
                }
            }
        });
    },

    fn_setSubmitBudgetCode : function(cd, tax){
        opener.parent.$("#ASSTN_TAXITM_CODE_NM").val(tax);
        opener.parent.$("#ASSTN_TAXITM_CODE").val(cd);

        window.close();
    }

}