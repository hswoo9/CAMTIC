var now = new Date();
var docContent = "";

var check;
var evalGoalSetPop = {
    global : {
        menuCd : $("#menuCd").val(),
        empSeq : $("#empSeq").val(),
        now : new Date(),
        excludesSeq : ""
    },

    fn_defaultScript: function(){
        window.resizeTo(1600, 850);

        evalGoalSetPop.getEvalAchieveSet();
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

        var sum = 0;
        $.each($("input.empOrderGoals"), function(){
            sum += evalGoalSetPop.uncomma($(this).val())
        })

        if(sum != Number(evalGoalSetPop.uncomma($("#teamOrderGoals").val()))){
            alert("팀의 수주 목표가 개인별 목표 총액의 합이 일치하지 않습니다.");
            return;
        }

        sum = 0;
        $.each($("input.empSalesGoals"), function(){
            sum += evalGoalSetPop.uncomma($(this).val())
        })

        if(sum != Number(evalGoalSetPop.uncomma($("#teamSalesGoals").val()))){
            alert("팀의 매출 목표가 개인별 목표 총액의 합이 일치하지 않습니다.");
            return;
        }

        sum = 0;
        $.each($("input.empRevenueGoals"), function(){
            sum += evalGoalSetPop.uncomma($(this).val())
        })

        if(sum != Number(evalGoalSetPop.uncomma($("#teamRevenueGoals").val()))){
            alert("팀의 수익 목표가 개인별 목표 총액의 합이 일치하지 않습니다.");
            return;
        }

        sum = 0;
        $.each($("input.empCostGoals"), function(){
            sum += evalGoalSetPop.uncomma($(this).val())
        })

        if(sum != Number(evalGoalSetPop.uncomma($("#teamCostGoals").val()))){
            alert("팀의 비용 목표가 개인별 목표 총액의 합이 일치하지 않습니다.");
            return;
        }

        var empEvalGoalTempArr = new Array();
        $("#teamEmpListTb tr").each(function(i, v){
            var empSeq = $(this).find("input[name='empSeq']").val();
            var data = {
                baseYear : String(evalGoalSetPop.global.now.getFullYear()),
                teamSeq : $("#deptTeam").val(),
                empSeq : $(this).find("input[name='empSeq']").val(),
                orderGoals : String(evalGoalSetPop.uncomma($("#empOrderGoals_" + empSeq).val())),
                salesGoals : String(evalGoalSetPop.uncomma($("#empSalesGoals_" + empSeq).val())),
                revenueGoals : String(evalGoalSetPop.uncomma($("#empRevenueGoals_" + empSeq).val())),
                costGoals : String(evalGoalSetPop.uncomma($("#empCostGoals_" + empSeq).val())),
                commerIndexGoals : $("#empCommerIndexGoals_" + empSeq).val(),
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

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
            type : "post",
            data : {
                baseYear : $("#nowYear").val(),
                year : $("#nowYear").val(),
                deptLevel : '2',
                deptSeq : $("#deptTeam").val()
            },
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.rs != null){
                    $("#orderWeights").text(rs.rs.ORDER_WEIGHTS + "%")
                    $("#salesWeights").text(rs.rs.SALES_WEIGHTS + "%")
                    $("#revenueWeights").text(rs.rs.REVENUE_WEIGHTS + "%")
                    evalGoalSetPop.global.excludesSeq = rs.rs.EXCLUDES_SEQ.split(",")

                    $("#teamOrderGoals").val(rs.rs.teamGoal[0].DELV_OBJ)
                    $("#teamSalesGoals").val(rs.rs.teamGoal[0].SALE_OBJ)
                    $("#teamRevenueGoals").val(rs.rs.teamGoal[0].INCP_OBJ)

                    if(rs.rs.teamGoalOper.length > 0){
                        $("#teamCostGoals").val(
                            evalGoalSetPop.comma(Number(evalGoalSetPop.uncomma(rs.rs.teamGoalOper[0].PAYROLL_OBJ)) +
                            Number(evalGoalSetPop.uncomma(rs.rs.teamGoalOper[0].EXNP_OBJ)) +
                            Number(evalGoalSetPop.uncomma(rs.rs.teamGoalOper[0].COMM_OBJ)))
                        )
                    }

                    if($("#teamRevenueGoals").val() != "0" && $("#teamCostGoals").val() != "0"){
                        let revenueGoal = Number(evalGoalSetPop.uncomma($("#teamRevenueGoals").val()));
                        let costGoal = Number(evalGoalSetPop.uncomma($("#teamCostGoals").val()));
                        let result = (revenueGoal / costGoal) * 100;

                        $("#teamCommerIndexGoals").val(Math.round(result * 10) / 10)
                    }
                }
            },
            error : function(e) {
                console.log(e);
            }
        });
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
            var rs = result.rs.filter(e => !['1', '2', '3', '4', '5', '7'].includes(e.DUTY_CODE) && !evalGoalSetPop.global.excludesSeq.includes(String(e.EMP_SEQ)) );
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){
                    html += '' +
                        '<tr>' +
                            '<td class="text-center">' +
                                '<input type="hidden" name="empSeq" value="' + rs[i].EMP_SEQ + '">' +
                                rs[i].EMP_NAME_KR +
                            '</td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empOrderGoals_' + rs[i].EMP_SEQ + '" class="empGoals empOrderGoals numberInput" value="0" oninput="">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empSalesGoals_' + rs[i].EMP_SEQ + '" class="empGoals empSalesGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empSalesGoals\', \'teamSalesGoals\')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empRevenueGoals_' + rs[i].EMP_SEQ + '" class="empGoals empRevenueGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empRevenueGoals\', \'teamRevenueGoals\', ' + rs[i].EMP_SEQ + ')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empCostGoals_' + rs[i].EMP_SEQ + '" class="empGoals empCostGoals numberInput" value="0" oninput="evalGoalSetPop.empGoalsChange(\'empCostGoals\', \'teamCostGoals\', ' + rs[i].EMP_SEQ + ')">' +
                            '</td>' +
                            '<td class="text-center"></td>' +
                            '<td class="text-center">' +
                                '<input type="text" id="empCommerIndexGoals_' + rs[i].EMP_SEQ + '" class="empGoals empCommerIndexGoals numberInput" value="0" disabled>' +
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

    empGoalsChange : function(s, t, empSeq){
        if(s == "empRevenueGoals" || s == "empCostGoals"){
            if($("#empRevenueGoals_" + empSeq).val() != "0" && $("#empCostGoals_" + empSeq).val() != "0"){
                let revenueGoal = Number(evalGoalSetPop.uncomma($("#empRevenueGoals_" + empSeq).val()));
                let costGoal = Number(evalGoalSetPop.uncomma($("#empCostGoals_" + empSeq).val()));
                let result = (revenueGoal / costGoal) * 100;

                $("#empCommerIndexGoals_" + empSeq).val(Math.round(result * 10) / 10)
            }
        }
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

