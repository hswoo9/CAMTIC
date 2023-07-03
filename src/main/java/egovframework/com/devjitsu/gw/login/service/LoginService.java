package egovframework.com.devjitsu.gw.login.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

public interface LoginService {

    LoginVO actionLogin(LoginVO loginVO);

    //public Map<String, Object> actionLoginMs(Map<String, Object> params) throws Exception;
}
