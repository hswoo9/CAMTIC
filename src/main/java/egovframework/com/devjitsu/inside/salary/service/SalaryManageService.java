package egovframework.com.devjitsu.inside.salary.service;

import java.util.List;
import java.util.Map;

public interface SalaryManageService {

    List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params);
    void setSocialRate(Map<String, Object> params);
    void setSocialRateDel(Map<String, Object> params);
}
