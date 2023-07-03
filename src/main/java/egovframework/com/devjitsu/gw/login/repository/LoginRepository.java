package egovframework.com.devjitsu.gw.login.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.stereotype.Repository;

@Repository
public class LoginRepository extends AbstractDAO {

    public LoginVO actionLogin(LoginVO loginVO) {
        loginVO.setGroupSeq("camtic_new");
        return (LoginVO) selectOne("login.actionLogin", loginVO);
    }

    //public Map<String, Object> actionLoginMs(Map<String, Object> map) throws Exception {
    //    return (Map<String, Object>) selectOneMs("loginMs.actionLoginMs", map);
    //}
}
