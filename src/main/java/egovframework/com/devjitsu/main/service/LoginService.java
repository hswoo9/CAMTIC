package egovframework.com.devjitsu.main.service;

import egovframework.com.devjitsu.main.dto.LoginVO;

public interface LoginService {

    LoginVO actionLogin(LoginVO loginVO);

    //public Map<String, Object> actionLoginMs(Map<String, Object> params) throws Exception;
}
