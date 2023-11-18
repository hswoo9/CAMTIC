package egovframework.com.devjitsu.inside.salary.service;

import java.util.List;
import java.util.Map;

public interface SalaryManageService {

    List<Map<String, Object>> getEmpSalaryManageList(Map<String, Object> params);
    List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params);
    void setSocialRate(Map<String, Object> params);
    void setSocialRateDel(Map<String, Object> params);

    List<Map<String, Object>> getEmpSalaryDataList(Map<String, Object> params);

    void setSalaryManage(Map<String, Object> params);

    List<Map<String, Object>> getSalaryList(Map<String, Object> params);

    void delSalaryManage(Map<String, Object> params);
}
