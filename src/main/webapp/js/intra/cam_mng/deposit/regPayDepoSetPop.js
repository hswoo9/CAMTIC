var regPayDepoSet = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("payIncpDe", "month", "yyyy-MM-dd", new Date());

        if($("#appDe").val() != null && $("#getDelvDe").val() != ""){
            $("#appDe").val($("#getDelvDe").val());
        }


        customKendo.fn_textBox(["pjtNm", "depoTitle", "accNm", "accNo", "bnkNm", "budgetNm", "depoAmt", "depoManager", "payDepoReqUser"]);

        if($("#paramPm").val() != null && $("#paramPm").val() != ""){
            $("#depoManager").val($("#paramPm").val());
        }

        $("#depoCont").kendoTextArea({
            rows: 5,
        });

        $("#depoStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "미입금", value: 1 },
                { text: "입금완료", value: 2 },
            ],
            index: 0
        });

        $("#gubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "청구", value: "a" },
                { text: "영수", value: "b"},
            ],
            index: 0,
            change : function (e){
                if(this.value() == "b"){
                    $("#depoStat").data("kendoDropDownList").value(2);
                    $("#thPayIncpDeText").text("입금일자");
                } else if(this.value() == "a"){
                    $("#depoStat").data("kendoDropDownList").value(1);
                    $("#thPayIncpDeText").text("입금예정일");
                }
            }
        })

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        });

        if($("#paramPjtSn").val() != ""){
            regPayDepoSet.fn_setData();
        }

        /*if($("#paramPjtSn").val() != ""){
            regPayDepoSet.fn_setProjectData();
        }*/
    },

    fn_setData: function (){
        var data = {
            paramPjtCd : $("#paramPjtCd").val()
        }

        $.ajax({
            url : "/mng/getManageDepo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.rsult;

                $("#pjtNm").val(rs.PJT_NM);
                $("#pjtSn").val(rs.PJT_SN);
                $("#pjtCd").val(rs.PJT_CD);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);
            }
        });
    },

    fn_save : function (){
        var parameters = {
            pjtNm : $("#paramPjtNm").val(),
            pjtSn : $("#paramPjtSn").val(),
            pjtCd : $("#paramPjtCd").val(),
            aftPjtSn : $("#pjtSn").val(),
            aftPjtCd : $("#pjtCd").val(),
            budgetSn : $("#budgetSn").val(),
            budgetNm : $("#budgetNm").val(),
            regEmpSeq : $("#regEmpSeq").val()
        };

        if(parameters.pjtSn == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.budgetSn == ""){
            alert("비목을 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/mng/setManageDepo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    window.close();
                }
            }
        });
    },

    inputNumberFormat : function (obj){
        obj.value = regPayDepoSet.comma(regPayDepoSet.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (type){

        var url = "/pay/pop/depoBudgetViewPop.do";
        //var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1300, height = 650, top = 100, left = 400, location = no, scrollbars = no";
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&temp=2";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

}
