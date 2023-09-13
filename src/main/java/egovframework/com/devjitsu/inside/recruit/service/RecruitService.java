package egovframework.com.devjitsu.inside.recruit.service;

import java.util.List;
import java.util.Map;

public interface RecruitService {

    /** 채용 */
    Map<String, Object> getRecruitNum();
    List<Map<String, Object>> getRecruitList(Map<String, Object> params);
    Map<String, Object> getRecruit(Map<String, Object> params);
    Map<String, Object> getRecruitArea(Map<String, Object> params);
    List<Map<String, Object>> getCommissionerList(Map<String, Object> params);
    void setRecruitInsert(Map<String, Object> params);
    void setCommissionerInsert(Map<String, Object> params);
    List<Map<String, Object>> getApplicationList(Map<String, Object> params);
    void setApplicationUpd(Map<String, Object> params);
    void setInAvoidUpd(Map<String, Object> params);
    List<Map<String, Object>> getInApplicationList(Map<String, Object> params);
    void setApplicationInTime(Map<String, Object> params);
    void setPrePassAppl(Map<String, Object> params);
}
