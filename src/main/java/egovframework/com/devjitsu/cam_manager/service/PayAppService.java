package egovframework.com.devjitsu.cam_manager.service;

import java.util.Map;

public interface PayAppService {

    void payAppSetData(Map<String, Object> params);

    Map<String, Object> getPayAppReqData(Map<String, Object> params);
}
