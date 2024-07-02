<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<html>
<head>
    <title>Error Page</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <style>
        .icon {
            margin: 30px 0;
            color: #a80000;
            font-size: 72px;
        }
        .error-info {
            background-color: #ffc7c7;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            color: #a80000;
        }
    </style>
</head>
<body>
<div style="height: 100vh; font-family: Arial, sans-serif; text-align: center;">
    <div class="container" style="width: 80%; margin: auto; overflow: hidden;">
        <i class="fa fa-exclamation-triangle icon" aria-hidden="true"></i>
        <div class="error-info">
            <h2>Error Information</h2>
            <p><strong>Error Message</strong></p>
            <p>로그인 세션이 만료되었습니다. <br>다시 <span style="font-weight: bold;cursor: pointer" onclick="javascript:location.href='/logoutAction';">로그인</span> 해주세요.</p>
        </div>
    </div>
</div>
</body>
</html>