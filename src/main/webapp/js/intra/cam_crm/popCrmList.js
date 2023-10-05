var popCrmList = {


    global : {

    },


    fn_deafultScript: function (){

        popCrmList.popMainGrid();

    },


    popGridReload: function (){
        $("#popMainGrid").data("kendoGrid").dataSource.read();
    },

    popMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/crm/getPopCrmList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.crmName = $("#crmName").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<div><span class="k-button-text">업체검색 <span>' +
                            '<input type="text" id="crmName" style="width: 180px;" class="k-input" onkeypress="if(window.event.keyCode==13){popCrmList.popGridReload();}"></div>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popCrmList.popGridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "업태",
                    field: "CRM_OCC",
                    width: 100,
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 80
                }, {
                    title: "사업자번호",
                    field: "CRM_NO",
                    width: 100
                }, {
                    title: "주종목",
                    field: "CRM_EVENT",
                    width: 180
                }, {
                    title: "주요생산품",
                    field: "CRM_PROD",
                    width: 180
                }, {
                    title: "대표자",
                    field: "CRM_CEO",
                    width: 80
                }, {
                    title: "",
                    template: function(row){
                        var data = JSON.stringify(row);
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popCrmList.fn_selCrm('+row.CRM_SN+')">선택</button>';
                    },
                    width: 60
                }
            ]
        }).data("kendoGrid");
    },

    fn_selCrm: function (e){
        var data= {
            crmSn : e
        }
        var rs = customKendo.fn_customAjax("/crm/getCrmData", data);

        var rs = rs.rs;

        if($("#status").val() == undefined || $("#status").val() == "undefined" || $("#status").val() == "") {
            opener.parent.$("#crmSn").val(rs.CRM_SN);
            opener.parent.$("#visitCrm").val(rs.CRM_NM);
            opener.parent.$("#crmLoc").val(rs.CRM_LOC);
            opener.parent.$("#crmNm").val(rs.CRM_NM);
            opener.parent.$("#crmNo").val(rs.CRM_NO);
            opener.parent.$("#crmEstNo").val(rs.CRM_EST_NO);
            opener.parent.$("#crmProd").val(rs.CRM_PROD);
            opener.parent.$("#crmCeo").val(rs.CRM_CEO);
            opener.parent.$("#crmPost").val(rs.POST);
            opener.parent.$("#crmAddr").val(rs.ADDR);
            if(rs.POST != null && rs.POST != ""){
                opener.parent.$("#addr").val("[" + rs.POST + "] " + rs.ADDR);
            } else {
                opener.parent.$("#addr").val("");
            }

            opener.parent.$("#crmCallNum").val(rs.TEL_NUM);
            opener.parent.$("#telNum").val(rs.TEL_NUM);
            opener.parent.$("#fax").val(rs.FAX);

            opener.parent.$("#purcCrmSn").val(rs.CRM_SN);
            opener.parent.$("#purcCrmNm").val(rs.CRM_NM);

            // opener.parent.$("#crmReqMem").val(rs.CRM_CEO);
            // opener.parent.$("#crmPhNum").val(rs.PH_NUM);
            opener.parent.$("#clientPrtpcoName").val(rs.CRM_NM);
            if(rs.ADDR != null && rs.ADDR != ""){
                opener.parent.$("#visitLoc").val(rs.ADDR.split(" ")[0]+" "+rs.ADDR.split(" ")[1]);
            }

            opener.parent.$("#teamCrmSn").val(rs.CRM_SN);
            opener.parent.$("#teamCrmNm").val(rs.CRM_NM);

            opener.parent.$("#rndCrmNm").val(rs.CRM_NM);
            opener.parent.$("#rndCrmSn").val(rs.CRM_SN);

            opener.parent.$("#crmSn").change();

            opener.parent.$("#purcCrmSn").change();
        } else if($("#status").val() == "con") {
            opener.parent.$("#rndConCrmNm").val(rs.CRM_NM);
            opener.parent.$("#rndConCrmSn").val(rs.CRM_SN);
        } else if ($("#status").val() == "part"){
            opener.parent.$("#crmPartNm").val(rs.CRM_NM);
            opener.parent.$("#crmPartSn").val(rs.CRM_SN);
        }




        window.close();
    }

}