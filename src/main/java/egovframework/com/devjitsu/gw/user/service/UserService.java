package egovframework.com.devjitsu.gw.user.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<Map<String, Object>> getOrgDeptList(Map<String, Object> param);

    Map<String, Object> getUserInfo(Map<String, Object> params);

    Map<String, Object> getManagerInfo(Map<String, Object> params);

    Map<String, Object> getTempMngInfo(Map<String, Object> params);

    Map<String, Object> getIdCheck(Map<String, Object> params);

    List<Map<String, Object>> getEmpList(Map<String, Object> params);

    List<Map<String, Object>> getEmpSelList(Map<String, Object> params);

    void setUserInfoUpdate(Map<String, Object> params);

    Map<String,Object> getUserPersonnelOne (Map<String,Object> params);

    Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params);

    void setHistoryAdd(Map<String, Object> params, MultipartFile[] historyFiles, String serverDir, String baseDir);

    List<Map<String, Object>> getHistoryList(Map<String, Object> params);

    Map<String, Object> getHistoryOne(Map<String, Object> params);

    List<Map<String, Object>> getHistoryFileInfo(Map<String, Object> params);

    Map<String,Object> getUserInfoToId (Map<String,Object> params);

    String getMasterKey();
}
