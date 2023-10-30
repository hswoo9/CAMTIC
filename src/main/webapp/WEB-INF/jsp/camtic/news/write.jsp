<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
  input[type="text"], input[type="datetime-local"]{
    width: 50%;
    height: 34px;
    display: inline-block;
    background: none;
    border: 1px solid #c9c9c9;
    padding-left: 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }

  table th{
    width : 10%;
    text-align: left;
  }
  /* margin,padding 숨김 2023-10-30 김병수*/
  .file-and-table-container {
    display: flex;
    /*margin-top: 50px;
    padding-top: 10px;
    border-top: 1px solid #c9c9c9;*/
  }
  .fileTable {
    width: 80%;
    border-collapse: collapse;
    /*margin : 0 0 0 20px;*/
  }
  .fileTable .fileTr .fileTh {
    border: 1px solid #ccc;
    padding: 5px;
  }
  .fileTable .fileTr .fileTh {
    background-color: #f2f2f2;
    text-align: center;
  }
  /* 파일첨부 버튼 수정 2023-10-30 김병수 */
  #fileUpload .__btn1 {
    min-width: 90px;
    height: 26px;
    padding: 0;
    font-size: 15px;
  }
  /* 버튼 수정 2023-10-30 김병수 */
  .__btn1 {
    min-width: 85px;
    height: 38px;
    font-size: 15px;
  }

  #title{
    margin-bottom: 0;
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
          <li class="">캠틱소식</li>
          <li class=""><span class="categoryName"></span></li>
          <li class="">게시글 등록</li>
        </ul>
        <div id="title">
          <h3><span class="categoryName"></span></h3>
        </div>

        <div class="__boardView">
          <div class="head">
            <div>
              <table style="line-height: 60px;">
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>제목</th>
                  <td>
                    <input type="text" id="noticeTitle" class="inputText" value="" />
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>작성자</th>
                  <td>
                    <input type="text" id="writer" class="inputText" value="관리자" disabled/>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>작성일자</th>
                  <td>
                    <input type="text" id="writeDate" class="inputText" value="" disabled/>
                  </td>
                </tr>
                <c:if test="${categoryId eq 'business'}">
                  <tr style="border-bottom: 1px solid #ccc;">
                    <th>사업기간</th>
                    <td>
                      <input type="datetime-local" id="startDate" style="width: 20%;" value="" />
                      ~
                      <input type="datetime-local" id="endDate" style="width: 20%;" value="" />
                    </td>
                  </tr>
                </c:if>

                <tr style="border-bottom: 1px solid #ccc;">
                  <th>내용</th>
                  <td style="padding: 15px 0 15px 0;">
                    <textarea class="txt_area_01" id="contents"></textarea>
                  </td>
                </tr>

                <tr>
                  <th>첨부파일</th>
                  <td style="line-height : 1;padding: 15px 0 15px 0;">
                    <form>
                      <div class="file-and-table-container">
                        <table class="fileTable" style="width: 40%; margin-right: 15px;">
                          <colgroup>
                            <col width="50%">
                            <col width="10%">
                            <col width="30%">
                            <col width="10%">
                          </colgroup>
                          <thead>
                          <tr class="fileTr">
                            <th class="fileTh">파일명</th>
                            <th class="fileTh">확장자</th>
                            <th class="fileTh">용량(KB)</th>
                            <th class="fileTh">기타</th>
                          </tr>
                          </thead>
                          <tbody id="fileGrid">
                          <tr class="defultTr">
                            <td colspan="4" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>
                          </tr>
                          </tbody>
                        </table>

                        <div>
                          <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                              <span class="__btn1 grayLine">파일첨부</span>
                            </button>
                            <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>
                          </div>
                        </div>
                      </div>
                    </form>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- <dl class="file">
              <dt><span>첨부파일</span></dt>
              <dd>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
              </dd>
          </dl> -->


          <div class="__botArea">
            <div class="rig">
              <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 grayLine"><span>목록보기</span></a>
              <a href="javascript:void(0);" onclick="fn_saveNotice();" class="__btn1 grayLine"><span>등록하기</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="category" value="${categoryId}" />
