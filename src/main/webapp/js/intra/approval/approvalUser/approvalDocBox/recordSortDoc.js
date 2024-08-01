/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서함 > 내 문서함
 *
 * function / global variable / local variable setting
 */
var recordSortDoc = {
    global : {
        dropDownDataSource : "",
        searchAjaxData  : "",
        saveAjaxData    : "",
        now             : new Date(),

        windowPopUrl    : "",
        popName         : "",
        popStyle        : "",
        share_yn        : "",

        searchNo        : "",
        searchText      : "",
    },

    fnDefaultScript : function(){
        recordSortDoc.global.dropDownDataSource = [
            { text : "생산문서", value : "000" },
            { text : "접수문서", value : "001" }
        ];
        customKendo.fn_dropDownList("selectDocFlag", recordSortDoc.global.dropDownDataSource, "text", "value");

        recordSortDoc.global.dropDownDataSource = [
            { text : "제목", value : "T" },
            { text : "문서번호", value : "N" },
            { text : "기안/접수자", value : "DN" },
            { text : "담당자", value : "EN" },
            { text : "발송처", value : "SE" },
            { text : "수신처", value : "RE" },
            { text : "양식명", value : "FN" }
        ];

        $("#selectSearchType").kendoDropDownList({
            dataSource : recordSortDoc.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value",
        });

        $("#searchText").kendoTextBox();

        Pudd( "#exTab" ).puddTab({
            tabMenu : {
                attributes : { style:"", class:"" }// tabMenu 부모객체에 속성 설정하고자 하는 경우
            },
            tabArea : {
                attributes : { style:"", class:"pl15 pr15 scroll_on" }// tabMenu 부모객체에 속성 설정하고자 하는 경우
            },
            newTab : false
        });

        recordSortDoc.makeArchiveTree("/approvalUser/getArchiveTreeJT.do");
        recordSortDoc.makeShareTree("/approvalUser/getShareArchiveOrgTreeJT.do");

        Pudd( "#treeView" ).on( "treeitemClick", function( e ) {
            var evntVal = e.detail;
            if( ! evntVal ) return;
            if( ! evntVal.liObj ) return;
            var liObj = evntVal.liObj;
            var rowData = liObj.rowData;
            recordSortDoc.setJT(rowData);
        });

        Pudd( "#orgTreeView" ).on( "treeitemClick", function( e ) {
            var evntVal = e.detail;
            if( ! evntVal ) return;
            if( ! evntVal.liObj ) return;
            var liObj = evntVal.liObj;
            var rowData = liObj.rowData;
            recordSortDoc.callbackOrgChart(rowData);
        });

        recordSortDoc.gridReload();
        recordSortDoc.twinBoxInit( false ) //분할박스 높이세팅

        $(window).resize(function () {
            recordSortDoc.twinBoxInit( true ); //분할박스 높이세팅
            recordSortDoc.gridHeightChange( 290 );
        });

        Pudd( "#searchKeyword1" ).puddTextBox({
            attributes : { style : "width:100%;" } // control 부모 객체 속성 설정
            ,	controlAttributes : { placeholder : "기록물철 검색" } // control 자체 객체 속성 설정
            ,	value : ""
            ,	inputType : "search"
            ,	fnSearch : function(e){
                var puddText = Pudd( "#searchKeyword1" ).getPuddObject();
                var puddTree = Pudd( "#treeView" ).getPuddObject();
                recordSortDoc.keywordSearch(puddText, puddTree, "recordSortDoc.setJT"); // search 버튼 callback 선언
            }
        });

        Pudd( "#searchKeyword2" ).puddTextBox({
            attributes : { style : "width:100%;" } // control 부모 객체 속성 설정
            ,	controlAttributes : { placeholder : "기록물철 검색" } // control 자체 객체 속성 설정
            ,	value : ""
            ,	inputType : "search"
            ,	fnSearch : function(e){
                var puddText = Pudd( "#searchKeyword2" ).getPuddObject();
                var puddTree = Pudd( "#orgTreeView" ).getPuddObject();
                recordSortDoc.keywordSearch(puddText, puddTree, "recordSortDoc.callbackOrgChart"); // search 버튼 callback 선언
            }
        });

        Pudd( "#searchKeyword1" ).getPuddObject().on( "keyup", function( e ) {
            // enter keycode
            if( 13 == e.keyCode ) {
                var puddText = Pudd( "#searchKeyword1" ).getPuddObject();
                var puddTree = Pudd( "#treeView" ).getPuddObject();
                recordSortDoc.keywordSearch(puddText, puddTree, "recordSortDoc.setJT"); // search 버튼 callback 선언
            }
        });

        Pudd( "#searchKeyword2" ).getPuddObject().on( "keyup", function( e ) {
            if( 13 == e.keyCode ) {
                var puddText = Pudd( "#searchKeyword2" ).getPuddObject();
                var puddTree = Pudd( "#orgTreeView" ).getPuddObject();
                recordSortDoc.keywordSearch(puddText, puddTree, "recordSortDoc.callbackOrgChart"); // search 버튼 callback 선언
            }
        });
    },

    gridHeightChange : function( minusVal ) {
        var puddGrid = Pudd( "#grid" ).getPuddObject();
        var cHeight = document.body.clientHeight;

        var newGridHeight = cHeight - minusVal;
        if( newGridHeight > 100 ) {// 최소높이
            puddGrid.gridHeight( newGridHeight );
        }
    },

    twinBoxInit : function(set){
        var body = $("body").height();
        var location = $("#startHeader").outerHeight(true) + 15;
        var twinHeight = body - location;

        $("#treeView").height(twinHeight - 345);
        $("#orgTreeView").height(twinHeight - 345);
    },

    makeArchiveTree : function(url){
        var dataArchiveTree = new Pudd.Data.DataSource({
            pageSize : 9999,
            serverPaging : true,
            request : {
                url :  getContextPath() + url,
                type : 'post',
                dataType : "json",
                parameterMapping : function( data ) { }
            },
            result : {
                data : function(response){
                    console.log(response.data);
                    return response.data;
                },
                error : function( response ) {
                    alert( "error - Pudd.Data.DataSource.read, status code - " + response.status );
                }
            }
        });

        Pudd( "#treeView" ).puddTreeView({
            dataSource : dataArchiveTree,
            checkbox : false,
            dataNameField : "text",
            dataNameAttributeField : "textAttribute",
            dataFolderField : "isFolder",
            dataStateField : "state",
            dataIconField : "icon",
            dataChildrenField : "children"
        });
    },

    makeShareTree : function(url){
        var dataOrgTree = new Pudd.Data.DataSource({
            pageSize : 9999,
            serverPaging : true,
            request : {
                url :  getContextPath() + url,
                type : 'post',
                dataType : "json",
                parameterMapping : function( data ) {
                    data.parentSeq = 0;
                    data.compSeq = $("#compSeq").val();
                    data.compFilter = $("#compSeq").val();
                    data.type = "archive";
                }
            },
            result : {
                data : function(response){
                    console.log(response.data);
                    return response.data;
                },
                error : function( response ) {
                    alert( "error - Pudd.Data.DataSource.read, status code - " + response.status );
                }
            }
        });

        Pudd( "#orgTreeView" ).puddTreeView({
            dataSource : dataOrgTree
            ,	checkbox : false
            ,	dataNameField : "text"			// tree item name field
            ,	dataFolderField : "isFolder"	// tree folder 여부
            ,	dataStateField : "state"		// state { opened : boolean, selected : boolean, checked : boolean }
            ,	dataIconField : "icon"			// tree item icon - 설정 없으면 folder 아이콘
            ,	dataChildrenField : "children"	// tree sub folder & item
        });

        recordSortDoc.twinBoxInit( false ); //분할박스 높이세팅
    },

    setJT : function(data){
        var seq = data.seq;
        var aiName = data.text;
        var okFlag = data.okFlag
        var wiName = data.wiName
        var aiStopYear = data.aiStopYear
        var pathName = data.pathName
        recordSortDoc.global.share_yn = data.share_yn;

        var content_type = data.contenttype;
        if(content_type == 'A' || content_type == 'D' || content_type == 'Y'){
            $("#checkYear").val(aiStopYear);
            $("#checkType").val(content_type);
            $("#checkId").val(seq);
            $("#c_aiokflag").val(okFlag);
            $("#selectName").text(pathName);
            recordSortDoc.gridReload();
        }
    },

    callbackOrgChart : function(item) {
        var seq = item.seq;
        var name = item.name;
        var dept_name = item.dept_name;
        var text = item.text;

        var content_type = item.gbn_org;
        if(content_type == 'a'){
            recordSortDoc.global.share_yn = item.share_yn;
            $("#selectName").text(dept_name + ">" + text);
            $("#checkId").val(seq);
            recordSortDoc.gridReload();
        }
    },

    keywordSearch : function(puddText, puddTree, fnCallback){
        var val = puddText.val()
        if (ncCom_Empty(val)) {
            alert("검색어를 입력하세요.");
            return;
        }

        if(recordSortDoc.global.searchText == val ) {
            recordSortDoc.global.searchNo++;
        } else {
            recordSortDoc.global.searchText = val;
            recordSortDoc.global.searchNo = 1;
        }

        var liObj = puddTree.searchTreeText(recordSortDoc.global.searchText, recordSortDoc.global.searchNo );
        if( liObj ) {
            var rowData = liObj.rowData;
            if(fnCallback){
                eval(fnCallback)(rowData);
            }
        } else {
            if(recordSortDoc.global.searchNo > 1 ) {
                recordSortDoc.global.searchNo = 0;

            } else {
                recordSortDoc.global.searchNo = 0;
                alert("검색결과가 없습니다.");
                return;
            }
        }
    },

    gridReload : function() {
        recordSortDoc.global.searchAjaxData = {
            groupSeq : $("#groupSeq").val(),
            deptSeq : $("#deptSeq").val(),
            searchType : $("#checkType").val(),
            searchText : $("#searchText").val(),
            selectSearchType : $("#selectSearchType").val(),
            selectDocFlag : $("#selectDocFlag").val(),
            searchAiKeyCode : $("#checkId").val(),
        }

        if($("#checkType").val() == "D" || $("#checkType").val() == "Y"){
            recordSortDoc.global.searchAjaxData.searchWiKey = $("#checkId").val() ;
            recordSortDoc.global.searchAjaxData.searchStopYear = $("#checkYear").val() ;
        }

        recordSortDoc.mainGrid("/approvalUser/getRecodeSortDocList.do", recordSortDoc.global.searchAjaxData);
    },

    mainGrid :  function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 525,
            width: 1000,
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "DOC_GBN_NAME",
                    title : "문서구분",
                    width : 80
                },{
                    field : "FORM_NAME",
                    title : "양식명",
                    width : 180
                },{
                    field : "DOC_NO",
                    title : "문서번호",
                    width : 150,
                    template : function(e){
                        if(e.DOC_NO == null || e.DOC_NO == ""){
                            return "-"
                        }else{
                            return e.DOC_NO
                        }
                    },
                }, {
                    title : "제목",
                    template : function (e){
                        var securityIcon = '';
                        var textColor= 'style="color: rgb(0, 51, 255);"';

                        if(e.DEL_FLAG == "Y"){
                            textColor = 'style="color: #f33e51;"';
                        }

                        if(e.SECURITY_TYPE == "009"){
                            securityIcon = '<img src="/images/ico/ico_security.png" style="vertical-align: text-top;" title="보안문서">';
                        }

                        if(e.DOC_TITLE == null || e.DOC_TITLE == ""){
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\',\'' + e.DEL_FLAG + '\');" ' + textColor + '>제목 없음</a>';
                        }else{
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\',\'' + e.DEL_FLAG + '\');" ' + textColor + '>'+e.DOC_TITLE+'</a>';
                        }
                    },
                    attributes : {
                        style : "text-align : left;"
                    },
                    width : 500
                }, {
                    field : "REG_DATE",
                    title : "등록일자",
                    width : 90
                }, {
                    field : "DRAFT_EMP_NAME",
                    title : "기안/접수자",
                    width : 100,
                },{
                    field : "DRAFT_EMP_NAME",
                    title : "담당자",
                    width : 80,
                }, {
                    field : "RISENDNAME",
                    title : "발송처",
                    width : 200,
                }, {
                    field : "DOC_RECEIVE",
                    title : "수신처",
                    width : 200,
                    template : function(e){
                        if(e.DOC_RECEIVE != null){
                            return e.DOC_RECEIVE.replaceAll("_ROW_", ",");
                        }else{
                            return "";
                        }

                    }
                }, {
                    title : "결재선",
                    width : 70,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }/*, {
                    title : "",
                    width : 100,
                    template : function(e){
                        if((e.APPROVE_STAT_CODE == "30" || e.APPROVE_STAT_CODE == "40") && e.DEL_FLAG == "N"){
                            return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick=\"tempOrReDraftingPop('+ e.DOC_ID + ',\'' + e.DOC_MENU_CD + '\',\'' + e.APPRO_KEY + '\',\'' + e.LINKAGE_TYPE + '\',\'reDrafting\')\">' +
                                '<span class="k-icon k-i-track-changes-enable k-button-icon"></span>' +
                                '<span class="k-button-text">재기안</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }*/]
        }).data("kendoGrid");
    },
}