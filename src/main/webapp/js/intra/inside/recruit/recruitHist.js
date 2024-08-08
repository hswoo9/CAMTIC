var histRecruit = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        this.pageSet();
        this.gridReload();
    },

    pageSet: function(){
        $("#recruitYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "모집분야", value: "1" },
                { text: "공고명", value: "2" },
                { text: "공고번호", value: "3" },
                { text: "지원자", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
        $('#recruitYear').val("2023");
    },

    gridReload: function(){
        histRecruit.global.searchAjaxData = {
            recruitYear: $('#recruitYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val()
        }
        histRecruit.mainGrid("/inside/getRecruitHistList", histRecruit.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    for(var key in params){
                        data[key] = params[key];
                    }
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histRecruit.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "소속",
                    width: 50,
                    template: function(row){
                        if(row.IsType == "2"){
                            return "협의회";
                        }else{
                            return "캠틱"
                        }
                    }
                }, {
                    field: "IsNumber",
                    title: "공고번호",
                    width: 120
                }, {
                    field: "Name",
                    title: "공고명",
                    template: function(e){
                        const id = $("#regId").val();
                        var pjtNm = e.Name;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Inside/Recruit/AppIndex.aspx?InfoCode="+e.InfoCode+"' target='_blank' style='font-weight: bold'>" + pjtNm + "</a>";
                    }
                }, {
                    title: "기간",
                    width: 160,
                    template: function(row){
                        return row.SDate+" ~ "+row.EDate
                    }
                }, {
                    field: "RecruitName",
                    title: "모집분야",
                    width: 200
                }, {
                    title: "신입/경력",
                    width: 80,
                    template: function(row){
                        if(row.CareerType == "1"){
                            return "신입"
                        }else if(row.CareerType == "2"){
                            return "경력"
                        }else{
                            return "신입~경력"
                        }
                    }
                }, {
                    field: "MembersCount",
                    title: "채용인원",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.MembersCount+"명</div>";
                    }
                }, {
                    field: "mCount",
                    title: "접수인원",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.mCount+"명</div>";
                    }
                }, {
                    title: "서류심사",
                    width: 80,
                    template: function(row){
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Inside/Recruit/JudgeDocuAver.aspx?InfoCode="+row.InfoCode+"&ItemCode="+row.RSeqNo+"' target='_blank' style='font-weight: bold'>서류심사</a>";
                    }
                }, {
                    title: "면접심사",
                    width: 80,
                    template: function(row){
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Inside/Recruit/JudgeDocuAver.aspx?InfoCode="+row.InfoCode+"&ItemCode="+row.RSeqNo+"' target='_blank' style='font-weight: bold'>면접심사</a>";
                    }
                }, {
                    title: "상태",
                    width: 80,
                    template: function(){
                        let returnText = '채용완료';
                        return returnText;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },
}