<script>
  var categoryId = $("#category").val();

  $(function () {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let date2 = today.getDate() + 1;
    let formattedMonth = String(month).padStart(2, '0');
    let formattedDay = String(date).padStart(2, '0');
    let formattedDay2 = String(date2).padStart(2, '0');

    //$("#writeDate").val(year + "년 " + month + "월 " + date + "일");
    $("#writeDate").val(year + "-" + formattedMonth + "-" + formattedDay);
    $("#startDate").val(year + "-" + formattedMonth + "-" + formattedDay);
    $("#endDate").val(year + "-" + formattedMonth + "-" + formattedDay2);

    CKEDITOR.replace('contents', {
      height: 250
    });

    if(categoryId == "notice"){
      $(".categoryName").text("공지사항");
    }else if(categoryId == "business"){
      $(".categoryName").text("사업공고");
    }else if(categoryId == "study"){
      $(".categoryName").text("교육/행사");
    }else if(categoryId == "partner"){
      $(".categoryName").text("유관기관소식");
    }

    /*addTimeOptions('startTime');
    addTimeOptions('endTime');*/

    setDefaultTime('startDate');
    setDefaultTime('endDate');
  });

  function setDefaultTime(e) {
    const datetimeInput = document.getElementById(e);

    const currentDate = new Date();

    if(e == 'startDate'){
      currentDate.setHours(18, 0, 0);
    }else{
      currentDate.setHours(27, 0, 0);
    }

    const formattedDate = currentDate.toISOString().slice(0, 16);
    datetimeInput.value = formattedDate;
  }


  function addTimeOptions(e) {
    var selectElement = document.getElementById(e);

    for (var i = 0; i <= 23; i++) {
      var option = document.createElement("option");
      var hour = i < 10 ? "0" + i : i.toString(); // 시간을 두 자리 숫자로 포맷팅
      option.value = hour;
      option.text = hour + " 시";

      if (hour === "09" && e == "startTime") {
        option.selected = true;
      }else if(hour === "18" && e == "endTime"){
        option.selected = true;
      }

      selectElement.appendChild(option);
    }

  }

  function fn_goList(){

    location.href = '/camtic/news/commonBoard.do?categoryKey='+categoryId;
  }

  function fn_saveNotice(){

    var content = CKEDITOR.instances.contents.getData();

    /*var data = {
      boardId : categoryId,
      boardCategoryId : categoryId,
      noticeTitle : $("#noticeTitle").val(),
      writer : $("#writer").val().toString(),
      content : content
    }*/

    if($("#noticeTitle").val() == ""){
      alert("제목을 입력해주세요.");
      return false;
    }

    if(content == ""){
      alert("내용을 입력해주세요.");
      return false;
    }

    var formData = new FormData();

    formData.append("boardId", categoryId);
    formData.append("boardCategoryId", categoryId);
    formData.append("menuCd", categoryId);
    formData.append("noticeTitle", $("#noticeTitle").val());
    formData.append("writer", $("#writer").val().toString());
    formData.append("startDt", $("#startDate").val());
    formData.append("endDt", $("#endDate").val());
    formData.append("content", content);

    //첨부파일
    if(fCommon.global.attFiles != null){
      for(var i = 0; i < fCommon.global.attFiles.length; i++){
        formData.append("boardFile", fCommon.global.attFiles[i]);
      }
    }

    if(!confirm("게시글을 등록하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/insNotice.do',
      type : 'POST',
      data: formData,
      dataType : "json",
      contentType: false,
      processData: false,
      enctype : 'multipart/form-data',
      async : false,
      success: function() {

        location.href = '/camtic/news/commonBoard.do?categoryKey='+categoryId;
      }
    });


  }

</script>
</body>
</html>
