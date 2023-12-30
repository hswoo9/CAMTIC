<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="today" class="java.util.Date" />

<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<%--<script src="/js/intra/common/aes.js?v=1"></script>--%>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>

<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<style>
    .__lab {display:inline-flex;gap:0.5rem;align-items:center;margin-right:1.5rem;position:relative;}
    .__lab:last-child {margin-right:0;}
    .__lab input {position:absolute;left:-9999px;top:0;}
    .__lab i {display:block;width:1.2rem;height:1.2rem;border:1px solid #ccc;position:relative;font-style:normal;background-color:#fff;}
    .__lab input[type='radio'] ~ i {border-radius:50%;}
    .__lab input[type='radio'] ~ i:before {content:"";opacity:0;width:1rem;height:1rem;background:#0078ff;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;}
    .__lab input[type='radio']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='radio']:checked ~ i:before {opacity:1;}

    .__lab input[type='checkbox'] ~ i:before {content:"\f2d5";font-family:axicon;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);opacity:0;color:#0078ff;font-size:1.0rem;}
    .__lab input[type='checkbox']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='checkbox']:checked ~ i:before {opacity:1;}
    .__lab span{font-weight: normal; font-size:1.2rem;}

    .__tit1 {margin-bottom:1rem;position:relative;}
    .__tit1 h3 {font-size:1.7rem;font-weight:500;color:#000;letter-spacing:-0.05em;line-height:1.3;}
    .__tit1 > p {font-size:1.5rem;line-height:1.4;margin-top:0.5rem;letter-spacing:-0.03em;}
    .__tit1 .rig {position:absolute;right:0;bottom:0;}

    .__agree .area {border:0.1rem solid #ccc;font-size:1.2rem;line-height:1.8;padding:2rem;letter-spacing:-0.05em;background:#f3f3f3;}
    .__agree .txt {margin-top:2rem;font-size:1.2rem;text-align:center;letter-spacing:-0.05em;line-height:1.5;}
    .__agree .lab {margin-top:1.5rem;font-size:1.6rem;text-align:center;}

    .__sign {text-align:center;}
    .__sign p {font-size:1.6rem;letter-spacing:-0.05em;}
    .__sign dl dt {font-size:2.4rem;letter-spacing:-0.05em;color:#000;margin-top:2rem;}
    .__sign dl dd {font-size:2rem;letter-spacing:-0.05em;margin-top:1.5rem;color:#000;font-weight:500;}
    .__sign .lab {margin-top:1.5rem;font-size:1.6rem;}

    @media all and (max-width:1024px){
        .__agree .area {font-size:1.4rem;line-height:1.6;padding:1.5rem;}
        .__agree .txt {margin-top:1.2rem;font-size:1.3rem;}
        .__agree .lab {margin-top:1rem;font-size:1.4rem;}
    }

    .__tbl {width:100%;border-top:0.2rem solid #2a3278;}
    .__tbl tr > * {padding:1rem;text-align:center;border-bottom:1px solid #ccc;font-size:1.3rem;letter-spacing:-0.03em;line-height:1.3;}
    .__tbl small {font-size:0.9em;color:#aaa;letter-spacing:-0.05em;}
    .__tbl thead tr th {background:#f3f3f3;color:#000;font-weight:normal;}
    .__tbl tbody tr th {background:#f3f3f3;color:#000;font-weight:normal;}
    .__tbl tbody tr td {height:2.9rem;}
    .__tbl .subject {text-align:left;}
    .__tbl .subject a {display:inline-block;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#000;}
    .__tbl h2 {font-size:1.8rem;color:#000;font-weight:bold;letter-spacing:-0.05em;}
    .__tbl.fix {table-layout:fixed;}
    .__tbl.line tr > * {border-right:1px solid #ccc;}
    .__tbl.line tr > *:last-child {border-right:none;}

    .__inp{font-size:16px; padding-left:10px;}

    #careerType1 {margin-left:10px;}
    #careerType2 {margin-left:20px;}
    #gender {gap:0px;}
    .k-radio {border-color: #C5C5C5; color:#1A5089 !important;}
    #veterans {gap:0px;}

</style>

<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
                <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
                <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
                <ul id="navigation">
                    <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
                    <li class="">직원과 함께</li>
                    <li class=""><span>입사지원 조회</span></li>
                </ul>
                <div id="title">
                    <h3><span>입사지원 조회</span></h3>
                </div>

                <div class="__tit1 __mt60">
                    <h3>입사지원 현황</h3>
                </div>

                <table class="__tbl respond2 fix" >
                    <colgroup>
                        <col width="15%">
                        <col width="30%">
                        <col width="30%">
                        <col width="15%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>지원공고명</th>
                        <th>공고기간</th>
                        <th>지원직종</th>
                        <th>서류전형</th>
                        <th>면접전형</th>
                        <th>최종결과</th>
                        <th>취소</th>
                    </tr>
                    </thead>
                    <tbody id="myRecruitList">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<script>
    var userEmail = $("#userEmail").val()
    var applicationId = $("#applicationId").val()
    var recruitInfoSn = $("#recruitInfoSn").val()

    $(function(){
        getMyRecruitList();
    });

    function getMyRecruitList() {

        $.ajax({
            url: '/camtic/member/getMyRecruitList',
            type: 'GET',
            data: {
                userEmail : userEmail,
            },
            success: function (data) {
                drawTable(data.list);
            },
        });
    }

    //게시글 리스트 HTML
    function drawTable(data) {

        $("#myRecruitList").html('');

        let html = "";

        if(data.length>0){
        data.forEach((item, index) => {
            html += "<tr>";
            //html += '<td>' +item.RECRUIT_NUM+'</td>';
            html += '<td>' + (data.length - index) + '</td>';
            //html += '<td class="subject"><a href="#" onclick="fn_detailBoard('+ item.RECRUIT_INFO_SN +')">'+ item.RECRUIT_TITLE +'</a></td>';
            html += '<td class="subject">'+ item.RECRUIT_TITLE +'</td>';
            html += '<td>' + item.START_DT + ' <span style="margin-left:5px; margin-right:5px;">~</span> ' + item.END_DT + '</td>';
            html += '<td>' + item.JOB + '</td>';
            if(item.APPLICATION_STAT == 'D' || item.APPLICATION_STAT == 'I' || item.APPLICATION_STAT == 'IF'){
                html += '<td>서류 합격</td>'
            }else if(item.APPLICATION_STAT == 'DF'){
                html += '<td>서류 불합격</td>'
            }else{
                html += '<td>-</td>'
            }

            if(item.APPLICATION_STAT == 'I'){
                html += '<td>면접 합격</td>'
            }else if(item.APPLICATION_STAT == 'IF'){
                html += '<td>면접 불합격</td>'
            }else{
                html += '<td>-</td>'
            }

            if(item.APPLICATION_STAT == 'I') {
                html += '<td>합격</td>'
            }else if(item.PRELIMINARY_PASS == 'Y'){
                html += '<td>예비 합격</td>'
            }else{
                html += '<td>-</td>'
            }

            //html += '<td><button type="button" class="k-button k-button-solid-error" onClick="cancelMyRecruit('+item.RECRUIT_INFO_SN+')"><span>취소</span></button></td>';
            html += '<td><button type="button" class="k-button k-button-solid-error" onClick="cancelMyRecruit('+item.RECRUIT_INFO_SN+','+item.APPLICATION_ID+')"><span>취소</span></button></td>';
            html += "</tr>";
        });
        }else{
            html += "<tr>";
            html += '<td colspan="8">입사지원한 공고가 없습니다.</td>';
            html += "</tr>";
        }
        $("#myRecruitList").append(html);
    }

    function cancelMyRecruit(recruitInfoSn, applicationId) {
        if(confirm("입사 지원을 취소하시겠습니까?")){
            $.ajax({
                url: "/camtic/member/cancelMyRecruit",
                data: {
                    applicationId : applicationId,
                    recruitInfoSn : recruitInfoSn
                },
                dataType : "json",
                async: false,
                success: function(rs){
                    alert("삭제되었습니다.")
                    location.reload();
                }
            })
        }
    }
</script>