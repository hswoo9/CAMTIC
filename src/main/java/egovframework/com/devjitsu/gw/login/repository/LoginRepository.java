package egovframework.com.devjitsu.gw.login.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class LoginRepository extends AbstractDAO {

    public LoginVO actionLogin(LoginVO loginVO) {
        loginVO.setGroupSeq("camtic_new");
        return (LoginVO) selectOne("login.actionLogin", loginVO);
    }

    public Map<String, Object> actionLoginMap(Map<String, Object> params) {
        params.put("groupSeq", "camtic_new");
        return (Map<String, Object>) selectOne("login.actionLoginMap", params);
    }

    public void updMasterKey(Map<String, Object> params) {
        update("login.updMasterKey", params);
    }

    //public Map<String, Object> actionLoginMs(Map<String, Object> map) throws Exception {
    //    return (Map<String, Object>) selectOneMs("loginMs.actionLoginMs", map);
    //}
}
