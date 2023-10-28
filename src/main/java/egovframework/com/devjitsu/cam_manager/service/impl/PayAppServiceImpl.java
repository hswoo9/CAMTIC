package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.g20.repository.G20Repository;
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

    @Autowired
    private G20Repository g20Repository;

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

            updateG20ExnpFinalAppr(params);
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

        Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
        Map<String, Object> execMap = new HashMap<>();

        int i = 0;
        for(Map<String, Object> data : list) {
            int exnpDocNumber = 0;      // 같은 지출결의서 CNT
            exnpDocNumber = payAppRepository.getExnpCountDoc(data);
            data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
            data.put("USER_SQ", userSq);

            Map<String, Object> tradeMap = g20Repository.getTradeInfo(data);
            Map<String, Object> hearnerMap = g20Repository.getHearnerInfo(data);

            if(tradeMap != null) {
                data.put("REG_NB", tradeMap.get("REG_NB"));
                data.put("PPL_NB", tradeMap.get("PPL_NB"));
                data.put("CEO_NM", tradeMap.get("CEO_NM"));
                data.put("BUSINESS", tradeMap.get("BUSINESS"));
                data.put("JONGMOK", tradeMap.get("JONGMOK"));
                data.put("ZIP", tradeMap.get("ZIP"));
                data.put("DIV_ADDR1", tradeMap.get("DIV_ADDR1"));
                data.put("ADDR2", tradeMap.get("ADDR2"));
            }

            if(hearnerMap != null) {
                data.put("ETCDATA_CD", hearnerMap.get("ETCDATA_CD"));
                data.put("ETCPER_CD", hearnerMap.get("ETCPER_CD"));
                data.put("ETCREG_NO", hearnerMap.get("ETCREG_NO"));
                data.put("ETCPER_NM", hearnerMap.get("ETCPER_NM"));
                data.put("ETCZIP_CD", hearnerMap.get("ETCZIP_CD"));
                data.put("ETCADDR", hearnerMap.get("ETCADDR"));
                data.put("ETCPHONE", hearnerMap.get("ETCPHONE"));
                data.put("ETCBANK_CD", "");
                data.put("ETCACCT_NO", hearnerMap.get("ETCACCT_NO"));
                data.put("ETCACCT_NM", hearnerMap.get("ETCACCT_NM"));
                data.put("ETCRVRS_YM", hearnerMap.get("ETCRVRS_YM"));
                data.put("ETCDIV_CD", hearnerMap.get("ETCDIV_CD"));
                data.put("ETCDUMMY1", "76");
            }

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

                if(hearnerMap == null){
                    data.put("ETCPER_NM", data.get("TR_NM"));
                    data.put("ETCACCT_NO", data.get("CRM_ACC_NO"));
                    data.put("ETCACCT_NM", data.get("CRM_ACC_HOLDER"));
                    data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                    data.put("ETCDIV_CD", data.get("DIV_CD"));
                    data.put("ETCDUMMY1", "76");
                }
            } else {
                data.put("SET_FG", "1");
                data.put("VAT_FG", "3");
                data.put("TR_FG", "3");
            }

            g20Repository.insZnSautoabdocu(data);

            payAppRepository.updExnpStat(data);

            i++;

            if(list.size() == i){
                data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                g20Repository.execUspAncj080Insert00(data);
            }

        }


    }
}
