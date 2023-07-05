package egovframework.com.devjitsu.gw.user.service;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<Map<String, Object>> getOrgDeptList(Map<String, Object> param);

    Map<String, Object> getUserInfo(Map<String, Object> params);

    Map<String, Object> getIdCheck(Map<String, Object> params);
}
