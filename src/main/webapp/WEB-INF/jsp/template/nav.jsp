<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="menuParam" value="${param.menu}"/>
<link rel="icon" href="/images/cam_favicon.png" />

<link rel="stylesheet" href="/css/intra/template/template.css">
<script type="text/javascript">
    function open_in_frame(url) {
        $("#approveModal").remove();
        $("#tilesBody").children().remove();
        $("#tilesBody").load(url);
    }
    $(function() {

        $('.toggleMain').click(function(e) {
            e.preventDefault();

            var $this = $(this);
            var $notThis = $('.toggleMain').not($this);
            $this.addClass('toggled');
            $notThis.removeClass('toggled');


            /*var $this = $(this);

            if ($this.hasClass('toggled')) {
                $this.removeClass('toggled');
            } else {
                $this.addClass('toggled');
            }*/

            if($this.attr("children") == "Y"){
                if ($this.next().hasClass('show')) {
                    $this.next().slideToggle();
                    $this.next().removeClass('show');
                } else {
                    $this.next().slideToggle();
                    $this.next().toggleClass('show');
                }
            }

        });

        $('.toggleMain1').click(function() {

            var $this = $(this);
            var $notThis = $('.toggleMain1').not($this);
            $this.addClass('toggled');
            $notThis.removeClass('toggled');

            /*if ($this.hasClass('toggled')) {
                $this.removeClass('toggled');
            } else {
                $this.addClass('toggled');
            }*/

            if ($this.next().hasClass('show')) {
                $this.next().slideToggle();
                $this.next().removeClass('show');
            } else {
                $this.next().slideToggle();
                $this.next().toggleClass('show');
            }

        });

        var menuParam = "${menuParam}"; // a_a
        if(menuParam != null && menuParam == "" && menuParam == undefined){
            var menuP = String(menuParam).split("_"); // [ 'a', 'a' ]
            $("." + menuP[0]).addClass("show"); // 'a'    $(".a").addClass("show");
            $("." + menuParam).addClass("show");// $(".a_a").addClass("show");

            //active
            var url = window.location.pathname,
                urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");

            $("." + menuParam + " li a").each(function () {
                if (urlRegExp.test(this.href.split("?")[0].replace(/\/$/, ''))) {
                    $(this).addClass('leftChange');
                }
            });
        }
        /*$("." + menuParam + " li a").attr("href").indexOf(menuParam);
        $("." + menuParam + " li a").each(function(i,e) {
            if ($(e).attr("href").indexOf(menuParam) > -1) {
                $(e).addClass("menuHover");
            }
        });*/
    });

</script>

<section>
    <div class="leftpanel">
        <div class="leftpanelinner">
            <div class="tab-content">
                <div class="input-group">
                    <input type="text" id="menuSearchToobar" class="form-control" placeholder="메뉴를 검색하세요" onkeydown="if(window.event.keyCode==13){fn_searchMenu()}">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" onclick="fn_searchMenu();"><i class="fa fa-search" ></i></button>
                    </span>
                </div>
                <!-- ################# MAIN MENU ################### -->
                <div class="" id="mainmenu">
