package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface PayAppService {

    void payAppSetData(Map<String, Object> params);

    Map<String, Object> getPayAppReqData(Map<String, Object> params);

    List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params);

    List<Map<String, Object>> getPaymentList(Map<String, Object> params);
}
