<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css" integrity="sha512-3pIirOrwegjM6erE5gPSwkUzO+3cTjpnV9lexlNZqvupR64iZBnOOTiiLPb9M36zpMScbmUNIcHUqKD47M719g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
  input[type="text"] {
    width: 50%;
    height: 34px;
    display: inline-block;
    background: none;
    border: 1px solid #c9c9c9;
    padding-left: 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  input[name="groupKey"], input[name="linkText"]{
    width: 40%;
    height: 34px;
    display: inline-block;
    background: none;
    border: 1px solid #c9c9c9;
    padding-left: 5px;
    font-size: 14px;
  }
  .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }

  table th{
    width : 10%;
    text-align: left;
  }
  .file-and-table-container {
    display: flex;
    margin-top: 50px;
    padding-top: 10px;
    border-top: 1px solid #c9c9c9;
  }
  .fileTable {
    width: 80%;
    border-collapse: collapse;
    margin : 0 0 0 20px;
  }
  .fileTable .fileTr .fileTh {
    border: 1px solid #ccc;
    padding: 5px;
  }
  .fileTable .fileTr .fileTh {
    background-color: #f2f2f2;
    text-align: center;
  }

  .__btn1 {
    min-width: 120px;
    height: 40px;
  }

  #title{
    margin-bottom: 0;
  }

  /*뉴스레터 게시판으로 인한 수정*/
  .filebox2 .__btn1 {
    min-width: 120px;
    height: 35px;
  }
  .filebox2 .addBtn .__btn1 {
    min-width: 70px;
    height: 35px;
  }
  .filebox2 .addBtn2 .__btn1 {
    min-width: 70px;
    height: 35px;
  }
  .__boardView .con {
    font-size: 20px;
    padding-right: 5px;
  }

  .file-and-table-container2 {
    width: 100%;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #c9c9c9;
  }

  .file-and-table-container2 .notStyle_div{
    display: flex;
    width: 100%;
  }

  .file-and-table-container2 .linkInfo{
    width: 100%;
    margin-top: 5px;
    padding-top: 5px;
  }

  [class*='__btn'].grayLine[disabled]{
    background: #e0e0e0;
  }

  @media (max-width: 1024px) {
    .addBtn {margin-left: 29px;}
    .addBtn2 {margin-left: 26px;}
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
          <li class="">뉴스레터</li>
          <li class="">게시글 수정</li>
        </ul>
        <div id="title">
          <h3><span class="categoryName">뉴스레터</span></h3>
        </div>

        <div class="__boardView">
          <div class="head">
            <div>
              <table style="line-height: 60px;">
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>제목</th>
                  <td>
                    <input type="text" id="noticeTitle" class="inputText" value="${map.BOARD_ARTICLE_TITLE}" />
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>작성자</th>
                  <td>
                    <input type="text" id="writer" class="inputText" value="${map.REG_EMP_NAME}" disabled/>
                  </td>
                </tr>
                <tr>
                  <th>작성일자</th>
                  <td>
                    <input type="text" id="writeDate" class="inputText" value="<fmt:formatDate value="${map.REG_DATE}" pattern="yyyy-MM-dd" type="date"/>" disabled/>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="con">
            <textarea class="txt_area_01" id="contents">
              ${map.BOARD_ARTICLE_CONTENT}
            </textarea>

            <form>
              <div class="file-and-table-container">
                <div><span id="textMod">표지</span></div>
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
                    <th class="fileTh">용량</th>
                    <th class="fileTh">기타</th>
                  </tr>
                  </thead>
                  <tbody id="fileGrid">
                  <tr class="defultTr">
                    <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                  </tr>
                  </tbody>
                </table>
                <div>
                  <div class="filebox">
                    <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()" >
                      <span class="__btn1 grayLine">이미지 첨부</span>
                    </button>
                    <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" style="display: none"/>
                  </div>
                </div>
              </div>
            </form>

            <form id="linkTbl">
              <div class="file-and-table-container2" id="linkDiv1" name="linkDiv" data-number="1">
                <div class="notStyle_div"><span>링크 생성</span></div>

                <textarea class="txt_area_01" id="contents1">
                  ${firstLinkInfo.CONTENT}
                </textarea>

                <div class="linkInfo">
                  <div class="filebox2">
                    <span>└&nbsp;</span>
                    <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="padding-left: 2px;" onclick="groupKeyCreate()" disabled>
                      <span class="__btn1 grayLine" disabled="disabled">그룹 생성</span>
                    </button>
                    <input type="text" id="groupKey" name="groupKey" style="/*width: 10%;*/margin: 0 5px 0 5px;text-align:center;" value="${firstLinkInfo.GROUP_KEY}" readonly />

                    <div>
                      <input type="hidden" id="linkKey1" value="${firstLinkInfo.LINK_KEY}" />
                      <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-left: 30px; margin-top: 4px;" onclick="linkCreate(1)" disabled>
                        <span class="__btn1 grayLine" disabled="disabled">링크 생성</span>
                      </button>
                      <input type="text" id="linkText1" name="linkText" style="width: 40%; margin: 0 5px 0 5px;" value="${firstLinkInfo.LINK}" readonly />
                      <button type="button" id="copyBtn1'" onclick="copyBtn(1)"><img src="/images/nav.png" style="background: white" alt="복사"></button>

                      <button type="button" class="addBtn" style="margin-top: 4px;" onclick="addLinkDiv()">
                        <span class="__btn1 grayLine">추가</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </form>

          </div>

          <div class="__botArea">
            <div class="rig">
              <a href="javascript:void(0);" onclick="fn_move();" class="__btn1 grayLine"><span>뒤로가기</span></a>
              <a href="javascript:void(0);" onclick="fn_updNotice();" class="__btn1 grayLine"><span>수정하기</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="boardArticleId" value="${map.BOARD_ARTICLE_ID}"/>
<input type="hidden" id="category" value="${map.BOARD_CATEGORY_ID}"/>
<script>
  var referrer = document.referrer;
  var categoryId = $("#category").val();
  var groupKey = $("#groupKey").val();
  var groupFlag = false;
  var num = 1;
  var totalNum = 1;

  var linkInfoSize = 0;
  var linkInfo;

  $(function () {
    CKEDITOR.replace('contents', {
      height: 250
    });

    CKEDITOR.replace('contents1', {
      weight: 700,
      height: 200
    });


    fnDefaultScript();
    fnDefalutLink();

  });


  function fnDefaultScript() {
    var data = {
      boardArticleId : $("#boardArticleId").val(),
      category : categoryId
    }

    $.ajax({
      url: "/camtic/news/getFileListInfo.do",
      data: data,
      dataType : "json",
      async: false,
      success: function(rs){
        console.log(rs.fileMap);
        if(rs.fileMap.length > 0){
          $("#fileGrid").find(".defultTr").remove();
          $("#fileGrid").find(".addFile").remove();

          var html = '';
          for (var i = 0; i < rs.fileMap.length; i++) {
            html += '<tr style="text-align: center" class="beforeAddFile">';
            html += '   <td>' + rs.fileMap[i].file_org_name + '</td>';
            html += '   <td>' + rs.fileMap[i].file_ext + '</td>';
            html += '   <td>' + rs.fileMap[i].file_size + '</td>';
            html += '   <td>';
            html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="commonFileDel(' + rs.fileMap[i].file_no + ', this)">'
            html += '   </td>';
            html += '</tr>';
          }

          $("#fileGrid").append(html);
        }
      },

    });
  }

  function commonFileDel(e, v){
    if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
      $.ajax({
        url: "/common/commonFileDel",
        data: {
          fileNo: e
        },
        type: "post",
        datatype: "json",
        success: function (rs) {
          var rs = rs.rs;
          alert(rs.message);
          if(rs.code == "200"){
            $(v).closest("tr").remove();
            if($("#fileGrid").find("tr").length == 0){
              $("#fileGrid").html('<tr>' +
                  '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                  '</tr>');
            }

            fnDefaultScript();
          }
        }
      });
    }
  }

  //리턴데이터 그려주기
  function fnDefalutLink(){
    $.ajax({
      url : "/camtic/pr/getRetrunNewsData.do",
      data : {"boardArticleId" : $("#boardArticleId").val()},
      type : "post",
      dataType : "json",
      async : false,
      success : function(rs){
        linkInfoSize = rs.list.length;
        linkInfo = rs.list;
      }
    });

    let cnt = 0;

    if(linkInfoSize > 1){
      for(var x=2; x <= linkInfoSize; x++){
        num += 1;
        totalNum += 1;
        cnt += 1;
        let group = groupKey;

        let html = "";

        html += '<div class="file-and-table-container2" id="linkDiv'+num+'" name="linkDiv" data-number="'+num+'">';
        html += '<div class="linkInfo">';
        html += '<div class="filebox2">';
        html += '<span>└&nbsp</span>'
        html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="padding-left: 2px;" onclick="groupKeyCreate()" disabled>';
        html += '<span class="__btn1 grayLine">그룹 번호</span></button>';
        html += '<input type="text" id="groupKey" name="groupKey" style="margin: 0 5px 0 5px;text-align:center;" value="'+group+'" readonly />';

        html += '<div>'
        html += '<input type="hidden" id="linkKey'+num+'" value="'+linkInfo[cnt].LINK_KEY+'" />';
        html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-left:26px;margin-top: 4px;" onclick="linkCreate('+num+')" disabled>';
        html += '<span class="__btn1 grayLine" disabled="disabled">링크 생성</span></button>';
        html += '<input type="text" id="linkText'+num+'" name="linkText" style="width: 40%; margin: 4px 5px 0 5px;" value="'+linkInfo[cnt].LINK+'" readonly />';
        html += '<button type="button" id="copyBtn'+num+'" style="margin-top: 4px;" onclick="copyBtn('+num+')"><img src="/images/nav.png" style="background: white" alt="복사"></button>';


        html += '<button type="button" class="addBtn2" style="margin-top: 4px;" onclick="delLinkDiv('+num+')" >';
        html += '<span class="__btn1 grayLine" >삭제</span></button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $("#linkTbl").append(html);
        let editorId = 'contents' + num;
        let contentValue = linkInfo[cnt].CONTENT;

        $('<textarea>', {
          id: editorId,
          class: 'txt_area_01',
          value: linkInfo[cnt].CONTENT,
        }).prependTo('#linkDiv' + num);

        CKEDITOR.replace(editorId, {
          weight: 700,
          height: 200,
          on: {
            instanceReady: function (evt) {
              evt.editor.setData(contentValue);
            },
          },
        });

      }
    }
  }

  //링크 테이블 추가
  function addLinkDiv(){
    if(!$("#groupKey").val()){
      alert("그룹 코드 오류 발생!!!");
      return false;
    }
    var parentElementId = "linkTbl";
    var lastChild = $("#" + parentElementId).children().last();

    var number = lastChild.data("number");

    let group = groupKey;

    num += 1;
    totalNum += 1;

    if(number == num){
      num += 1;
    }

    let html = "";

    html += '<div class="file-and-table-container2" id="linkDiv'+num+'" name="linkDiv" data-number="'+num+'">';
    html += '<div class="linkInfo">';
    html += '<div class="filebox2">';
    html += '<span>└&nbsp</span>'
    html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="padding-left: 2px;" onclick="groupKeyCreate()" disabled>';
    html += '<span class="__btn1 grayLine">그룹 번호</span></button>';
    html += '<input type="text" id="groupKey" name="groupKey" style="margin: 0 5px 0 5px;text-align:center;" value="'+group+'" readonly />';

    html += '<div>'
    html += '<input type="hidden" id="linkKey'+num+'" value="" />';
    html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-left:26px;margin-top: 4px;" onclick="linkCreate('+num+')">';
    html += '<span class="__btn1 grayLine">링크 생성</span></button>';
    html += '<input type="text" id="linkText'+num+'" name="linkText" style="width: 40%; margin: 4px 5px 0 5px;" value="" readonly />';
    html += '<button type="button" class="addBtn2" style="margin-top: 4px;" onclick="delLinkDiv('+num+')" >';
    html += '<span class="__btn1 grayLine">삭제</span></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $("#linkTbl").append(html);

    let editorId = 'contents' + num;

    $('<textarea>', {
      id: editorId,
      class: 'txt_area_01',
    }).prependTo('#linkDiv' + num);

    CKEDITOR.replace(editorId, {
      weight: 700,
      height: 200
    });
  }

  //링크 테이블 삭제
  function delLinkDiv(number){
    num -= 1;
    totalNum -= 1;

    $("#linkDiv" + number).remove();
  }

  //그룹 생성
  function groupKeyCreate(){
    if(groupFlag){alert("그룹은 최초 1회만 생성 가능합니다."); return false;}

    let random = new Date().getTime().toString(36);

    $("#groupKey").val(random);
    groupKey = random;
    groupFlag = true;
  }
  //링크 생성
  function linkCreate(num){
    if(groupKey == ""){alert("그룹을 생성해주세요."); return false; }

    let random = new Date().getTime().toString(16);

    $("#linkKey" + num).val(random);
    $("#linkText" + num).val('javascript:openPopup(\'' + groupKey + '\',\'' + random + '\')');
    if(document.getElementById("copyBtn" + num)){
    }else{
      let html = '<button type="button" id="copyBtn'+num+'" onclick="copyBtn('+num+')"><img src="/images/nav.png" style="background: white" alt="복사"></button>';
      $("#linkText" + num).after(html);
    }
  }

  //링크 복사
  function copyBtn(num) {
    let text = $("#linkText" + num).val();

    const copy = (text) => {
      // 임시의 textarea 생성
      const $textarea = document.createElement("textarea");

      // body 요소에 존재해야 복사가 진행됨
      document.body.appendChild($textarea);

      // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
      $textarea.value = text;
      $textarea.select();

      // 복사 후 textarea 지우기
      document.execCommand('copy');
      document.body.removeChild($textarea);
    }
    copy(text);
    toastr.success('복사완료');
  }

  function fn_move(){
    location.href= referrer;
  }


  //저장
  function fn_updNotice(){
    var content = CKEDITOR.instances.contents.getData();
    var linkFlag = true;

    if($("#noticeTitle").val() == ""){
      alert("제목을 입력해주세요.");
      return false;
    }
    if(content == ""){
      alert("내용을 입력해주세요.");
      return false;
    }

    var formData = new FormData();

    formData.append("boardId", "news");
    formData.append("category", "news");
    formData.append("boardArticleId", $("#boardArticleId").val());
    formData.append("menuCd", "news");
    formData.append("noticeTitle", $("#noticeTitle").val());
    formData.append("writer", $("#writer").val().toString());
    formData.append("content", content);
    formData.append("num", totalNum);
    formData.append("groupKey", $("#groupKey").val());

    if(fCommon.global.attFiles.length != 0){
      if(fCommon.global.attFiles.length > 1){
        alert("첨부 이미지는 1개만 업로드 가능합니다..");
        return false;
      }

      //첨부파일
      if(fCommon.global.attFiles[0].name.split(".")[1] == "png" || fCommon.global.attFiles[0].name.split(".")[1] == "jpg") {
      }else{
        alert("파일 확장자를 확인해주세요. \n jpg, png 확장자만 업로드 가능합니다.");
        return false;
      }
      formData.append("boardFile", fCommon.global.attFiles[0]);
    }


    var cnt = 0;
    $("div[name='linkDiv']").each(function(){
      cnt += 1;
      let number = $(this).data("number");

      var instanceLinkKey = "linkText" + cnt;
      var instanceLinkKey2 = "linkKey" + cnt;
      var instanceLinkValue = $("#linkText" + number).val();
      var instanceLinkValue2 = $("#linkKey" + number).val();

      if(instanceLinkValue == ""){
        $("#" + instanceLinkKey).focus();
        linkFlag = false;
        return false;
      }

      formData.append(instanceLinkKey, instanceLinkValue);
      formData.append(instanceLinkKey2, instanceLinkValue2);

      var instanceContentKey = "contents" + cnt;
      var instanceContent = "contents" + number;
      var instanceContentValue = CKEDITOR.instances[instanceContent].getData();

      formData.append(instanceContentKey, instanceContentValue);
    });

    if(!linkFlag){alert("링크를 생성해주세요."); return false;}

    console.log("총 링크 수 ::" + totalNum);
    if(!confirm("게시글을 등록하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/updNotice.do',
      type : 'POST',
      data: formData,
      dataType : "json",
      contentType: false,
      processData: false,
      enctype : 'multipart/form-data',
      async : false,
      success: function() {
        alert("수정이 완료되었습니다.");

        location.href = referrer;
      }
    });


  }

</script>
</body>
</html>
