package egovframework.com.devjitsu.gw.login.service.impl;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.LoginRepository;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Override
    public LoginVO actionLogin(LoginVO loginVO) {
        LoginVO login = loginRepository.actionLogin(loginVO);
        return login;
    }

    //public Map<String, Object> actionLoginMs(Map<String, Object> params) throws Exception{
    //    Map<String, Object> map = loginRepository.actionLoginMs(params);

    //    if (map != null) {
    //        return map;
    //    } else {
    //        map = new HashMap<>();
    //    }

    //    return map;
    //}
}