<%--                    <h5 class="sidebar-title">업무</h5>--%>
                    <ul class="accordion nav nav-pills nav-stacked nav-quirk" id="mainMenuUl">

                    </ul>
                </div><!-- tab-pane -->

                <!-- ######################## EMAIL MENU ##################### -->

            </div><!-- tab-content -->
        </div>
    </div>
    <script>
        var menuList = JSON.parse('${menuList}');

        getNationalityText(menuList);

        function getNationalityText (params) {
            if (!Array.isArray(params)){
                return params // array가 아닐 경우 그대로 반환
            }else {
                return params.map(x => {
                    var menu = "";

                    if(x.MENU_DEPTH == "0"){
                        menu = "<li>" +
                            "<a class='toggleMain' href='#' children='" + x.MENU_CHILDREN_YN + "'>" + x.MENU_NAME + "</a>";
                        if(x.MENU_CHILDREN_YN == "Y"){
                            menu += "<ul menu ='"+ x.MENU_ID +"'  class='innerMain children'>";
                            menu += "</ul>";
                        }
                        menu += "</li>";

                        $("#mainMenuUl").append(menu);
                    }else if(x.MENU_DEPTH == "1"){
                        menu += "<h5 class='sidebar-title'>" + x.MENU_NAME + "</h5>";

                        if(x.MENU_CHILDREN_YN == "Y"){
                            menu += "<li menu ='"+ x.MENU_ID +"'>";
                            menu += "</li>";
                        }

                        $("ul[menu='" + x.UPPER_MENU_ID + "']").append(menu);
                    }else if(x.MENU_DEPTH == "2"){
                        if(x.MENU_CHILDREN_YN == "Y"){
                            menu += "<a href='#' class='toggleMain' children='" + x.MENU_CHILDREN_YN + "'>" + x.MENU_NAME + "</a>";
                            menu += "<ul class='innerMain children' menu ='"+ x.MENU_ID +"'>";
                            menu += "</ul>";
                        }else{
                            /** TODO. 임시 하드코딩. 추후 수정 예정 */
                            const id = $("#regId").val();
                            let menuPath2 = "http://pre.camtic.or.kr/CAMsPot/Manager";
                            if(x.MENU_PATH == menuPath2){
                                menu += "       <a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+ menuPath2 +"' target='_blank' menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain2'>" + x.MENU_NAME + "</a>";
                            }else{
                                menu += "<a href='#' onclick=\"open_in_frame('" + x.MENU_PATH + "')\" menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain' children='" + x.MENU_CHILDREN_YN + "'>" + x.MENU_NAME + "</a>";
                            }
                        }

                        $("li[menu='" + x.UPPER_MENU_ID + "']").append(menu);
                    }else if(x.MENU_DEPTH == "3"){
                        menu += "   <li>";

                        if(x.MENU_CHILDREN_YN == "Y") {
                            menu += "<a href='#' class='toggleMain1' children='" + x.MENU_CHILDREN_YN + "'>" + x.MENU_NAME + "</a>";
                            menu += "<ul class='innerMain children' menu ='" + x.MENU_ID + "'>";
                            menu += "</ul>";
                        }else{
                            /** TODO. 임시 하드코딩. 추후 수정 예정 */
                            const id = $("#regId").val();
                            let menuPath3 = "http://job.camtic.or.kr/admin/ygroup_list.php?s_year2=2023";
                            let menuPath3_2 = "http://pre.camtic.or.kr/CAMsPot/Learning/Education/EduMgrStatic.aspx";
                            if(x.MENU_PATH == menuPath3){
                                menu += "       <a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+ menuPath3 +"' target='_blank' menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain2'>" + x.MENU_NAME + "</a>";
                            }else if(x.MENU_PATH == menuPath3_2){
                                menu += "       <a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+ menuPath3_2 +"' target='_blank' menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain2'>" + x.MENU_NAME + "</a>";
                            }else{
                                menu += "<a href='#' onclick=\"open_in_frame('" + x.MENU_PATH + "')\" menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain' children='" + x.MENU_CHILDREN_YN + "'>" + x.MENU_NAME + "</a>";
                            }
                        }

                        menu += "   </li>";
                        $("ul[menu='" + x.UPPER_MENU_ID + "']").append(menu);
                    }else{
                        menu += "   <li>";

                        menu += "       <a href='#' onclick=\"open_in_frame('" + x.MENU_PATH + "')\" menuNamePath='업무 > " + x.MENU_NAME_PATH + "' menuNameKr='" + x.MENU_NAME + "' class='toggleMain2'>" + x.MENU_NAME + "</a>";


                        menu += "   </li>";

                        $("ul[menu='" + x.UPPER_MENU_ID + "']").append(menu);
                    }

                    if (Object.keys(x).findIndex(y => y === 'childrenMenu') > -1) {
                        getNationalityText(x.childrenMenu) // children 속성이 있을 경우 재귀 호출
                    }
                    return x
                })
            }
        }

        function fn_searchMenu(){
            var searchData = {
                regEmpSeq : $("#empSeq").val(),
                menuName : $("#menuSearchToobar").val(),
            }
            var ds = customKendo.fn_customAjax("/main/getSearchMenu", searchData);
            if(ds.flag){
                var menuKendoWindowTemplate = $('<div class="pop_wrap" id="biz_type_popupEnroll" style="min-width:550px; display:none;">' +
                    '<div class="pop_con">' +
                    '<div class="com_ta2" id="menuSearchDiv">' +
                    '<input type="hidden" id="changeChk" value="N">' +
                    '<input type="text" id="menuSearchModal" class="form-control" style="width: 480px; height:auto; margin-bottom:15px; " placeholder="메뉴를 검색하세요" onkeypress="getSelectMenu2();">' +
                    '<div id="menuListDiv"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                menuKendoWindowTemplate.kendoWindow({
                    width: "550px;",
                    height: "350px;",
                    title: "메뉴 검색",
                    visible: false,
                    modal : true,
                    close: function () {
                        if($("#changeChk").val() == "Y"){
                            location.reload();
                        }
                        menuKendoWindowTemplate.remove();
                    }
                }).data("kendoWindow");

                var html = "";
                $("#menuListDiv").empty();
                if(ds.ds != null){
                    if(ds.ds.length > 0){
                        for(var i = 0 ; i < ds.ds.length ; i++){
                            let imgId = 'fvImg_' + ds.ds[i].MENU_ID;
                            let menuId = ds.ds[i].FV_MENU_ID == null ? ds.ds[i].MENU_ID : ds.ds[i].FV_MENU_ID;
                            let imgSrc = ds.ds[i].FV_MENU_ID ? "/images/ico/ico_book01_on.png" : "/images/ico/ico_book01.png";
                            let imgClass = ds.ds[i].FV_MENU_ID ? "favorite" : "" ;

                            html += '<div style="border-bottom: 1px solid lightgray; margin-top: 3px;">';
                            html += '   <a href="javascript:void(0);" onclick="verificationFvMenu(' + menuId + ', \'' + imgId + '\')">';
                            html += '       <img id="' + imgId + '" src="' + imgSrc + '" class="'+imgClass+'" >';
                            html += '   </a>';

                            html += "   <a href='#' class=\"searchMenuATag\" menuPath=\""+ ds.ds[i].MENU_PATH +"\" menuNamePath='홈 > " + ds.ds[i].MENU_NAME_PATH + "' menuNameKr='" + ds.ds[i].MENU_NAME + "'>\n";
                            html += ds.ds[i].MENU_NAME_PATH;
                            html += '</a>';
                            html += '</div>';
                        }
                    }
                }
                $("#menuListDiv").append(html);
                $(".searchMenuATag").on("click", function(){
                    var menuPath = $(this).attr("menuPath");
                    menuKendoWindowTemplate.data("kendoWindow").close();
                    $("#menuSearchToobar").val("");
                    open_in_frame(menuPath);
                });
                menuKendoWindowTemplate.data("kendoWindow").center().open();
            }
        }

        // 메뉴 즐겨찾기 저장
        function verificationFvMenu(menuID, imgId) {
            var isFavorite = $("#" + imgId).hasClass("favorite");
            if (isFavorite) {
                $.ajax({
                    url : "/main/setDelFvMenu",
                    type : "GET",
                    data : {
                        empSeq : $("#regEmpSeq").val(),
                        menuID : imgId.split("_")[1]
                    },
                    success : function (data){
                        $("#" + imgId).attr("src", "/images/ico/ico_book01.png").removeClass("favorite");
                        $("#changeChk").val("Y")
                    },
                });
            } else {
                $.ajax({
                    url : "/main/setFavoriteMenuInsert",
                    type : "GET",
                    data : {
                        empSeq : $("#regEmpSeq").val(),
                        menuID : imgId.split("_")[1]
                    },
                    success : function (data){
                        $("#" + imgId).attr("src", "/images/ico/ico_book01_on.png").addClass("favorite");
                        $("#changeChk").val("Y")
                    },
                });
            }
        }

        // 모달창에서 검색
        function getSelectMenu2() {
            $.ajax({
                url: "/main/getSearchMenu",
                type: 'GET',
                data: {
                    empSeq : $("#empSeq").val(),
                    menuName : $("#menuSearchModal").val()
                },
                success: function (ds) {
                    var html = "";
                    $("#menuListDiv").empty();
                    if(ds.ds != null){
                        if(ds.ds.length > 0){
                            for(var i = 0 ; i < ds.ds.length ; i++){
                                let imgId = 'fvImg_' + ds.ds[i].MENU_ID;
                                let menuId = ds.ds[i].FV_MENU_ID == null ? ds.ds[i].MENU_ID : ds.ds[i].FV_MENU_ID;
                                let imgSrc = ds.ds[i].FV_MENU_ID ? "/images/ico/ico_book01_on.png" : "/images/ico/ico_book01.png";
                                let imgClass = ds.ds[i].FV_MENU_ID ? "favorite" : "" ;

                                html += '<div style="border-bottom: 1px solid lightgray; margin-top: 3px;">';
                                html += '   <a href="javascript:void(0);" onclick="verificationFvMenu(' + menuId + ', \'' + imgId + '\')">';
                                html += '       <img id="' + imgId + '" src="' + imgSrc + '" class="'+imgClass+'" >';
                                html += '   </a>';

                                html += "   <a href='#' class=\"searchMenuATag\" menuPath=\""+ ds.ds[i].MENU_PATH +"\" menuNamePath='홈 > " + ds.ds[i].MENU_NAME_PATH + "' menuNameKr='" + ds.ds[i].MENU_NAME + "'>\n";
                                html += ds.ds[i].MENU_NAME_PATH;
                                html += '</a>';
                                html += '</div>';
                            }
                        }
                    }
                    $("#menuListDiv").append(html);
                },
            });
        }
    </script>

