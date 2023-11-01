<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
    .custom-select {background:#fff url(/images/ico/ico-arr.png) no-repeat right 0.8rem center / 1.8rem auto; padding-left: 10px;text-align:left;border: 1px solid #a1a1a1;width:108px;height:33px;border-radius:5px;font-size: 15px; margin-bottom:10px;}
    .custom-select::after {content: '\25BC';position: absolute;top: 0;right: 0;padding: 5px;pointer-events: none;}
    .galleryList{border-top:1px solid #555; border-bottom:1px solid #ccc; line-height:40px; font-weight:bold; color: #333; text-align:center; overflow: hidden; background:#fff;}
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

                <div id="pastSite" style="padding:5px; ">
                    <select class="custom-select" onchange="">
                        <option>2017 년</option>
                        <option>2016 년</option>
                        <option>2015 년</option>
                        <option>2014 년</option>
                        <option>2013 년</option>
                        <option>2012 년</option>
                        <option>2011 년</option>
                        <option>2010 년</option>
                        <option>2009 년</option>
                        <option>2008 년</option>
                        <option>2007 년</option>
                        <option>2006 년</option>
                        <option>2005 년</option>
                        <option>2004 년</option>
                        <option>2003 년</option>
                        <option>2002 년</option>
                        <option>2001 년</option>
                        <option>2000 년</option>
                    </select>
                </div>

                <ul class="galleryList" style="text-align: center; display: flex; ">
                    <li style="display: flex; flex-direction: column;">
                        <div class="galleyImg" style="padding:0 20px;">
                            <img src="/images/camtic/businesseENG1-1.jpg" alt="" style="width:200px; height:260px; margin:20px 20px;">
                        </div>
                        <div class="galleyTxt">
                            <a href="#">소식지 67호</a>
                        </div>
                    </li>
                    <li style="display: flex; flex-direction: column;">
                        <div class="galleyImg" style="padding:0 20px;">
                            <img src="/images/camtic/businesseENG1-1.jpg" alt="" style="width:200px; height:260px; margin:20px 20px;">
                        </div>
                        <div class="galleyTxt">
                            <a href="#">소식지 67호</a>
                        </div>
                    </li>
                    <li style="display: flex; flex-direction: column;">
                        <div class="galleyImg" style="padding:0 20px;">
                            <img src="/images/camtic/businesseENG1-1.jpg" alt="" style="width:200px; height:260px; margin:20px 20px;">
                        </div>
                        <div class="galleyTxt">
                            <a href="#">소식지 67호</a>
                        </div>
                    </li>
                    <li style="display: flex; flex-direction: column;">
                        <div class="galleyImg" style="padding:0 20px;">
                            <img src="/images/camtic/businesseENG1-1.jpg" alt="" style="width:200px; height:260px; margin:20px 20px;">
                        </div>
                        <div class="galleyTxt">
                            <a href="#">소식지 67호</a>
                        </div>
                    </li>
                </ul>

                <div style="text-align:center; margin-top:20px;">
                    <div class="rig">
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
    function fn_goList(){
        location.href = '/camtic/pr/news.do';
    }

    $(document).ready(function(){
        $("#yearList").click();





    })



</script>
</body>

</html>