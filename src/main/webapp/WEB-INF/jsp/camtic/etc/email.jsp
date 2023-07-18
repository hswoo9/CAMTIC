<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <div id="content">
        <?include_once PATH.'/inc/navi_title.php';?>
        <div class="__email">
          <div class="ico"><img src="/images/camtic/ico-noemail.svg" alt=""></div>
          <p>
            본 웹사이트에 게시된 이메일 주소가 전자우편수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는것을 거부하며 이를<br class="__p">
            <span>위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>