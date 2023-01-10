var eduRes = {

    global : {

    },

    getDefaultScript : function(){

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=eyttdId]").prop("checked", true);
            else $("input[name=eyttdId]").prop("checked", false);
        });

        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + '/edu/getYearlyEduGoalTimeAllList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.startDate = $("#strDate").val();
                    data.endDate = $("#endDate").val();
                    data.dutyCode = $("#empDuty").data("kendoDropDownList").value();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.totalCount.totalCount;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.selectChkDel()">' +
                            '	<span class="k-button-text">선택삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text : '엑셀 다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.yearlyEduGoalTimeAllWrite()">' +
                            '	<span class="k-button-text">신규작성</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "연간 교육목표시간.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width: '5%',
                    template : "<input type='checkbox' id='eyttdId#=EYTTD_ID#' name='eyttdId' value='#=EYTTD_ID#' class='k-checkbox checkbox'/>"
                }, {
                    field: "EDUCATION_YEAR",
                    title: "교육연도",
                    width: "10%"
                }, {
                    field: "DUTY_NAME",
                    title: "직위",
                    width: "10%"
                }, {
                    field: "COMMON_TIME",
                    title: "공통",
                    width: "10%"
                }, {
                    field: "LEADERSHIP_TIME",
                    title: "리더십",
                    width: "10%"
                }, {
                    field: "DUTY_TIME",
                    title: "직무",
                    width: "10%",
                }, {
                    field: "SOCIAL_CONTRIBUTION_TIME",
                    title: "사회공헌",
                    width: "15%",

                }, {
                    field: "TOTAL_TIME",
                    title: "합계",
                    width: '10%',
                }
            ]
        }).data("kendoGrid");

        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);

            var page = $("#mainGrid").data("kendoGrid").dataSource._page;
            var skip = $("#mainGrid").data("kendoGrid").dataSource._skip;
            var pageSize = $("#mainGrid").data("kendoGrid").dataSource._pageSize;
            var eyttdId = selectedItem.EYTTD_ID;
            console.log(selectedItem);
            open_in_frame("/edu/yearlyEduGoalTimeAllWrite.do?skip=" + skip + "&page=" + page + "&pageSize=" + pageSize + "&id=" + eyttdId + "&prevMenuNm=/edu/yearlyEduGoalTimeAll.do");
        });

    },

    yearlyEduGoalTimeAllWrite : function(){
        var menuNm = $("#menuNm").val();
        open_in_frame("/edu/yearlyEduGoalTimeAllWrite.do?prevMenuNm=" + menuNm);
    },

    selectChkDel : function() {
        if(confirm("삭제하시겠습니까?")){
            var eyttdIdArr = [];
            var checkGroup = $("input[name=eyttdId]:checked");
            $.each(checkGroup, function(i, v){
                console.log(v.value);
                eyttdIdArr.push(v.value);
            });
            console.log(eyttdIdArr);

            var data = {
                eyttdIdArr : JSON.stringify(eyttdIdArr)
            };
            console.log(data);
            $.ajax({
                url : getContextPath() + "/edu/setGoalTimeAllUseYn",
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
            $("input[name=eyttdId]").prop("checked", false);
            $("#checkAll").prop("checked", false);
        }
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },
}