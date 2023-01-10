var eduRes = {

    global : {

    },

    getDefaultScript : function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + '/edu/getEducationPlanList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.strDateDay = $("#strDateDay").val();
                    data.endDateDay = $("#endDateDay").val();
                    data.searchType = $("#searchType").data("kendoDropDownList").value();
                    data.searchText = $("#searchText").val();
                    data.edKindCode = $("#edKindCode").val();
                    data.edSecCode = $("#edSecCode").val();
                    data.edTypeCode = $("#edTypeCode").val();

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
            }
        });

        var grid = $("#mainGrid").kendoGrid({
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
                    text : '교육 계획 다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="eduRes.eduPlanWrite()">' +
                            '	<span class="k-button-text">신규작성</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "교육계획목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width: '5%',
                    template : "<input type='checkbox' id='EP_ID#=EP_ID#' name='EP_ID' value='#=EP_ID#' class='k-checkbox checkbox'/>"
                }, {
                    field: "EDUCATION_YEAR",
                    title: "교육연도",
                    width: "10%"
                }, {
                    field: "ED_KIND_NAME",
                    title: "교육종류",
                    width: "10%"
                }, {
                    field: "ED_SEC_NAME",
                    title: "교육구분",
                    width: "10%"
                }, {
                    field: "ED_TYPE_NAME",
                    title: "교육유형",
                    width: "10%"
                }, {
                    field: "ED_COURSE_NAME",
                    title: "수강과목명",
                }, {
                    title: "시작일",
                    width: "10%",
                    columns: [
                        {
                            title: "종료일",
                            width: "10%",
                            template: function(row){
                                return row.ED_START_DATE + "<br>" + row.ED_END_DATE;
                            }
                        }
                    ]
                }, {
                    field: "ED_TIME",
                    title: "수강시간",
                    width: '10%',
                }
            ]
        }).data("kendoGrid");

        $("#searchBtn").click(function(){
            eduRes.gridReload();
        });

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=EP_ID]").prop("checked", true);
            else $("input[name=EP_ID]").prop("checked", false);
        });

        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);

            var page = $("#mainGrid").data("kendoGrid").dataSource._page;
            var skip = $("#mainGrid").data("kendoGrid").dataSource._skip;
            var pageSize = $("#mainGrid").data("kendoGrid").dataSource._pageSize;
            var epId = selectedItem.EP_ID;
            console.log(selectedItem);
            open_in_frame("/edu/educationPlanWrite.do?skip=" + skip + "&page=" + page + "&pageSize=" + pageSize + "&id=" + epId);

        });

    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    eduPlanWrite : function(){
        var page = $("#mainGrid").data("kendoGrid").dataSource._page;
        var skip = $("#mainGrid").data("kendoGrid").dataSource._skip;
        var pageSize = $("#mainGrid").data("kendoGrid").dataSource._pageSize;
        open_in_frame("/edu/educationPlanWrite.do?skip=" + skip + "&page=" + page + "&pageSize=" + pageSize);
    },

    selectChkDel : function() {
        if(confirm("삭제하시겠습니까?")){
            var epIdArr = [];
            var checkGroup = $("input[name=EP_ID]:checked");
            if(checkGroup.length == 0){
                alert("선택된 교육계획이 없습니다.");
                return;
            }
            $.each(checkGroup, function(i, v){
                console.log(v.value);
                epIdArr.push(v.value);
            });
            console.log(epIdArr);

            var data = {
                epIdArr : JSON.stringify(epIdArr)
            };
            console.log(data);
            $.ajax({
                url : getContextPath() + "/edu/setEducationPlanUseYn",
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

}