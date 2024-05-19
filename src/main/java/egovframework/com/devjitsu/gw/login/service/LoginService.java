package egovframework.com.devjitsu.gw.login.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

import java.util.Map;

public interface LoginService {

    LoginVO actionLogin(LoginVO loginVO);
    Map<String, Object> actionLoginMap(Map<String, Object> params);

    void updMasterKey(Map<String, Object> params);

    //public Map<String, Object> actionLoginMs(Map<String, Object> params) throws Exception;
}
