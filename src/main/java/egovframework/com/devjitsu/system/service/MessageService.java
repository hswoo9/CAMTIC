package egovframework.com.devjitsu.system.service;

import java.util.List;
import java.util.Map;

public interface MessageService {
    List<Map<String, Object>> getStringMenuList(Map<String, Object> params);
    List<Map<String, Object>> getMessageHistList(Map<String, Object> params);

    void msgSend(Map<String, Object> params);

    void setGroup(Map<String, Object> params);
    void setGroupMod(Map<String, Object> params);
    void setGroupDel(Map<String, Object> params);
    void setUser(Map<String, Object> params);
    void setUserMod(Map<String, Object> params);
    void setUserDel(Map<String, Object> params);
}
