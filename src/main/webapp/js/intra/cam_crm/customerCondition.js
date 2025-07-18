var customerCondition = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function (){

        customerCondition.fn_setCustomerCondition();
    },

    fn_setCustomerCondition : function(){
        var result = customKendo.fn_customAjax("/crm/getCustomerCondition.do", customerCondition.global.searchAjaxData);
        if(result.flag) {
            var ls = result.list;
            var jbCnt = 0;
            var ccCnt = 0;
            var gsCnt = 0;
            var etcCnt = 0;

            var a =0,b =0,c =0,d =0,e =0,f =0,g =0,h = 0,
                j = 0,l =0,k=0,l=0,m=0,n=0,o = 0;
            var localName = ["전북특별자치도", "전라남도", "서울특별시", "경기도", "강원도", "충청남/북도", "경상남/북도",
                "대전광역시", "광주광역시", "인천광역시", "대구광역시", "부산광역시", "울산광역시", "미등록"]
            var localValue = [];
            // 지역별
            for(var i = 0; i < ls.length; i++){
                if(ls[i].CRM_NATION == "전라북도" || ls[i].CRM_NATION == "전북특별자치도") {
                    jbCnt += parseInt(ls[i].CNT);
                    $("#jbCnt").text(jbCnt);
                    a += parseInt(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "전라남도") {
                    $("#jnCnt").text(ls[i].CNT);
                    b += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "서울특별시") {
                    $("#soCnt").text(ls[i].CNT);
                    c += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "경기도") {
                    $("#ggCnt").text(ls[i].CNT);
                    d += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "강원도") {
                    $("#gwCnt").text(ls[i].CNT);
                    e += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "충청북도" || ls[i].CRM_NATION == "충청남도") {
                    ccCnt += parseInt(ls[i].CNT);
                    $("#ccCnt").text(ccCnt);
                    f += parseInt(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "경상북도" || ls[i].CRM_NATION == "경상남도") {
                    gsCnt += parseInt(ls[i].CNT);
                    $("#gsCnt").text(gsCnt);
                    g += parseInt(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "대전광역시") {
                    $("#djCnt").text(ls[i].CNT);
                    h += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "광주광역시") {
                    $("#gjCnt").text(ls[i].CNT);
                    j += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "인천광역시") {
                    $("#icCnt").text(ls[i].CNT);
                    k += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "대구광역시") {
                    $("#dgCnt").text(ls[i].CNT);
                    l += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "부산광역시") {
                    $("#psCnt").text(ls[i].CNT);
                    m += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "울산광역시") {
                    $("#usCnt").text(ls[i].CNT);
                    n += ls[i].CNT;
                }
                if(ls[i].CRM_NATION == "" || ls[i].CRM_NATION == null) {
                    etcCnt += parseInt(ls[i].CNT);
                    $("#etcCnt").text(etcCnt);
                    o += parseInt(ls[i].CNT);
                }
            }
            console.log(a, b, c, d, e, f, g, h, j, k, l, m, n, o);

            $("#localCustomChart").kendoChart({
                title: {
                    text: "지역별 고객현황"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [{
                    name: "Total Visits",
                    data: [a, b, c, d, e, f, g, h, j, k, l, m, n, o]
                }],
                valueAxis: {
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: localName,
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }
    }


}