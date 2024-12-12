var histEduInfo = {
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
        histEduInfo.global.searchAjaxData = {
            eduYear: $('#eduYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val()
        }
        histEduInfo.mainGrid("/campus/getEduInfoHistList", histEduInfo.global.searchAjaxData);
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histEduInfo.gridReload()">' +
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
                    title: "부서",
                    width: 180,
                    template: function(e){
                        if(e.UserTeam == null || e.UserTeam == ""){
                            return e.UserComp;
                        } else {
                            return e.UserComp + "<br>" + e.UserTeam;
                        }
                    }
                }, {
                    field: "UserName",
                    title: "성명",
                    width: 80,
                }, {
                    title: "학습명",
                    template: function(e){
                        let RequestType = "OffLine";
                        if(e.Method == "1"){
                            RequestType = "OffLine";
                        }else if(e.Method == "2"){
                            RequestType = "OnLine";
                        }else if(e.Method == "3"){
                            RequestType = "Forum";
                        }else if(e.Method == "4"){
                            RequestType = "Expo";
                        }else if(e.Method == "5"){
                            RequestType = "Books";
                        }else if(e.Method == "6"){
                            RequestType = "Treatise";
                        }else if(e.Method == "7"){
                            RequestType = "Visit";
                        }else if(e.Method == "8"){
                            RequestType = "Competence";
                        }else if(e.Method == "9"){
                            RequestType = "OJT";
                        }else if(e.Method == "10"){
                            RequestType = "Study";
                        }else if(e.Method == "11"){
                            RequestType = "Debate";
                        }else if(e.Method == "12"){
                            RequestType = "WriteTreatise";
                        }else if(e.Method == "13"){
                            RequestType = "WriteWork";
                        }
                        const id = $("#regId").val();
                        var EduName = e.EduName;
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Learning/Education/"+RequestType+"/ViewForm.aspx?EduNum="+e.SeqNo+"' target='_blank' style='font-weight: bold'>" + EduName + "</a>";
                    }
                }, {
                    title: "학습기간",
                    width: 180,
                    template: function(e){
                        return e.SDate+" ~ "+e.EDate
                    }
                }, {
                    field: "CareLocation",
                    title: "교육장소",
                    width: 300
                }, {
                    title: "목표레벨",
                    width: 100,
                    template: function(e){
                        if(e.LEVEL != null && e.LEVEL != ""){
                            return "Level. "+e.LEVEL;
                        }else{
                            return "-";
                        }
                    }
                }, {
                    title: "학습방법",
                    width: 140,
                    template: function(e){
                        let RequestType = "교육기관 참가교육";
                        if(e.Method == "1"){
                            RequestType = "교육기관 참가교육";
                        }else if(e.Method == "2"){
                            RequestType = "온라인 학습";
                        }else if(e.Method == "3"){
                            RequestType = "세미나/포럼/학술대회";
                        }else if(e.Method == "4"){
                            RequestType = "박람회/기술대전 참관";
                        }else if(e.Method == "5"){
                            RequestType = "도서학습";
                        }else if(e.Method == "6"){
                            RequestType = "논문/학술지";
                        }else if(e.Method == "7"){
                            RequestType = "국내외 현장견학";
                        }else if(e.Method == "8"){
                            RequestType = "자격증 취득";
                        }else if(e.Method == "9"){
                            RequestType = "OJT";
                        }else if(e.Method == "10"){
                            RequestType = "학습조";
                        }else if(e.Method == "11"){
                            RequestType = "금요토론 발표";
                        }else if(e.Method == "12"){
                            RequestType = "국내/외 논문 저술";
                        }else if(e.Method == "13"){
                            RequestType = "직무관련 저술";
                        }
                        return RequestType;
                    }
                }, {
                    title: "이수상태",
                    width: 120,
                    template: function(e){
                        let RequestType = "알수없음";
                        if(e.State == "-1"){
                            RequestType = "계획";
                        }else if(e.State == "0"){
                            RequestType = "온라인 학습";
                        }else if(e.State == "1"){
                            RequestType = "신청완료";
                        }else if(e.State == "2"){
                            RequestType = "수료";
                        }else if(e.State == "3"){
                            RequestType = "미수료";
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