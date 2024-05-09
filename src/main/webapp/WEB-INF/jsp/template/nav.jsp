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
                <!-- ################# MAIN MENU ################### -->
                <div class="" id="mainmenu">
                    <h5 class="sidebar-title">업무</h5>
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
    </script>

