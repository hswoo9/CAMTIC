var eduRes = {

    global : {

    },

    getDefaultScript : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + '/edu/getYearlyPerEmployeeGoalTimeList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.strDate = $("#strDate").val();
                    data.dutyCode = $("#empDuty").data("kendoDropDownList").value();
                    data.positionCode = $("#empPosition").data("kendoDropDownList").value();
                    //data.targetYn = $("#eduEvalTarget").data("kendoDropDownList").value();
                    data.deptSeq = $("#empDept").data("kendoDropDownList").value();

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                    console.log(data);
                },
                total: function (data) {
                    return data.totalCount.totalCount;
                },
                model: {
                    id : "EYTTE_ID",
                    fields : {
                        EYTTE_ID : { from : "EYTTE_ID", editable : false, type : "string"},
                        EMP_SEQ : { from : "EMP_SEQ", editable : false, type : "string"},
                        EMP_NAME : { from : "EMP_NAME", editable : false, type : "string"},
                        DEPT_SEQ : { from : "DEPT_SEQ", editable : false, type : "string"},
                        DEPT_NAME : { from : "DEPT_NAME", editable : false, type : "string"},
                        EDUCATION_YEAR : { from : "EDUCATION_YEAR", editable : false, type : "string"},
                        DUTY_CODE : { from : "DUTY_CODE", editable : false, type : "string"},
                        DUTY_NAME : { from : "DUTY_NAME", editable : false, type : "string"},
                        POSITION_CODE : { from : "POSITION_CODE", editable : false, type : "string"},
                        POSITION_NAME : { from : "POSITION_NAME", editable : false, type : "string"},
                        COMMON_TIME : { from : "COMMON_TIME", editable : true, type : "string"},
                        LEADERSHIP_TIME : { from : "LEADERSHIP_TIME", editable : true, type : "string"},
                        DUTY_TIME : { from : "DUTY_TIME", editable : true, type : "string"},
                        SOCIAL_CONTRIBUTION_TIME : { from : "SOCIAL_CONTRIBUTION_TIME", editable : true, type : "string"},
                        TOTAL_TIME : { from : "TOTAL_TIME", editable : false, type : "string"},
                        TARGET_YN : { from : "TARGET_YN", editable : false, type : "string"},
                        USE_YN : { from : "USE_YN", editable : false, type : "string"},

                    }
                }
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            //editable: true,
            selectable: "row",
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.selectUpdate(\'DEL\')">' +
                            '	<span class="k-button-text">선택삭제</span>' +
                            '</button>';
                    }
                }/*, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.selectUpdate(\'TARGET_N\')">' +
                            '	<span class="k-button-text">평가대상 제외</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.selectUpdate(\'TARGET_Y\')">' +
                            '	<span class="k-button-text">평가대상 추가</span>' +
                            '</button>';
                    }
                }*/, {
                    name : 'excel',
                    text : '엑셀 다운로드'
                }/*, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.saveGoalTimeEmpAll()">' +
                            '	<span class="k-button-text">일괄생성</span>' +
                            '</button>';
                    }
                }*/, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.yearlyPerEmployeeGoalTimeWrite()">' +
                            '	<span class="k-button-text">신규작성</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "연간 직원별 목표시간.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width: '5%',
                    template : "<input type='checkbox' id='eytteId#=EYTTE_ID#' name='eytteId' value='#=EYTTE_ID#' class='k-checkbox checkbox'/>"
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: "10%"
                }, {
                    field: "DEPT_NAME",
                    title: "소속부서",
                    width: "10%"
                }, {
                    field: "POSITION_NAME",
                    title: "직급",
                    width: "10%"
                }, {
                    field: "DUTY_NAME",
                    title: "직위",
                    width: "10%"
                }, {
                    field: "COMMON_TIME",
                    title: "공통",
                    width: "15%",

                }, {
                    field: "LEADERSHIP_TIME",
                    title: "리더십",
                    width: '10%',
                }, {
                    field: "DUTY_TIME",
                    title: "직무",
                    width: '10%',
                }, {
                    field: "SOCIAL_CONTRIBUTION_TIME",
                    title: "사회공헌",
                    width: '10%',
                }, {
                    field: "TOTAL_TIME",
                    title: "합계",
                    width: '10%',
                }
            ]
        }).data("kendoGrid");

        $("#searchBtn").click(function(){
            eduRes.gridReload();
        });

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=eytteId]").prop("checked", true);
            else $("input[name=eytteId]").prop("checked", false);
        });

        $(document).on("change", ".k-input-inner", function(){
           console.log(this.value);
        });

        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);

            var page = $("#mainGrid").data("kendoGrid").dataSource._page;
            var skip = $("#mainGrid").data("kendoGrid").dataSource._skip;
            var pageSize = $("#mainGrid").data("kendoGrid").dataSource._pageSize;
            var eytteId = selectedItem.EYTTE_ID;
            console.log(selectedItem);
            open_in_frame("/edu/yearlyPerEmployeeGoalTimeWrite.do?skip=" + skip + "&page=" + page + "&pageSize=" + pageSize + "&id=" + eytteId + "&prevMenuNm=/edu/yearlyPerEmployeeGoalTime.do");
        });
    },

    yearlyPerEmployeeGoalTimeWrite : function(){
        var menuNm = $("#menuNm").val();
        open_in_frame("/edu/yearlyPerEmployeeGoalTimeWrite.do?prevMenuNm=" + menuNm);
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    selectUpdate : function(code) {
        var result = false;
        var url = getContextPath();
        var targetYn = "Y";
        var useYn = "Y";
        switch (code){
            case "DEL" :
                result = confirm("삭제하시겠습니까?");
                url = url + "/edu/setGoalTimeEmpUseYn";
                useYn = "N";
                break
            case "TARGET_N" :
                result = confirm("평가대상 제외하시겠습니까?");
                url = url + "/edu/setGoalTimeEmpUpdate";
                targetYn = "N";
                break
            case "TARGET_Y" :
                result = confirm("평가대상 추가하시겠습니까?");
                url = url + "/edu/setGoalTimeEmpUpdate";
                targetYn = "Y";
                break
        }
        if(result){

            var eytteIdArr = [];
            var checkGroup = $("input[name=eytteId]:checked");

            var data = {
                targetYn : targetYn,
                useYn : useYn,
            };

            if(checkGroup.length > 0){

                $.each(checkGroup, function(i, v){
                    console.log(v.value);
                    eytteIdArr.push(v.value);
                });

                data.eytteIdArr = JSON.stringify(eytteIdArr);
            }else{
                alert("선택된 대상이 없습니다.");
                return;
            }

            console.log(data);
            $.ajax({
                url : url,
                type : "post",
                data : data,
                dataType : "json",
                success : function(rs){
                    alert(rs.message);
                    $("#checkAll").prop("checked", false);
                    eduRes.gridReload();
                }
            });
        }else{
            $("input[name=eytteId]").prop("checked", false);
            $("#checkAll").prop("checked", false);
        }
    },

    saveGoalTimeEmpAll : function(){
        var result = false;
        var deptSeq = $("#empDept").data("kendoDropDownList").value();
        var deptText = $("#empDept").data("kendoDropDownList").text();
        var mode = "";
        var data = {};
        if(deptSeq == ""){
            result = confirm("전체 부서 직원의 목표시간을 등록하시겠습니까?");
            mode = "ALL";
        }else if(deptSeq != ""){
            result = confirm(deptText + " 부서 직원의 목표시간을 등록하시겠습니까?");
            mode = "DEPT";
            data.deptSeq = deptSeq;
        }else{

        }

        if(result){

            $.ajax({
                url : getContextPath() + "/edu/saveGoalTimeEmpAll",
                type : "post",
                data : data,
                dataType : "json",
                success : function(rs){
                    alert(rs.message);
                    $("#checkAll").prop("checked", false);
                    eduRes.gridReload();
                }
            });
        }
    }
}