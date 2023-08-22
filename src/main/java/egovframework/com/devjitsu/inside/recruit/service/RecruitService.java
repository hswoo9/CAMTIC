package egovframework.com.devjitsu.inside.recruit.service;

import java.util.List;
import java.util.Map;

public interface RecruitService {

    /** 채용 */
    Map<String, Object> getRecruitNum();
    List<Map<String, Object>> getRecruitList(Map<String, Object> params);
    List<Map<String, Object>> getCommissionerList(Map<String, Object> params);
    void setRecruitInsert(Map<String, Object> params);
    void setCommissionerInsert(Map<String, Object> params);
}
