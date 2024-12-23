var now = new Date();
var docContent = "";

var check;
var evalGoalSetPop = {
    global : {
        menuCd : $("#menuCd").val(),
        empSeq : $("#empSeq").val(),
        now : new Date(),
    },

    fn_defaultScript: function(){
        window.resizeTo(1600, 850);

        evalGoalSetPop.dataSet();

        $("#empName, #deptName, #dutyName, .teamGoals").kendoTextBox({
            enable: false
        });

        $(".numberInput").keyup(function(){
            $(this).val(evalGoalSetPop.comma(evalGoalSetPop.uncomma($(this).val())));
        });
    },

    setEmpEvalGoalSet : function(){
        if($("#teamEmpListTb tr").length == 1){
            alert("저장할 개인별 재무성과 데이터가 없습니다.");
            return;
        }


        var empEvalGoalTempArr = new Array();
        $("#teamEmpListTb tr").each(function(i, v){
            var empSeq = $(this).find("input[name='empSeq']").val();
            var data = {
                baseYear : String(evalGoalSetPop.global.now.getFullYear()),
                empSeq : $(this).find("input[name='empSeq']").val(),
                orderGoals : String(evalGoalSetPop.uncomma($("#empOrderGoals_" + empSeq).val())),
                salesGoals : String(evalGoalSetPop.uncomma($("#empSalesGoals_" + empSeq).val())),
                revenueGoals : String(evalGoalSetPop.uncomma($("#empRevenueGoals_" + empSeq).val())),
                costGoals : String(evalGoalSetPop.uncomma($("#empCostGoals_" + empSeq).val())),
                commerIndexGoals : String(evalGoalSetPop.uncomma($("#empCommerIndexGoals_" + empSeq).val())),
                regEmpSeq : $("#regEmpSeq").val(),
            }

            empEvalGoalTempArr.push(data);
        })

        $.ajax({
            url : "/evaluation/setEvalGoalTemp",
            data : {
                empEvalGoalTempArr : JSON.stringify(empEvalGoalTempArr)
            },
            dataType : "json",
            type : "post",
            success: function (rs) {
                $("#evalGoalTempGroup").val(rs.params.evalGoalTempGroup)
                evalGoalSetPop.evalGoalDrafting()
            },
            error: function () {
                alert("신청 데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    evalGoalDrafting : function(){
        $("#evalGoalDraftFrm").one("submit", function() {
            var url = "/popup/evaluation/approvalFormPopup/evalGoalApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);

            this.action = url;
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },


    fn_topTableClose : function(){
        var topWindow = window.top;
        topWindow.close();
    },

    dataSet : function() {
        var data = {
            arr : "0&N|4&1|4&2",
            fullTime2 : "1"
        };

        if(!$("#deptTeam").val()){
            data.deptComp = $("#deptComp").val()
        }else{
            data.deptTeam = $("#deptTeam").val()
        }

        var result = customKendo.fn_customAjax("/evaluation/getUserList", data)
        var html = "";
        if(result.rs != null){
            var rs = result.rs.filter(e => !['1', '2', '3', '4', '5', '7'].includes(e.DUTY_CODE));
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){
                    html += '' +
                        '<tr>' +
                            '<td class="text-center">' +
                                '<input type="hidden" name="empSeq" value="' + rs[i].EMP_SEQ + '">' +
                                rs[i].EMP_NAME_KR +
                            '</td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empOrderGoals_' + rs[i].EMP_SEQ + '" class="empGoals empOrderGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empOrderGoals\', \'teamOrderGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empSalesGoals_' + rs[i].EMP_SEQ + '" class="empGoals empSalesGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empSalesGoals\', \'teamSalesGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empRevenueGoals_' + rs[i].EMP_SEQ + '" class="empGoals empRevenueGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empRevenueGoals\', \'teamRevenueGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empCostGoals_' + rs[i].EMP_SEQ + '" class="empGoals empCostGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empCostGoals\', \'teamCostGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empCommerIndexGoals_' + rs[i].EMP_SEQ + '" class="empGoals empCommerIndexGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empCommerIndexGoals\', \'teamCommerIndexGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                        '</tr>';
                }
            }else{
                html += '' +
                    '<tr>' +
                        '<td class="text-center" colspan="11">데이터가 없습니다.</td>'
                    '</tr>'
            }

        }else{
            html += '' +
                '<tr>' +
                    '<td class="text-center" colspan="11">데이터가 없습니다.</td>'
                '</tr>'
        }

        $("#teamEmpListTb").append(html)

        $(".empGoals").kendoTextBox()

        $(".numberInput").keyup(function(){
            $(this).val(evalGoalSetPop.comma(evalGoalSetPop.uncomma($(this).val())));
        });
    },

    empGoalsChange : function(s, t){
        var sum = 0;
        $.each($("." + s), function(){
            sum += Number(uncomma($(this).val()))
        })
        $("#" + t).val(comma(sum));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return Number(str.replace(/[^\d]+/g, ''));
    },
}

