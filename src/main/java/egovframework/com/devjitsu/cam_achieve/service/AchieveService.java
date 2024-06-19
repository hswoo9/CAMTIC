package egovframework.com.devjitsu.cam_achieve.service;

import java.util.List;
import java.util.Map;

public interface AchieveService {

    Map<String, Object> getAllPjtCalc(Map<String, Object> params);

    Map<String, Object> getDeptPayrollData(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayrollList(Map<String, Object> params);

    List<Map<String, Object>> getEngnList(Map<String, Object> params);

    List<Map<String, Object>> getEngnDeptData(Map<String, Object> params);

    Map<String, Object> getSaleByDeptData(Map<String, Object> params);

    Map<String, Object> getIncpByDeptData(Map<String, Object> params);

    List<Map<String, Object>> getDeptObjList(Map<String, Object> params);

    List<Map<String, Object>> getObjByDeptList(Map<String, Object> params);

    void insDeptObjSetting(Map<String, Object> params);

    List<Map<String, Object>> getExnpCompAmt(Map<String, Object> params);

    List<Map<String, Object>> geincpCompAmt(Map<String, Object> params);

    Map<String, Object> getResultProject(Map<String, Object> params);

    Map<String, Object> getPjtDevSn(Map<String, Object> params);

    void setProjectPaySet(Map<String, Object> params);

    Map<String, Object> getProjectPaySet(Map<String, Object> params);
}
