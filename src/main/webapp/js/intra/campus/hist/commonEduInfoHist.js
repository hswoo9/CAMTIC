var commonEduInfoHist = {
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
        commonEduInfoHist.global.searchAjaxData = {
            eduYear: $('#eduYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val(),
            empSeq: $("#empSeq").val()
        }
        commonEduInfoHist.mainGrid("/campus/getCommonEduInfoHistList", commonEduInfoHist.global.searchAjaxData);
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

        $("#mainGrid6").kendoGrid({
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
                        var EduName = e.EduName;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Learning/Education/EduPublicMgrView.aspx?EduNum="+e.SeqNo+"' target='_blank' style='font-weight: bold'>" + EduName + "</a>";
                    }
                }, {
                    title: "학습기간",
                    width: 180,
                    template: function(e){
                        return e.SDate+" ~ "+e.EDate
                    }
                }, {
                    field: "EduTime",
                    title: "학습시간",
                    width: 180,
                }, {
                    field: "EduLocation",
                    title: "교육장소",
                    width: 240
                }, {
                    title: "진행현황",
                    width: 120,
                    template: function(e){
                        let RequestType = "알수없음";
                        if(e.State == "1"){
                            RequestType = "계획";
                        }else{
                            if(e.pState == "1"){
                                RequestType = "이수";
                            }else{
                                RequestType = "미이수";
                            }
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