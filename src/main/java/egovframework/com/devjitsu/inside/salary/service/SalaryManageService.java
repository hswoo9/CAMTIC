package egovframework.com.devjitsu.inside.salary.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    void esmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception;
    void esmExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;

    List<Map<String, Object>> getPayRollLedgerList(Map<String, Object> params);
    Map<String, Object> setExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;

    List<Map<String, Object>> getPayRollLedgerStatusList(Map<String, Object> params);
}
