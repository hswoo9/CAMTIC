package egovframework.com.devjitsu.doc.formManagement.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FormManagementService {
    List<Map<String, Object>> getTemplateFormFile(Map<String, Object> params);

    Map<String, Object> getDocFormInfoReqOpt(Map<String, Object> params);

    Map<String, Object> getFormRdCfList(Map<String, Object> params);

    Map<String, Object> getDocFormLinkagePopUrl(Map<String, Object> params);

    List<Map<String, Object>> getFormFolderList(Map<String, Object> params);
    void setFormFolder(Map<String, Object> params);
    void setFormFolderDel(Map<String, Object> params);
    List<Map<String, Object>> getFormList(Map<String, Object> params);
    void setForm(Map<String, Object> params, MultipartFile form, MultipartFile logo, MultipartFile symbol, String server_path, String server_dir, String base_dir) throws Exception;
    void setFormDel(Map<String, Object> params, String SERVER_PATH, String base_dir) throws Exception;
    List<Map<String, Object>> getLinkageProcessList(Map<String, Object> params);
    int setProcessValidationChk(Map<String, Object> params);
    void setLinkageProcess(Map<String, Object> params);
    void setLinkageProcessDel(Map<String, Object> params);
}
