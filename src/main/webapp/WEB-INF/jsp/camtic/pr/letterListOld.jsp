<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<style>
    .custom-select {background:#fff url(/images/ico/ico-arr.png) no-repeat right 0.8rem center / 1.8rem auto; padding-left: 10px ;text-align:left;border: 1px solid #a1a1a1;width:120px;height:33px;border-radius:5px;font-size: 15px; margin-bottom:10px;}
    .custom-select::after {content: '\25BC';position: absolute;top: 0;right: 0;padding: 5px;pointer-events: none;}
    .galleryList{text-align: center; display: flex; flex-wrap: wrap; line-height:40px; font-weight:bold; color: #333;overflow: hidden; background:#fff; margin-left: 57px;}
</style>
<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <ul id="navigation">
                    <li><a href="/camtic">홈으로</a></li>
                    <li class="">홍보관</li>
                    <li class="">뉴스레터</li>
                    <li class="">이전 소식지</li>
                </ul>
                <div id="title">
                    <h3>이전 소식지</h3>
                </div>

                <div id="pastSite" style="padding:5px; border-bottom:1px solid #ccc; margin-bottom:15px;">
                    <select id="yearBox" class="custom-select" onchange="getSelectedYearData()">
                        <option value="2017">2017 년</option>
                        <option value="2016">2016 년</option>
                        <option value="2015">2015 년</option>
                        <option value="2014">2014 년</option>
                        <option value="2013">2013 년</option>
                        <option value="2012">2012 년</option>
                        <option value="2011">2011 년</option>
                        <option value="2010">2010 년</option>
                        <option value="2009">2009 년</option>
                        <option value="2008">2008 년</option>
                        <option value="2007">2007 년</option>
                        <option value="2006">2006 년</option>
                        <option value="2005">2005 년</option>
                        <option value="2004">2004 년</option>
                        <option value="2003">2003 년</option>
                        <option value="2002">2002 년</option>
                        <option value="2001">2001 년</option>
                        <option value="2000">2000 년</option>
                    </select>
                </div>

                <ul id="galleryList" class="galleryList"></ul>

                <div style="text-align:center; margin-top:20px; border-top:1px solid #ccc;">
                    <div class="rig" style="margin-top:20px;">
                        <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 blue" style="min-width:100px;height:40px;font-size:15px;"><span>e-나래 보기</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<input type="hidden" id="category" value="${categoryId}" />

<script>
    $(function(){
        getSelectedYearData();
    });

    function fn_goList(){
        location.href = '/camtic/pr/news.do';
    }

    function getSelectedYearData() {

        let selectedYear = $("#yearBox option:selected").val();

        $.ajax({
            url: '/board/getLetterListOld',
            type: 'GET',
            data: { year: selectedYear },
            success: function (data) {
                drawTable(data.list);
            },
        });
    }

    //게시글 리스트 HTML
    function drawTable(data) {

        $("#galleryList").html('');

        let html = "";

        data.forEach((item, index) => {
            html += '<li style="display: flex; flex-direction: column;">';
            html += '<div class="galleyImg" style="padding: 0 20px;">';
            html += '<img src="' + item.IMAGE_URL + '" alt="" onclick="fileDown(\''+ item.FILE_URL +'\',\''+ item.FILE_ORG_NAME +'\');" style="width: 200px; height: 260px; margin: 20px 20px; cursor:pointer;">';
            html += '</div>';
            html += '<div class="galleryTxt">';
            html += '<a href="#">소식지 ' + item.SOSIK_HO + '호</a>';
            html += '</div>';
            html += '</li>';
        });
        $("#galleryList").append(html);
    }

    function fileDown(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }
</script>
</body>

</html>