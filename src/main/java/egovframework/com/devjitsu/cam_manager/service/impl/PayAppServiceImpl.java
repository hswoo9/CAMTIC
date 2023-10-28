package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public void updateExnpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("exnpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updateExnpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateExnpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);

            payAppRepository.updateExnpFinalApprStat(params);

            
//            payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void setPayAppDetData(Map<String, Object> params) {
        payAppRepository.updPayAppDetStat(params);
    }

    @Override
    public void setExnpData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("exnpSn")){
            payAppRepository.insExnpData(params);
        } else {
            payAppRepository.updExnpData(params);
            payAppRepository.delExnpDetailData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("exnpSn", params.get("exnpSn"));
            payAppRepository.insExnpDetailData(map);
        }

        if(params.containsKey("item")){
            String[] items = params.get("item").toString().split(",");

            for (String item : items){
                params.put("item", item);
                payAppRepository.updPayAppDetailStatus(params);
            }
        }

    }

    @Override
    public Map<String, Object> getExnpData(Map<String, Object> params) {
        return payAppRepository.getExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDetailData(Map<String, Object> params) {
        return payAppRepository.getExnpDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {
        return payAppRepository.getExnpList(params);
    }

    @Override
    public void exnpTest(Map<String, Object> params) {
        updateG20ExnpFinalAppr(params);
    }

    private void updateG20ExnpFinalAppr(Map<String, Object> params){
        List<Map<String, Object>> list = new ArrayList<>();
        list = payAppRepository.getExnpG20List(params);
        int docNumber = 0;          // 전체 지출결의서 CNT
        docNumber = payAppRepository.getCountDoc(list.get(0));
        int userSq = docNumber + 1;

        for(Map<String, Object> data : list) {
            int exnpDocNumber = 0;      // 같은 지출결의서 CNT
            exnpDocNumber = payAppRepository.getExnpCountDoc(data);
            data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
            data.put("USER_SQ", userSq);

            if(data.get("EVID_TYPE").toString().equals("1")){
                data.put("SET_FG", "3");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "1");
            } else if(data.get("EVID_TYPE").toString().equals("2")){
                data.put("SET_FG", "3");
                data.put("VAT_FG", "2");
                data.put("TR_FG", "1");
            } else if(data.get("EVID_TYPE").toString().equals("3")){
                data.put("SET_FG", "4");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "3");
            } else if(data.get("EVID_TYPE").toString().equals("4")){
                data.put("SET_FG", "1");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "3");
            } else if(data.get("EVID_TYPE").toString().equals("5")){
                data.put("SET_FG", "1");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "4");
            } else {
                data.put("SET_FG", "1");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "3");
            }


            payAppRepository.updExnpStat(data);
            System.out.println(data);
        }

    }
}
