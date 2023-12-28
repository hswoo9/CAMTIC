package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public void payAppSetData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payAppSn")){
            payAppRepository.insPayAppData(params);
        } else {
            payAppRepository.updPayAppData(params);
            payAppRepository.delPayAppDetailData(params);
        }

        // 구매청구에서 지급신청시 claimSn Key 가져옴
        if(params.containsKey("claimSn")){
            // 구매청구관리 지급신청 Key Insert
            payAppRepository.updPurcClaimByPayAppSn(params);
        }

        commonRepository.updFileOwnerNull(params);

        for(Map<String, Object> map : itemArr){
            map.put("payAppSn", params.get("payAppSn"));

            payAppRepository.insPayAppDetailData(map);

            String filePath = "/upload/useCard/" + map.get("authNo") + "/" + map.get("authDd") + "/" + map.get("authHh") + "/" + map.get("cardNo").toString().replaceAll("-", "") + "/" + map.get("buySts") + "/";
            map.put("filePath", filePath);

            commonRepository.updFileOwner(map);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "payApp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payAppSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                String[] fileName = list.get(i).get("orgFilename").toString().split("[.]");
                String fileOrgName = "";
                for(int j = 0 ; j < fileName.length - 1 ; j++){
                    fileOrgName += fileName[j] + ".";
                }
                fileOrgName = fileOrgName.substring(0, fileOrgName.length() - 1);
                list.get(i).put("fileExt", fileName[fileName.length - 1]);
                list.get(i).put("fileOrgName", fileOrgName);
            }
            commonRepository.insFileInfo(list);
        }

    }

    @Override
    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return payAppRepository.getPayAppReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();

        if(params.containsKey("payAppDetSn")){
            String payAppDetSnArr[] = params.get("payAppDetSn").toString().split(",");
            for(String payAppDetSn : payAppDetSnArr){
                Map<String, Object> map = new HashMap<>();
                params.put("payAppDetSn", payAppDetSn);
                map = payAppRepository.getPayAppDetailInfo(params);
                list.add(map);
            }


            return list;
        } else {
            return payAppRepository.getPayAppDetailData(params);
        }

    }

    @Override
    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return payAppRepository.getPaymentList(params);
    }

    @Override
    public List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params) {
        return payAppRepository.getWaitPaymentList(params);
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
        Map<String, Object> payAppInfo = payAppRepository.getPayAppInfo(params);
        List<Map<String, Object>> payAppItemList = payAppRepository.getPayAppItemList(params);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updatePayAppApprStat(params);

            for(Map<String, Object> map : payAppItemList){
                payAppRepository.insUseCardInfo(map);
            }

        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updatePayAppApprStat(params);

            payAppRepository.delUseCardInfo(payAppInfo);

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
            Map<String, Object> pkMap = payAppRepository.getExnpData(params);
            if(!"4".equals(pkMap.get("PAY_APP_TYPE"))){
                params.put("payAppType", pkMap.get("PAY_APP_TYPE"));
                updateG20ExnpFinalAppr(params, "app");
            }
            //payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateIncpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payIncpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updateIncpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateIncpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updateIncpFinalApprStat(params);
            updateG20IncpFinalAppr(params, "app");
        }
    }

    @Override
    public void setPayAppDetData(Map<String, Object> params) {
        payAppRepository.updPayAppDetStat(params);
    }

    @Override
    public void setPayAppCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppCostApp(params);
    }

    @Override
    public void setPayAppDetCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppDetCostApp(params);
    }

    @Override
    public void setExnpData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if("".equals(params.get("payAppSn")) || params.get("payAppSn") == null){
            params.remove("payAppSn");
        }
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
            if(!"".equals(params.get("item").toString())){
                String[] items = params.get("item").toString().split(",");

                for (String item : items){
                    params.put("item", item);
                    payAppRepository.updPayAppDetailStatus(params);
                }
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
    public List<Map<String, Object>> getExnpReList(Map<String, Object> params) {
        return payAppRepository.getExnpReList(params);
    }

    @Override
    public List<Map<String, Object>> getIncpList(Map<String, Object> params) {
        return payAppRepository.getIncpList(params);
    }

    @Override
    public List<Map<String, Object>> getIncpReList(Map<String, Object> params) {
        return payAppRepository.getIncpReList(params);
    }

    @Override
    public void payIncpSetData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payIncpSn")){
            payAppRepository.insPayIncpData(params);
        } else {
            payAppRepository.updPayIncpData(params);
            payAppRepository.delPayIncpDetailData(params);
        }

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepoData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("payIncpSn", params.get("payIncpSn"));
            payAppRepository.insPayIncpDetailData(map);
        }

    }

    @Override
    public Map<String, Object> getPayIncpReqData(Map<String, Object> params) {
        return payAppRepository.getPayIncpReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params) {
        return payAppRepository.getPayIncpDetailData(params);
    }

    @Override
    public void resolutionExnpAppr(Map<String, Object> params) {
        updateG20ExnpFinalAppr(params, "resolution");
        payAppRepository.resolutionExnpStatus(params);
    }

    @Override
    public void resolutionIncpAppr(Map<String, Object> params) {
        updateG20IncpFinalAppr(params, "resolution");
        payAppRepository.resolutionIncpAppr(params);
    }

    private void updateG20ExnpFinalAppr(Map<String, Object> params, String type){
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> pkMap = payAppRepository.getExnpData(params);

        /** 1.지출결의서 일때 세금계산서, 계산서, 신용카드는 반제결의 승인시 g20 프로시저 호출 해야 함 */
        if("1".equals(pkMap.get("PAY_APP_TYPE"))){
            if(type.equals("resolution")){
                params.put("evidTypeArr", "1,2,3,4,5,6,9");
                list = payAppRepository.getExnpG20List(params);
            } else {
                params.put("evidTypeArr", "1,2,3");
                list = payAppRepository.getExnpG20List(params);
            }
        } else if("2".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        } else if("3".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        } else if("4".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        }


        if(list.size() != 0){
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

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                    }
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

                if((data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3")) && type.equals("resolution")) {
                    if(data.get("DOCU_FG").toString().equals("1")){
                        data.put("DOCU_FG", "99");
                    }
                }


                g20Repository.insZnSautoabdocu(data);


                i++;

                payAppRepository.updExnpStat(data);

                if(type.equals("resolution") || (data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3"))) {
                    if(list.size() == i) {
                        data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                        g20Repository.execUspAncj080Insert00(data);
                    }
                }
            }
        }
    }

    private void updateG20IncpFinalAppr(Map<String, Object> params, String type){
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> pkMap = payAppRepository.getIncpData(params);

        if(type.equals("resolution")){
            params.put("evidTypeArr", "1,2,3,4,5,6");
        }else{
            params.put("evidTypeArr", "7");
        }
        list = payAppRepository.getIncpG20List(params);

        if(list.size() != 0){
            int docNumber = 0;          // 전체 지출결의서 CNT
            docNumber = payAppRepository.getCountDoc(list.get(0));
            int userSq = docNumber + 1;

            Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
            Map<String, Object> execMap = new HashMap<>();

            int i = 0;
            for(Map<String, Object> data : list) {
                int exnpDocNumber = 0;      // 같은 지출결의서 CNT
                exnpDocNumber = payAppRepository.getIncpCountDoc(data);
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
                }
                data.put("ETCDUMMY1", "76");

                if(data.get("EVID_TYPE").toString().equals("1")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");

                } else if(data.get("EVID_TYPE").toString().equals("2")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");

                } else if(data.get("EVID_TYPE").toString().equals("3")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "3");

                } else if(data.get("EVID_TYPE").toString().equals("4")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");

                } else if(data.get("EVID_TYPE").toString().equals("5")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");
                } else if(data.get("EVID_TYPE").toString().equals("6")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");
                } else {
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");
                }

                g20Repository.insZnSautoabdocu(data);

                payAppRepository.updIncpStat(data);

                i++;

                if(list.size() == i){
                    data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                    g20Repository.execUspAncj080Insert00(data);
                }

            }
        }
    }

    @Override
    public void updPayAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("payDestSn", params.get("payDestSn"));
                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "payAtt_" + params.get("payDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void updExnpAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));
                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPayAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getPayAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "payAtt_" + params.get("payDestSn"));
            returnMap.put("etcFile", payAppRepository.getPayAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPayAttList(Map<String, Object> params) {
        return payAppRepository.getPayAttList(params);
    }

    @Override
    public Map<String, Object> getExnpAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getExnpAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
            returnMap.put("etcFile", payAppRepository.getExnpAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getExnpAttList(Map<String, Object> params) {
        return payAppRepository.getExnpAttList(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public List<Map<String, Object>> getPartRatePay(Map<String, Object> params) {
        return payAppRepository.getPartRatePay(params);
    }

    @Override
    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return payAppRepository.getDepositList(params);
    }

    @Override
    public void setPayDepo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepo(params);
        } else {
            payAppRepository.insPayDepo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "payDepo");
        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("payDepoSn", params.get("payDepoSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                payAppRepository.updPayDepoFile(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getPayDepoData(Map<String, Object> params) {
        return payAppRepository.getPayDepoData(params);
    }

    @Override
    public void setApprIncome(Map<String, Object> params) {
        payAppRepository.updApprStatus(params);
    }

    @Override
    public List<Map<String, Object>> getCheckBudget(Map<String, Object> params) {

        List<Map<String, Object>> list = payAppRepository.getCheckBudget(params);
        return list;
    }

    @Override
    public void delPayApp(int[] params) {
        for(int i = 0 ; i < params.length ; i++){
            payAppRepository.delPayApp(params[i]);
        }
    }

    @Override
    public void updExnpDe(int[] params, Map<String, Object> params2) {
        for(int i = 0 ; i < params.length ; i++){
            Map<String, Object> map = new HashMap<>();

            map.put("payAppSn", params[i]);
            map.put("payExnpDe", params2.get("payExnpDe"));
            payAppRepository.updExnpDe(map);
        }
    }

    @Override
    public List<Map<String, Object>> getPayAppFileList(Map<String, Object> params) {
        return payAppRepository.getPayAppFileList(params);
    }

    @Override
    public List<Map<String, Object>> getApprovalExnpFileData(Map<String, Object> params) {
        List<Map<String, Object>> list = payAppRepository.getExnpDetailData(params);
        List<Map<String, Object>> fileList = payAppRepository.getApprovalExnpCommonFileData(params);

        for(Map<String, Object> data : list){
            fileList.add(payAppRepository.getApprovalExnpFileData(data));
        }

        return fileList;
    }

    @Override
    public List<Map<String, Object>> getPjtExnpList(Map<String, Object> params) {
        return payAppRepository.getPjtExnpList(params);
    }

    @Override
    public void setProjectTaxInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectTaxInfo(params);
        } else {
            payAppRepository.updProjectTaxInfo(params);
        }
    }

    @Override
    public Map<String, Object> getProjectSettingInfo(Map<String, Object> params) {
        return payAppRepository.getProjectSettingInfo(params);
    }

    @Override
    public void setProjectBudgetInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectBudgetInfo(params);
        } else {
            payAppRepository.updProjectBudgetInfo(params);
        }
    }

    @Override
    public void payAppRevert(Map<String, Object> params) {

        payAppRepository.payAppRevert(params);

        payAppRepository.insPayAppRevert(params);

    }
}
