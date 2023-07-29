<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<style>
  .txt_zone {padding: 50px 50px 160px 50px; font-size: 17px; color: #252525;}

  /*.__boardView .head {
    border-top: 1px solid #ccc;
  }*/

  .__boardView .con {
    padding: 0px;
  }
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
          <li class=""><span class="categoryName"></span></li>
        </ul>
        <div id="title">
          <h3><span class="categoryName"></span></h3>
        </div>

        <div class="__boardView">
          <div class="head">
            <h2>${map.BOARD_ARTICLE_TITLE}</h2>
            <ul class="info">
              <li>작성자 : ${map.REG_EMP_NAME}</li>
              <li>작성일 : <fmt:formatDate value="${map.REG_DATE}" pattern="yyyy-MM-dd" type="date"/></li>
              <li>조회수 : ${map.BOARD_ARTICLE_VIEW_COUNT}</li>
            </ul>
          </div>

          <!-- <dl class="file">
              <dt><span>첨부파일</span></dt>
              <dd>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
              </dd>
          </dl> -->
          <div class="con">
            <div style="border-bottom: 1px solid #ccc; padding: 5px 0 5px 0; text-align: right; word-break:break-all; height: 55px;">
              <c:choose>
                <c:when test="${fn:length(fileMap) ne 0}">
                  <c:forEach var="file" items="${fileMap}" varStatus="status">
                    <c:choose>
                      <c:when test="${file.file_down_path ne null}">
                        <img src="/images/camtic/ico-drone5-1.png" style="filter: opacity(0.5) drop-shadow(0 0 0 #666);">
                        <a href="${file.file_down_path}">${file.file_org_name}.${file.file_ext}</a>
                      </c:when>
                      <c:when test="${status.count eq 1}">
                        <img src="/images/camtic/ico-drone5-1.png" style="filter: opacity(0.5) drop-shadow(0 0 0 #666);">
                        <span style="cursor: pointer;" onclick="fileDown('${file.file_path}${file.file_uuid}', '${file.file_org_name}.${file.file_ext}')">
                            ${file.file_org_name}.${file.file_ext}
                        </span>
                      </c:when>
                      <c:otherwise>
                        <span style="cursor: pointer;" onclick="fileDown('${file.file_path}${file.file_uuid}', '${file.file_org_name}.${file.file_ext}')">
                            , <img src="/images/camtic/ico-drone5-1.png" style="filter: opacity(0.5) drop-shadow(0 0 0 #666); background-size: 15px;">
                            ${file.file_org_name}.${file.file_ext}
                        </span>
                      </c:otherwise>
                    </c:choose>
                  </c:forEach>
                </c:when>
                <c:otherwise>
                  <span></span>
                </c:otherwise>
              </c:choose>
            </div>

            <div class="txt_zone" style="line-height:25px;">
              <c:if test="${categoryId eq 'photo'}" >
                <div style="text-align:center">
                  <c:forEach var="file" items="${fileMap}" varStatus="status">
                    <img src="${file.file_path}${file.file_uuid}"><br>
                  </c:forEach>
                </div>
              </c:if>

              ${map.BOARD_ARTICLE_CONTENT}
            </div>

          </div>


          <div class="con">
            <table>
              <c:if test="${map.afterKey ne '' && map.afterKey ne null}">
                <tr style="border-bottom: 1px solid #ececec;">
                  <td style="text-align: center; width: 10%; background-color: #f7f7f7;">다음글</td>
                  <td style="padding: 5px 0 5px 15px;">
                    <a href="#" onclick="fn_detailBoard('${map.afterKey}')">${map.afterName}</a></td>
                </tr>
              </c:if>
              <c:if test="${map.beforeKey ne '' && map.beforeKey ne null}">
                <tr style="border-top: 1px solid #ececec;">
                  <td style="text-align: center; width: 10%; background-color: #f7f7f7;">이전글</td>
                  <td style="padding: 5px 0 5px 15px;">
                    <a href="#" onclick="fn_detailBoard('${map.beforeKey}')">${map.beforeName}</a></td>
                </tr>
              </c:if>

            </table>
          </div>

        </div>

        <div class="__botArea">
          <div class="rig" style="left: 0px;">
            <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 grayLine"><span>목록보기</span></a>
          </div>
          <div class="rig" style="left: 12%;">
            <%--            <a href="#" class="__btn1 blue"><span>온라인 입사지원하기</span></a>--%>
            <a href="javascript:void(0);" onclick="fn_regist('${map.BOARD_ARTICLE_ID}');" class="__btn1 grayLine"><span>수정</span></a>
            <a href="javascript:void(0);" onclick="fn_delNotice('${map.BOARD_ARTICLE_ID}');" class="__btn1 grayLine"><span>삭제</span></a>
          </div>
          <div class="rig">
            <c:if test="${map.afterKey ne '' && map.afterKey ne null}">
              <a href="javascript:void(0);" onclick="fn_detailBoard('${map.afterKey}');" class="__btn1 grayLine"><span>다음글</span></a>
            </c:if>
            <c:if test="${map.beforeKey ne '' && map.beforeKey ne null}">
              <a href="javascript:void(0);" onclick="fn_detailBoard('${map.beforeKey}');" class="__btn1 grayLine"><span>이전글</span></a>
            </c:if>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<input type="hidden" id="boardArticleId" value="${map.BOARD_ARTICLE_ID}"/>
<input type="hidden" id="category" value="${categoryId}" />
<script>
  var categoryId = $("#category").val();

  $(function () {
    if(categoryId == "photo"){
      $(".categoryName").text("포토뉴스");
    }else if(categoryId == "report"){
      $(".categoryName").text("보도자료");
    }else if(categoryId == "news"){
      $(".categoryName").text("뉴스레터");
    }else if(categoryId == "video"){
      $(".categoryName").text("홍보영상");
    }
  });

  function fileDown(filePath, fileName){
    kendo.saveAs({
      dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
  }

  function fn_goList(){
    location.href = '/camtic/pr/'+categoryId+'.do';
  }

  //상세보기 이동
  function fn_detailBoard(key){
    location.href="/camtic/pr/pr_view.do?boardArticleId=" + key + "&category=" + categoryId;
  }

  function fn_regist(key){
    location.href="/camtic/news/register.do?boardArticleId=" + key + "&category=" + categoryId;
  }

  function fn_delNotice(){
    var data = {
      boardArticleId : $("#boardArticleId").val(),
      boardId : categoryId,
      category :categoryId,
    }

    if(!confirm("해당 게시글을 삭제하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/deleteBoard.do',
      type : 'POST',
      data: data,
      dataType : "json",
      async: false,
      success: function() {
        alert("삭제가 완료되었습니다.");

        location.href = '/camtic/pr/'+categoryId+'.do';
      }
    });
  }
</script>