var studyInfoHist = {
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
        studyInfoHist.global.searchAjaxData = {
            eduYear: $('#eduYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val(),
            empSeq: $("#empSeq").val()
        }
        studyInfoHist.mainGrid("/campus/getStudyInfoHistList", studyInfoHist.global.searchAjaxData);
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

        $("#mainGrid2").kendoGrid({
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
                    title: "학습조명",
                    template: function(e){
                        const id = $("#regId").val();
                        var EduName = e.StudyName;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Learning/EduCation/Study/StudyView.aspx?SNum="+e.SeqNo+"' target='_blank' style='font-weight: bold'>" + EduName + "</a>";
                    }
                }, {
                    title: "조장",
                    width: 180,
                    template: function(e){
                        return e.UserName;
                    }
                }, {
                    title: "학습기간",
                    width: 180,
                    template: function(e){
                        return e.SDate+" ~ "+e.EDate
                    }
                }, {
                    field: "EduTime",
                    title: "총시간",
                    width: 180
                }, {
                    title: "이수상태",
                    width: 120,
                    template: function(e){
                        let RequestType = "알수없음";
                        if(e.State == "-1"){
                            RequestType = "계획";
                        }else if(e.State == "0"){
                            RequestType = "신청서 작성중";
                        }else if(e.State == "1"){
                            RequestType = "신청서 제출";
                        }else if(e.State == "2"){
                            RequestType = "학습진행중";
                        }else if(e.State == "3"){
                            RequestType = "신청취소";
                        }else if(e.State == "4"){
                            RequestType = "학습완료";
                        }else if(e.State == "5"){
                            RequestType = "이수완료";
                        }
                        if(e.State == "2"){
                            RequestType += "("+e.Count+ " 회)";
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