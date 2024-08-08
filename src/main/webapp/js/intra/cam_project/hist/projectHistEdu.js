var histEdu = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["name"]);

        this.gridReload();
    },

    gridReload: function(){
        histEdu.global.searchAjaxData = {
            name : $("#name").val()
        }
        histEdu.mainGrid("/projectHist/getHistEduList", histEdu.global.searchAjaxData);
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histEdu.gridReload()">' +
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
                    field: "ProName",
                    title: "사업명",
                    width: 300
                }, {
                    field: "Name",
                    title: "단위사업명",
                    template: function(e){
                        const id = $("#regId").val();
                        var pjtNm = e.Name;
                        var pjtEx = pjtNm;
                        if(pjtNm.toString().length > 42){
                            pjtEx = pjtNm.toString().substring(0, 42)+ "...";
                        }
                        return "<a href='http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"http://www.camtic.or.kr/HRD/AdminTool/Project/LectureView.aspx?mLectureCode="+e.LectureCode+"' target='_blank' style='font-weight: bold'>" + pjtEx + "</a>";
                    }
                }, {
                    field: "PSDate",
                    title: "교육기간",
                    width: 160,
                    template: function(row){
                        return row.StartDate+" ~ "+row.EndDate
                    }
                }, {
                    field: "EduTotal",
                    title: "정원",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.EduTotal+"명</div>";
                    }
                }, {
                    title: "신청",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+(Number(row.mLecCount1+row.mLecCount2+row.mCanCel+row.mCompletion))+"명</div>";
                    }
                }, {
                    field: "mLecCount1",
                    title: "대기",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.mLecCount1+"명</div>";
                    }
                }, {
                    field: "mLecCount2",
                    title: "접수",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.mLecCount2+"명</div>";
                    }
                }, {
                    field: "mCanCel",
                    title: "취소",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.mCanCel+"명</div>";
                    }
                }, {
                    field: "mCompletion",
                    title: "수료",
                    width: 80,
                    template: function(row){
                        return "<div style='text-align: right'>"+row.mCompletion+"명</div>";
                    }
                }, {
                    title: "상태",
                    width: 120,
                    template: function(row){
                        let returnText = '-';
                        if(row.Status == "0"){
                            returnText = '강의개설 중';
                        }else if(row.Status == "1"){
                            returnText = '수강신청 진행중';
                        }else if(row.Status == "2"){
                            returnText = '교육/실습 중';
                        }else if(row.Status == "3"){
                            returnText = '교육/실습 완료';
                        }
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