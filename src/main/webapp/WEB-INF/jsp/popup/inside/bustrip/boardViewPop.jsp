<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/boardViewPop.js?v=${toDate}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="table-responsive">
            <input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
            <input type="hidden" id="boardId" name="boardId" value="${params.boardId}">
            <input type="hidden" id="boardArticleId" name="boardArticleId" value="${params.boardArticleId}">


            <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">  <%-- table mb-0 --%>
                <colgroup>
                    <col width="10%">
                    <col width="40%">
                    <col width="10%">
                    <col width="40%">
                </colgroup>
                <tbody>
                <tr>
                    <th class="text-center th-color">제목</th>
                    <td colspan="3" id="articleTitleTd">
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #dedfdf">
                    <th class="text-center th-color">작성자</th>
                    <td id="articleRegEmpNameTd">

                    </td>
                    <th class="text-center th-color">작성일</th>
                    <td id="articleRegDateTd">

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="border-bottom: 1px solid #dedfdf;">
            <div style="padding: 30px;" id="articleContentDiv">
            </div>
        </div>
        <div style="margin-top:10px;display: flex;flex-direction: column;">
            <div style="display: flex; justify-content: space-between; margin: 0 0 10px;">
                <div class="spanft" style="font-weight: bold;">· 첨부파일</div>
                <div class="btn-st" style="margin:0;">
                    <button id="zipDownBtn" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleDetail.boardAttachmentDown()">
                        <span class="k-icon k-i-download k-button-icon"></span>
                    </button>
                </div>
            </div>

            <div>
                <div id="attachmentGrid" style="border-bottom: none;">

                </div>

                <div style="margin: 15px 0 15px 0;text-align: right;">
                    <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleDetail.setArticleDel()" id="articleDelBtn" style="display: none">
                        <span class="k-button-text">삭제</span>
                    </button>
                    <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleDetail.setArticleMod()" id="articleModBtn" style="display: none">
                        <span class="k-button-text">수정</span>
                    </button>
                    <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleDetail.listPageMove()">
                        <span class="k-button-text">목록</span>
                    </button>
                </div>
            </div>
        </div>
        <hr/>
        <div id="replyDiv" style="display: none">
            <div style="margin-top:10px;">
                <div style="display:flex; justify-content: space-between; align-items: center;">
                    <div class="spanft" style="font-weight: bold;">· 댓글</div>
                </div>
                <div style="margin-top:10px;">
                    <table class="table table-bordered replyTable" id="replyTable">
                        <colgroup>
                            <col width="8%">
                            <col width="65%">
                            <col width="16%">
                        </colgroup>
                        <tbody id="articleReplyTbody">
                        <tr>
                            <td class="text-center">댓글입력</td>
                            <td class="text-center" colspan="3">
                                <input type='hidden' id='articleReplyId' name='articleReplyId'>
                                <input type="text" id="articleReplyContent" name="articleReplyContent" style="width: 96%">
                                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleDetail.setArticleReply(this)">
                                    <span class="k-button-text">등록</span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    normalArticleDetail.fnDefaultScript();
</script>
</body>
</html>