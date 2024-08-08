var ojtInfoHist = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        this.pageSet();
        this.gridReload();
    },

    pageSet: function(){
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date(),
            max : new Date("2023-12-31")
        });
        $('#eduYear').val("2023");
    },

    gridReload: function(){
        ojtInfoHist.global.searchAjaxData = {
            eduYear: $('#eduYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val(),
            empSeq: $("#empSeq").val()
        }
        ojtInfoHist.mainGrid("/campus/getOjtInfoHistList", ojtInfoHist.global.searchAjaxData);
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
                }
            }
        });

        $("#mainGrid4").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "학습명",
                    template: function(e){
                        const id = $("#regId").val();
                        var EduName = e.OJTName;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Learning/Education/OJT/OJTView.aspx?OJTNum="+e.OJTNum+"' target='_blank' style='font-weight: bold'>" + EduName + "</a>";
                    }
                }, {
                    title: "지도자",
                    width: 180,
                    template: function(e){
                        return e.UserName;
                    }
                }, {
                    title: "학습자",
                    width: 180,
                    template: function(e){
                        let returnText = e.UserName2;
                        if(e.UserCount > 1){
                            returnText += " 외 "+e.UserCount+"명";
                        }
                        return returnText;
                    }
                }, {
                    title: "지도기간",
                    width: 180,
                    template: function(e){
                        return e.SDate+" ~ "+e.EDate
                    }
                }, {
                    field: "InTime",
                    title: "지도시간",
                    width: 180,
                }, {
                    title: "진행현황",
                    width: 120,
                    template: function(e){
                        let RequestType = "알수없음";
                        if(e.State == "-1"){
                            RequestType = "OJT취소";
                        }else if(e.State == "0"){
                            RequestType = "신청서 작성중";
                        }else if(e.State == "1"){
                            RequestType = "신청서 결재중";
                        }else if(e.State == "2"){
                            RequestType = "OJT진행중";
                        }else if(e.State == "3"){
                            RequestType = "지도완료";
                        }else if(e.State == "4"){
                            RequestType = "OJT완료";
                        }
                        return RequestType;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },
}