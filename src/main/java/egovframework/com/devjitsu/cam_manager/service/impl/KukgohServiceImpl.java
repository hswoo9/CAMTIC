package egovframework.com.devjitsu.cam_manager.service.impl;


import egovframework.com.devjitsu.cam_manager.repository.KukgohRepository;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.devjitsu.common.utiles.CSVKeyUtil;
import egovframework.devjitsu.common.utiles.EsbUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class KukgohServiceImpl implements KukgohService {

    @Autowired
    private KukgohRepository kukgohRepository;

    @Autowired
    private G20Repository g20Repository;


    @Override
    public List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params) {
        return kukgohRepository.getCmmnCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params) {
        return kukgohRepository.getCmmnCodeDetailList(params);
    }

    @Override
    public void setCommCodeObject(Map<String, Object> params) {

        kukgohRepository.delCommCodeObject(params);
        kukgohRepository.insCommCodeObject(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppList(Map<String, Object> params) {
        return kukgohRepository.getPayAppList(params);
    }

    @Override
    public List<Map<String, Object>> getBudgetGroupList(Map<String, Object> params) {
        List<Map<String, Object>> list = g20Repository.getBudgetGroupList(params);

        for(Map<String, Object> item : list){
            Map<String, Object> map = kukgohRepository.getEnaraBudgetCdData(item);
            item.put("ASSTN_EXPITM_TAXITM_CODE", "");
            item.put("ASSTN_EXPITM_NM", "");
            item.put("ASSTN_TAXITM_NM", "");
            item.put("BG_SN", "");

            if(map != null){
                item.put("ASSTN_EXPITM_TAXITM_CODE", map.get("ASSTN_EXPITM_TAXITM_CODE"));
                item.put("ASSTN_EXPITM_NM", map.get("ASSTN_EXPITM_NM"));
                item.put("ASSTN_TAXITM_NM", map.get("ASSTN_TAXITM_NM"));
                item.put("BG_SN", map.get("BG_SN"));

            }
        }

        return list;
    }

    @Override
    public List<Map<String, Object>> getEnaraBudgetCdList(Map<String, Object> params) {
        return kukgohRepository.getEnaraBudgetCdList(params);
    }

    @Override
    public void setEnaraBudgetCode(Map<String, Object> params) {

        kukgohRepository.delEnaraBudgetCode(params);
        kukgohRepository.insEnaraBudgetCode(params);
    }

    @Override
    public void delBudgetCodeMatch(Map<String, Object> params) {

        kukgohRepository.delBudgetCodeMatch(params);
    }

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return kukgohRepository.getProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getEnaraPjtList(Map<String, Object> params) {
        return kukgohRepository.getEnaraPjtList(params);
    }

    @Override
    public void setEnaraProject(Map<String, Object> params) {

        Map<String, Object> map = kukgohRepository.getEnaraPjtData(params);
        map.put("PJT_SN", params.get("pjtSn"));

        kukgohRepository.insEnaraProject(map);
    }

    @Override
    public Map<String, Object> getExecutionInfo(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();

        Map<String, Object> payAppData = kukgohRepository.getPayAppDataByPayAppDetSn(params);
        result.put("payAppData", payAppData);

        Map<String, Object> crmData = new HashMap<>();
        if(!"".equals(payAppData.get("TR_CD").toString()) && payAppData.containsKey("TR_CD")){
            crmData = g20Repository.getTradeInfo(payAppData);
            result.put("crmData", crmData);
        }

        Map<String, Object> enaraBankInfo = kukgohRepository.getEnaraBankInfoByPayAppData(payAppData);
        result.put("enaraBankInfo", enaraBankInfo);

        Map<String, Object> enaraBgtData = kukgohRepository.getEnaraBgtDataByPayAppData(payAppData);
        result.put("enaraBgtData", enaraBgtData);

        Map<String, Object> projectInfo = kukgohRepository.getProjectDataByPayAppDetSn(payAppData);
        result.put("projectInfo", projectInfo);

        Map<String, Object> enaraExcData = kukgohRepository.getEnaraExcDataByEnaraProjectData(projectInfo);
        result.put("enaraExcData", enaraExcData);

        return result;
    }

    @Override
    public List<Map<String, Object>> getEnaraBankList(Map<String, Object> params) {
        return kukgohRepository.getEnaraBankList(params);
    }

    @Override
    public void sendEnara(Map<String, Object> params) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String formattedDate = LocalDateTime.now().format(formatter);

        System.out.println(params);
        params.put("CNTC_JOB_PROCESS_CODE", "C");
        params.put("INTRFC_ID", "IF-EXE-EFR-0074");
        params.put("TRANSFR_ACNUT_SE_CODE", String.format("%03d", Integer.parseInt(params.get("TRANSFR_ACNUT_SE_CODE").toString())));
        params.put("SBSACNT_TRFRSN_CODE", String.format("%03d", Integer.parseInt(params.get("SBSACNT_TRFRSN_CODE").toString())));
        params.put("CNTC_CREAT_DT", formattedDate);
        params.put("CNTC_TRGET_SYS_CODE", "CTIC");

        String trnscId = getTransactionId();
        params.put("TRNSC_ID", trnscId);

        long timestamp = Instant.now().toEpochMilli();

        params.put("EXCUT_CNTC_ID", "CTIC" + String.format("%016d", timestamp));
        params.put("EXCUT_TAXITM_CNTC_ID", "CTIC" + String.format("%016d", timestamp));
        params.put("TAXITM_FNRSC_CNT", "1");
        params.put("EXCUT_REQUST_DE", params.get("EXCUT_REQUST_DE").toString().replaceAll("-", ""));
        params.put("SPLPC", params.get("EXCUT_SPLPC").toString().replaceAll(",", ""));
        params.put("VAT", params.get("EXCUT_VAT").toString().replaceAll(",", ""));
        params.put("SUM_AMOUNT", params.get("EXCUT_SUM_AMOUNT").toString().replaceAll(",", ""));

        kukgohRepository.insExcutRequstErp(params);
        kukgohRepository.insExcutExpItmErp(params);
        kukgohRepository.insExcutFnrscErp(params);

        makeCSVFile(params);
//        kukgohRepository.sendEnara(params);
    }

    public String getTransactionId(){
        String mangGubunCode = "E"; // I : 행정망, E : 인터넷망
        String systemCode = "CTI"; // 시스템 코드중 앞 3자리 CTIC

        String agentNumber = "01"; // Agent 일련번호
        String intrfcId = "IF-EXE-EFR-0074";
        String threadNumber = "T00001";

        long timestamp = Instant.now().toEpochMilli();

        String timeStampNow = String.format("%013d", timestamp);

        String trnscId = mangGubunCode + systemCode + agentNumber + "_" + intrfcId + "_" + threadNumber;

        return trnscId;
    }

    private String makeCSVFile(Map<String, Object> params) {
        String fileName = "";
        String filepath = "/home/upload/kukgoh";

        try {
            if (directoryConfirmAndMake(filepath)) { // 로컬경로 폴더 없으면 생성 ( 로컬에 csv파일 생성 로직 )
                fileName = filepath + "/" + params.get("TRNSC_ID") + "-data.csv";
                BufferedWriter fw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "EUC-KR"));
                Map<String, Object> map2 = new HashMap<String, Object>();
                int i = 0;

                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_REQUST_ERP]\"");
                fw.newLine();

                List<Map<String, Object>> execRequestCsvList = kukgohRepository.getExecRequestCsvList(params);

                int cnt = 0;
                for (Map<String, Object> dom : execRequestCsvList) {
                    if (cnt == 0) {

                        for (int j = 0; j < (CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP.length) ; j++) {

                            fw.write("\"" + (String) CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP[j].toString() + "\"");
                            if (!(j == (CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP.length - 1))) {
                                fw.write(",");
                            }
                        }
                        fw.newLine();
                    }

                    for (int j = 0; j < (dom.size()); j++) {
                        fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP[j]).toString() + "\"");
                        if (!(j == (dom.size() - 1))) {
                            fw.write(",");
                        }
                    }

                    cnt++;
                    fw.newLine();
                }

                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_EXPITM_ERP]\"");
                fw.newLine();

                List<Map<String, Object>> execBimokCsvList = kukgohRepository.getExecBimokCsvList(params);

                cnt = 0;
                for (Map<String, Object> dom : execBimokCsvList) {

                    if (cnt == 0) {
                        for (int j = 0; j < (CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP.length) ; j++) {
                            fw.write("\"" + (String) CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP[j].toString() + "\"");
                            if (!(j == (CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP.length - 1))) {
                                fw.write(",");
                            }
                        }
                        fw.newLine();


                    }
                    for (int j = 0; j < (dom.size()); j++) {
                        fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP[j]).toString() + "\"");
                        if (!(j == (dom.size() - 1))) {
                            fw.write(",");
                        }
                    }

                    cnt++;
                    fw.newLine();
                }

                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_FNRSC_ERP]\"");
                fw.newLine();

                List<Map<String, Object>> execBimokDataCsvList = kukgohRepository.getExecBimokDataCsvList(params);
                cnt = 0;
                for (Map<String, Object> dom : execBimokDataCsvList) {

                    if (cnt == 0) {
                        for (int j = 0; j < (CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP.length); j++) {
                            fw.write("\"" + (String) CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP[j].toString() + "\"");
                            if (!(j == (CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP.length - 1))) {
                                fw.write(",");
                            }
                        }

                        fw.newLine();

                    }

                    for (int j = 0; j < (dom.size()); j++) {
                        fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP[j]).toString() + "\"");
                        if (!(j == (dom.size() - 1))) {
                            fw.write(",");
                        }
                    }

                    cnt++;
                    fw.newLine();
                }

                fw.flush();
                fw.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileName;
    }


    public boolean directoryConfirmAndMake(String targetDir) {
        boolean result = true;
        File d = new File(targetDir);
        if (!d.isDirectory()) {
            if (!d.mkdirs()) {
                System.out.println("생성 실패");
                result = false;
            }
        }
        return result;
    }

}
