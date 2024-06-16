package egovframework.com.devjitsu.docView.service;

import java.util.List;
import java.util.Map;

public interface DocViewProcessService {
    void updateCardLossDocState(Map<String, Object> bodyMap) throws Exception;
    void updateAccCertDocState(Map<String, Object> bodyMap) throws Exception;
    void updateSignetToDocState(Map<String, Object> bodyMap) throws Exception;
    void updateDisAssetDocState(Map<String, Object> bodyMap) throws Exception;
    void updateResignDocState(Map<String, Object> bodyMap) throws Exception;
    void updateDetailsDocState(Map<String, Object> bodyMap) throws Exception;
}
