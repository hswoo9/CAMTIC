package egovframework.com.devjitsu.formManagement.service;

import java.util.List;
import java.util.Map;

public interface FormManagementService {
    List<Map<String, Object>> getTemplateFormFile(Map<String, Object> params);

    Map<String, Object> getDocFormInfoReqOpt(Map<String, Object> params);

    Map<String, Object> getFormRdRcCfList(Map<String, Object> params);

    Map<String, Object> getDocFormLinkagePopUrl(Map<String, Object> params);

}
