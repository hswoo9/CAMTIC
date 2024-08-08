var propagInfoHist = {
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
        propagInfoHist.global.searchAjaxData = {
            eduYear: $('#eduYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val(),
            empSeq: $("#empSeq").val()
        }
        propagInfoHist.mainGrid("/campus/getPropagInfoHistList", propagInfoHist.global.searchAjaxData);
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

        $("#mainGrid3").kendoGrid({
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
                    title: "학습주제",
                    template: function(e){
                        const id = $("#regId").val();
                        var EduName = e.PropagName;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Learning/Education/Propag/PropagView.aspx?PropagNum="+e.SeqNo+"' target='_blank' style='font-weight: bold'>" + EduName + "</a>";
                    }
                }, {
                    title: "지도자",
                    width: 180,
                    template: function(e){
                        return e.UserName;
                    }
                }, {
                    title: "구성원",
                    width: 180,
                    template: function(e){
                        let returnText = e.UserName2;
                        if(e.UserCount > 1){
                            returnText += " 외 "+e.UserCount+"명";
                        }
                        return returnText;
                    }
                }, {
                    title: "학습기간",
                    width: 180,
                    template: function(e){
                        return e.SDate+" ~ "+e.EDate
                    }
                }, {
                    field: "InTime",
                    title: "학습시간",
                    width: 180,
                }, {
                    title: "이수상태",
                    width: 120,
                    template: function(e){
                        let RequestType = "알수없음";
                        if(e.State == "-1"){
                            RequestType = "학습취소";
                        }else if(e.State == "0"){
                            RequestType = "신청서 작성/검토";
                        }else if(e.State == "1"){
                            RequestType = "제출완료<br>(학습중)";
                        }else if(e.State == "2"){
                            RequestType = "학습완료<br>(결과보고서 작성/검토)\"";
                        }else if(e.State == "3"){
                            RequestType = "학습종료";
                        }else if(e.State == "4"){
                            RequestType = "이수완료";
                        }
                        return RequestType;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },
}