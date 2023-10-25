package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PayAppServiceImpl implements PayAppService {

    @Autowired
    private PayAppRepository payAppRepository;

    @Override
    public void payAppSetData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payAppSn")){
            payAppRepository.insPayAppData(params);
        } else {
            payAppRepository.updPayAppData(params);
            payAppRepository.delPayAppDetailData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("payAppSn", params.get("payAppSn"));
            payAppRepository.insPayAppDetailData(map);
        }

    }

    @Override
    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return payAppRepository.getPayAppReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {
        return payAppRepository.getPayAppDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return payAppRepository.getPaymentList(params);
    }

    @Override
    public void updatePayAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payAppSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updatePayAppApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updatePayAppApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updatePayAppFinalApprStat(params);
//            payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void setPayAppDetData(Map<String, Object> params) {
        payAppRepository.updPayAppDetStat(params);
    }
}
