package egovframework.com.devjitsu.system.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MessageService {
    List<Map<String, Object>> getStringMenuList(Map<String, Object> params);
    List<Map<String, Object>> getMessageHistList(Map<String, Object> params);
    List<Map<String, Object>> getMailHistList(Map<String, Object> params);
    Map<String, Object> getMailHistData(Map<String, Object> params);
    List<Map<String, Object>> getMailDetList(Map<String, Object> params);

    void msgSend(Map<String, Object> params);

    void setGroup(Map<String, Object> params);
    void setGroupMod(Map<String, Object> params);
    void setGroupDel(Map<String, Object> params);
    void setUser(Map<String, Object> params);
    void setUserMod(Map<String, Object> params);
    void setUserDel(Map<String, Object> params);
    void setMailHist(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);
    void setMailDet(Map<String, Object> params);
    void setMailDetCom(Map<String, Object> params);
}
