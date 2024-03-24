package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface TaxService {
    List<Map<String, Object>> getTaxList(Map<String, Object> params);

    void syncEtaxG20Data(Map<String, Object> params);
}
