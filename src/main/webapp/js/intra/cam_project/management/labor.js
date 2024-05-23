var labor = {


    fn_defaultScript : function (){
        labor.mainGrid();

        labor.mainGrid2();
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
        $("#mainGrid2").data("kendoGrid").dataSource.read();

    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/projectMng/getPositionLaborList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="labor.fn_edit(null)">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="labor.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;


                grid.tbody.find("tr").click(function (e) {

                    const dataItem = grid.dataItem($(this));

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
            },
            columns: [
                {
                    title: "시작일",
                    field: "STR_DE",
                    width: 200,
                }, {
                    title: "종료일",
                    field: "END_DE",
                    width: 200,
                }, {
                    field: "CM_CODE_NM",
                    title: "직급",
                    width: 200,
                }, {
                    title: "노임단가",
                    template : function(e){
                        if(e.LABOR_AMT == undefined){
                            return "";
                        }
                        return '<div style="text-align: right">'+labor.comma(e.LABOR_AMT)+' 원</div>';
                    },
                }, {
                    title: "상태",
                    width: 200,
                    template : function(e){
                        if(e.ACTIVE == "Y"){
                            return '<div style="font-weight: bold; ">적용</div>';
                        } else {
                            return ""
                        }
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "최근수정자",
                    width: 200,
                }, {
                    title: "기타",
                    template : function(e){
                        var date = labor.dateFormat();

                        if((e.STR_DE <= date && e.END_DE >= date) || e.END_DE == ""){
                            return '<button type="button" class="k-button k-button-solid-primary" onclick="labor.fn_edit(\''+e.CM_CODE+'\', \''+e.CM_CODE_NM+'\', \''+e.LABOR_HIST_SN+'\')">수정</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-error" onclick="labor.fn_del(\''+e.LABOR_HIST_SN+'\')">삭제</button>';
                        }

                    },
                    width: 100
                },
            ]
        }).data("kendoGrid");
    },

    mainGrid2 : function (){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/projectMng/getTeamCostList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
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

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="labor.fn_teamEdit(null)">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="labor.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;


                grid.tbody.find("tr").click(function (e) {

                    const dataItem = grid.dataItem($(this));

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
            },
            columns: [
                {
                    title: "시작일",
                    field: "STR_DE",
                    width: 200,
                }, {
                    title: "종료일",
                    field: "END_DE",
                    width: 200,
                }, {
                    field: "dept_name",
                    title: "팀",
                    width: 200,
                }, {
                    title: "경비",
                    template : function(e){
                        console.log(e);
                        if(e.TEAM_COST_AMT == undefined){
                            return "";
                        }
                        return '<div style="text-align: right">'+labor.comma(e.TEAM_COST_AMT)+' %</div>';
                    },
                }, {
                    title: "상태",
                    width: 200,
                    template : function(e){
                        if(e.ACTIVE == "Y"){
                            return '<div style="font-weight: bold; ">적용</div>';
                        } else {
                            return ""
                        }
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "최근수정자",
                    width: 200,
                }, {
                    title: "기타",
                    template : function(e){
                        var date = labor.dateFormat();

                        if((e.STR_DE <= date && e.END_DE >= date) || e.END_DE == ""){
                            return '<button type="button" class="k-button k-button-solid-primary" onclick="labor.fn_teamEdit(\''+e.dept_seq+'\', \''+e.TEAM_COST_HIST_SN+'\')">수정</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-error" onclick="labor.fn_teamDel(\''+e.TEAM_COST_HIST_SN+'\')">삭제</button>';
                        }

                    },
                    width: 100
                },
            ]
        }).data("kendoGrid");
    },


    fn_del : function (key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var data = {
            laborHistSn : key
        }
        $.ajax({
            url : "/projectMng/delLaborHistData",
            data :data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.")
                    labor.gridReload();
                }
            }
        })
    },

    dateFormat: function(){
        return new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
    },

    fn_edit: function (code, name, key){

        if(code != null){
            if(key != 'undefined') {

                var data = {
                    positionCd: code
                }
                $.ajax({
                    url: "/projectMng/getLaborData",
                    data: data,
                    type: "post",
                    dataType: "json",
                    success: function (rs) {
                        var rs = rs.rs;
                        $("#laborAmt").val(rs.LABOR_AMT);
                        $("#strDe").val(rs.STR_DE);
                        $("#endDe").val(rs.END_DE);
                    }
                })
                $("#laborSetModal").data("kendoWindow").open();

                $("#laborHistSn").val(key);
            } else {
                $("#laborSetModal").data("kendoWindow").open();
            }
            $("#positionCd").val(code);
            $("#positionNm").data("kendoDropDownList").value(code);
        } else {
            $("#laborSetModal").data("kendoWindow").open();
            $("#positionNm").data("kendoDropDownList").enable(true);

            $("#saveBtn").css("display", "none");
            $("#addBtn").css("display", "");
        }

    },

    fn_teamEdit: function (code, key){

        if(code != null){
            if(key != 'undefined') {

                var data = {
                    deptSeq: code
                }
                $.ajax({
                    url: "/projectMng/getTeamCostData",
                    data: data,
                    type: "post",
                    dataType: "json",
                    success: function (rs) {
                        var rs = rs.rs;
                        console.log(rs);
                        $("#teamCostAmt").val(rs.TEAM_COST_AMT);
                        $("#strDe").val(rs.STR_DE);
                        $("#endDe").val(rs.END_DE);
                    }
                })
                $("#teamCostSetModal").data("kendoWindow").open();

                $("#teamCostSn").val(key);
            } else {
                $("#teamCostSetModal").data("kendoWindow").open();
            }
            $("#deptSeq").val(code);
            $("#deptNm").data("kendoDropDownList").value(code);
        } else {
            $("#teamCostSetModal").data("kendoWindow").open();
            $("#deptNm").data("kendoDropDownList").enable(true);

            $("#saveBtn").css("display", "none");
            $("#addBtn").css("display", "");
        }

    },

    fn_save : function (val){

        if(val == "team"){
            var parameters = {
                empSeq : $("#empSeq").val(),
                strDe : $("#strDe").val(),
                endDe : $("#endDe").val(),
                deptCd : $("#deptNm").val(),
                teamCostAmt : labor.uncomma($("#teamCostAmt").val()),
            }

            if($("#teamCostSn").val() != ""){
                parameters.teamCostSn = $("#teamCostSn").val()
            }

            if(parameters.endDe != ""){
                if(parameters.strDe > parameters.endDe){
                    alert("적용기간이 잘못 입력되었습니다.");
                    return;
                }
            }

            if(parameters.teamCostAmt == ""){
                alert("경비를 입력해주세요.");
                return;
            }

            $.ajax({
                url : "/projectMng/setTeamInfo",
                data : parameters,
                type : "post",
                dataType : "json",
                success : function(rs){
                    if(rs.code == 200){
                        alert("저장되었습니다.");
                        labor.gridReload();
                        $('#teamCostSetModal').data('kendoWindow').close()
                    }
                }
            });
        } else {
            var parameters = {
                empSeq : $("#empSeq").val(),
                strDe : $("#strDe").val(),
                endDe : $("#endDe").val(),
                positionCd : $("#positionCd").val(),
                laborAmt : labor.uncomma($("#laborAmt").val()),
            }

            if($("#laborHistSn").val() != ""){
                parameters.laborHistSn = $("#laborHistSn").val()
            }

            if(parameters.endDe != ""){
                if(parameters.strDe > parameters.endDe){
                    alert("적용기간이 잘못 입력되었습니다.");
                    return;
                }
            }

            if(parameters.laborAmt == ""){
                alert("노임 단가를 입력해주세요.");
                return;
            }

            $.ajax({
                url : "/projectMng/setLaborInfo",
                data : parameters,
                type : "post",
                dataType : "json",
                success : function(rs){
                    if(rs.code == 200){
                        alert("저장되었습니다.");
                        labor.gridReload();
                        $('#laborSetModal').data('kendoWindow').close()
                    }
                }
            });
        }


    },


    inputNumberFormat : function (obj){
        obj.value = labor.comma(labor.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_positionChange : function(){
        var data = {
            positionCd : $("#positionNm").val()
        }

        var result = customKendo.fn_customAjax("/projectMng/getLaborHistData", data);

        var rs = result.rs;

        if(rs.END_DE != null && rs.END_DE != ""){
            $("#strDe").val(rs.END_DE);
            $("#strDe").data("kendoDatePicker").enable(false);

            $("#laborSn").val(rs.LABOR_SN);
        }

        $("#strDe").change(function(){
            console.log(this.value);
            if(this.value < rs.STR_DE){
                alert("이미 등록된 날짜입니다.");

                $("#strDe").val(rs.STR_DE);
            }
        });

        $("#endDe").change(function (){
            if($("#strDe").val() > $("#endDe").val()){
                alert("적용기간이 잘못 입력되었습니다.");
                $("#endDe").val("");
            }
        });

    },

    fn_add: function(val){

        if(val == "team"){
            if($("#deptNm").val() == ""){
                alert("팀을 선택해주세요.");

                return;
            }

            var parameters = {
                empSeq : $("#empSeq").val(),
                strDe : $("#strDe").val(),
                endDe : $("#endDe").val(),
                deptCd : $("#deptNm").val(),
                teamCostAmt : labor.uncomma($("#teamCostAmt").val()),
                teamCostSn : $("#teamCostSn").val()
            }

            if(parameters.endDe != ""){
                if(parameters.strDe > parameters.endDe){
                    alert("적용기간이 잘못 입력되었습니다.");
                    return;
                }
            }

            if(parameters.teamCostAmt == ""){
                alert("노임 단가를 입력해주세요.");
                return;
            }

            $.ajax({
                url : "/projectMng/insTeamCostHistInfo",
                data : parameters,
                type : "post",
                dataType : "json",
                success : function(rs){
                    if(rs.code == 200){
                        alert("저장되었습니다.");
                        labor.gridReload();
                        $('#teamCostSetModal').data('kendoWindow').close()
                    }
                }
            });
        } else {
            if($("#positionNm").val() == ""){
                alert("직급을 선택해주세요.");

                return;
            }

            var parameters = {
                empSeq : $("#empSeq").val(),
                strDe : $("#strDe").val(),
                endDe : $("#endDe").val(),
                positionCd : $("#positionNm").val(),
                laborAmt : labor.uncomma($("#laborAmt").val()),
                laborSn : $("#laborSn").val()
            }

            if(parameters.endDe != ""){
                if(parameters.strDe > parameters.endDe){
                    alert("적용기간이 잘못 입력되었습니다.");
                    return;
                }
            }

            if(parameters.laborAmt == ""){
                alert("노임 단가를 입력해주세요.");
                return;
            }

            $.ajax({
                url : "/projectMng/insLaborHistInfo",
                data : parameters,
                type : "post",
                dataType : "json",
                success : function(rs){
                    if(rs.code == 200){
                        alert("저장되었습니다.");
                        labor.gridReload();
                        $('#laborSetModal').data('kendoWindow').close()
                    }
                }
            });
        }

    }
}