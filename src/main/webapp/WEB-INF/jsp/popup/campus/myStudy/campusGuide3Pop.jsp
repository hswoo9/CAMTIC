<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/myStudy/campusGuide3Pop.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/systemManagement.js?v=${toDate}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-12" style="margin:0 auto;">
      <div>
        <table class="searchTable table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <tr>
            <td colspan="4">
              <input type="text" id="detailSearch" style="width: 100%;">
            </td>
          </tr>
        </table>
        <div style="margin:20px 0;">
          <div class="table-responsive">
            <table class="table table-bordered">
              <colgroup>
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
              </colgroup>
              <thead>
              <tr>
                <th>구분</th>
                <th>LEVEL 0</th>
                <th>LEVEL 1</th>
                <th>LEVEL 2</th>
                <th>LEVEL 3</th>
              </tr>
              </thead>
              <tbody id="tableData">
              </tbody>
            </table>
          </div><!-- table-responsive -->
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  eduGui3.init();
</script>
</body>
