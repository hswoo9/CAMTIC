package egovframework.com.devjitsu.cam_crm.service;

import java.util.List;
import java.util.Map;

public interface CrmService {
    List<Map<String, Object>> getPopCrmList(Map<String, Object> params);

    Map<String, Object> getCrmData(Map<String, Object> params);

    List<Map<String, Object>> getCrmList(Map<String, Object> params);
}
