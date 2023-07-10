package egovframework.com.devjitsu.common.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

import java.util.List;
import java.util.Map;

public interface CommonService {
    /**
     * KendoTreeView 조직도
     * @param deptSeq
     * @return
     */
    String ctDept(String deptSeq);

    List<Map<String, Object>> getUserList(Map<String, Object> params);

    int getUserListTotal(Map<String, Object> map);

    /**
     * 사용자별 접근 메뉴 조회
     * @param loginVO
     * @return
     */
    String getMenuFullJsonString(LoginVO loginVO);

    Map<String, Object> getContentFileOne(Map<String, Object> params);
}
