package egovframework.com.devjitsu.common.service;

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
}
