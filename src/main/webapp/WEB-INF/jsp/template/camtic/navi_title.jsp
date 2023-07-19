<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-07-18
  Time: 오전 10:30
  캠틱홈페이지 템플릿
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<ul id="navigation">
  <li><a href="/camtic">홈으로</a></li>
  <?
						for($i=0;$i<count($_tit);$i++){
							echo '<li>'.$_tit[$i].'</span>';
  }
  ?>
</ul>
<div id="title">
  <h3><?=end($_tit)?></h3>
</div>