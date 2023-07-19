<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-07-18
  Time: 오전 10:30
  캠틱홈페이지 템플릿
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<?php
  define('DIR','..');
  define('PATH','..');

  function pubGnb($str){
  global $_dep;
  $exp = explode(',',$str);
  $exp_count = count($exp);
  $act = 0;
  for($i=0;$i<count($exp);$i++){
    if($_dep[$i] == $exp[$i]){
      $act ++;
    }
  }
  if($act==$exp_count){
    echo 'active';
  }
}
?>