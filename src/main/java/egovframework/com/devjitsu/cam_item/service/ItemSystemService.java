package egovframework.com.devjitsu.cam_item.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ItemSystemService {
    List<Map<String, Object>> getCrmItemManageList(Map<String, Object> params);
    void setCrmItemManageDel(Map<String, Object> params);
    List<Map<String, Object>> groupCodeList(Map<String, Object> params);
    void saveGroupCode(Map<String, Object> params);
    List<Map<String, Object>> codeList(Map<String, Object> params);
    void insSetLgCode(Map<String, Object> params);
    List<Map<String, Object>> smCodeList(Map<String, Object> params);
    void insItemCode(Map<String, Object> params);
    List<Map<String, Object>> selLgCode(Map<String, Object> params);
    List<Map<String, Object>> selSmCode(Map<String, Object> params);
    List<Map<String, Object>> selLgSmCode(Map<String, Object> params);
    List<Map<String, Object>> getItemMasterList(Map<String, Object> params);
    Map<String, Object> getItemMaster(Map<String, Object> params);
    boolean getItemNoDuplicate(Map<String, Object> params);
    void setItemMasterReg(Map<String, Object> params);
    void setItemMasterDel(Map<String, Object> params);
    List<Map<String, Object>> getItemCategoryList(Map<String, Object> params);
    Map<String, Object> getItemCategoryOne(Map<String, Object> params);
    boolean getCgDuplicateChk(Map<String, Object> params);
    void setItemCategoryReg(Map<String, Object> params);
    void setItemCategoryDel(Map<String, Object> params);
}
