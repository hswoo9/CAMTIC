package egovframework.com.devjitsu.inside.recruit.service;

import java.util.List;
import java.util.Map;

public interface EvalManageService {

    List<Map<String, Object>> getEvalItemMainList(Map<String, Object> params);
    void setInEvalRegCopy(Map<String, Object> params);
    void setEvalItemActiveUpd(Map<String, Object> params);
    void setEvalItemMain(Map<String, Object> params);
    Map<String, Object> getEvalItemMain(Map<String, Object> params);
    Map<String, Object> getRecruitEvalSelSheet(Map<String, Object> params);
    Map<String, Object> evalLoginChk(Map<String, Object> params);
    String setEvalSelection(Map<String, Object> params);
    Map<String, Object> setEvalSelectionEmpSeq(Map<String, Object> params);
    void setRecruitEvalSelSheet(Map<String, Object> params);
    List<Map<String, Object>> getApplicationScreenViewList(Map<String, Object> params);
    List<Map<String, Object>> getApplicationInterViewList(Map<String, Object> params);
    Map<String, Object> getApplicationCountH(Map<String, Object> params);
}
