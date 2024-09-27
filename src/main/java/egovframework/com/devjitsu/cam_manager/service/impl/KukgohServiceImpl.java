package egovframework.com.devjitsu.cam_manager.service.impl;


import com.jcraft.jsch.*;
import egovframework.com.devjitsu.cam_manager.repository.KukgohRepository;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.devjitsu.common.utiles.CSVKeyUtil;
import egovframework.devjitsu.common.utiles.EsbUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpVersion;
import org.apache.commons.httpclient.methods.PostMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    @Autowired
    private PayAppRepository payAppRepository;


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
    public void setEnaraSendExcept(Map<String, Object> params) {
        kukgohRepository.setEnaraSendExcept(params);
    }

    @Override
    public void setEnaraMngStat(Map<String, Object> params) {
        kukgohRepository.setEnaraMngStat(params);
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

        list.sort(
            Comparator.comparing(m -> m.get("BGT_CD") != null ? Integer.parseInt((String)m.get("BGT_CD")) : null,
                Comparator.nullsLast(Integer::compareTo)
            )
        );

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
    public void delEnaraProject(Map<String, Object> params) {

        kukgohRepository.delEnaraProject(params);
    }

    @Override
    public Map<String, Object> getExecutionInfo(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();

        Map<String, Object> payAppData = kukgohRepository.getPayAppDataByPayAppDetSn(params);
        result.put("payAppData", payAppData);


        String[] fileNoAr = new String[1];

        if(payAppData.containsKey("FILE_NO") && payAppData.get("FILE_NO") != null)
            fileNoAr[0] = payAppData.get("FILE_NO").toString();

        params.put("fileNoAr", fileNoAr);

        params.put("payAppSn", payAppData.get("PAY_APP_SN"));
        List<Map<String,Object>> fileList = payAppRepository.getPayAppFileList(params);
        result.put("fileList", fileList);

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

        Map<String, Object> enaraSendData = new HashMap<>();
        if(!params.get("sendType").equals("C")){
            enaraSendData = kukgohRepository.getErpReqData(params);
        } else {
            enaraSendData = kukgohRepository.getErpTaxReqData(params);
        }
        result.put("enaraSendData", enaraSendData);

        if(enaraSendData != null){
            Map<String, Object> excutReqErpData = kukgohRepository.getExcutRequestErp(enaraSendData);
            result.put("excutReqErpData", excutReqErpData);

            Map<String, Object> excutExpItmErpData =kukgohRepository.getExcutExpItmErp(enaraSendData);
            result.put("excutExpItmErpData", excutExpItmErpData);

            Map<String, Object> excutFnrscErpData = kukgohRepository.getExcutFnrscErp(enaraSendData);
            result.put("excutFnrscErpData", excutFnrscErpData);

            Map<String, Object> erpSendData = kukgohRepository.getErpSend(enaraSendData);
            result.put("erpSendData", erpSendData);

            if(excutReqErpData != null){
                Map<String, Object> enaraTempData = kukgohRepository.getEranaTemp(excutReqErpData);
                result.put("enaraTempData", enaraTempData);
            }
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getExecutionInfoList(Map<String, Object> params) {
        List<Map<String, Object>> result = new ArrayList<>();
        String[] payAppDetSnArr = params.get("payAppDetSnArr").toString().split(",");
        for(String payAppDetSn : payAppDetSnArr){
            params.put("payAppDetSn", payAppDetSn);
            Map<String, Object> executionInfo = getExecutionInfo(params);
            executionInfo.put("payAppDetSn", payAppDetSn);
            result.add(executionInfo);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getEnaraBankList(Map<String, Object> params) {
        return kukgohRepository.getEnaraBankList(params);
    }

    @Override
    public Map<String, Object> sendEnara(Map<String, Object> params) {

        if(params.containsKey("reqStatSn") && params.get("reqStatSn") != null && !"".equals(params.get("reqStatSn").toString())) {
            Map<String, Object> reqStatData = new HashMap<>();

            if(!params.get("sendType").equals("C")){
                reqStatData = kukgohRepository.getReqStatData(params);
                kukgohRepository.delEnaraData(params);
            } else {
                reqStatData = kukgohRepository.getTaxReqStatData(params);
                kukgohRepository.delEnaraTaxReq(params);
            }

            kukgohRepository.delExcutRequstErp(reqStatData);
            kukgohRepository.delExcutExpItmErp(reqStatData);
            kukgohRepository.delExcutFnrscErp(reqStatData);

            kukgohRepository.delIntrfcFile(reqStatData);

            reqStatData.put("INTRFC_ID", params.get("INTRFC_ID"));
//            SFTPFileRemove(reqStatData);

        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String formattedDate = LocalDateTime.now().format(formatter);

        System.out.println(params);
        params.put("REQ_ISS", "E-CrossAgent 전송 성공");
        params.put("REQ_STAT", "Y");
        params.put("CNTC_JOB_PROCESS_CODE", "C");
        params.put("INTRFC_ID", "IF-EXE-EFR-0074");
        params.put("TRANSFR_ACNUT_SE_CODE", String.format("%03d", Integer.parseInt(params.get("TRANSFR_ACNUT_SE_CODE").toString())));
        params.put("SBSACNT_TRFRSN_CODE", String.format("%03d", Integer.parseInt(params.get("SBSACNT_TRFRSN_CODE").toString())));
        params.put("CNTC_CREAT_DT", formattedDate);
        params.put("CNTC_TRGET_SYS_CODE", "CTIC");

        params.put("ASSTN_TAXITM_CODE", params.get("ASSTN_TAXITM_CODE"));

        String trnscId = getTransactionId(params.get("INTRFC_ID").toString());
        params.put("TRNSC_ID", trnscId);

        long timestamp = Instant.now().toEpochMilli();

        params.put("EXCUT_CNTC_ID", "CTIC" + String.format("%016d", timestamp));
        params.put("EXCUT_TAXITM_CNTC_ID", "CTIC" + String.format("%016d", timestamp));
        params.put("TAXITM_FNRSC_CNT", "1");
        params.put("EXCUT_REQUST_DE", params.get("EXCUT_REQUST_DE").toString().replaceAll("-", ""));
        params.put("SPLPC", params.get("EXCUT_SPLPC").toString().replaceAll(",", ""));
        params.put("VAT", params.get("EXCUT_VAT").toString().replaceAll(",", ""));
        params.put("SUM_AMOUNT", params.get("EXCUT_SUM_AMOUNT").toString().replaceAll(",", ""));
        params.put("FILE_ID", "FILE_" + params.get("CNTC_CREAT_DT"));

        kukgohRepository.insExcutRequstErp(params);
        kukgohRepository.insExcutExpItmErp(params);
        kukgohRepository.insExcutFnrscErp(params);

        // T_IFR_EXCUT_REQUST_ERP PK DJ_PAY_APP_DET에 저장
        kukgohRepository.setRequestKeyPayAppDet(params);

        Map<String, Object> payAppData = kukgohRepository.getPayAppDataByPayAppDetSn(params);

        String[] fileNoAr = new String[1];

        if(payAppData.containsKey("FILE_NO") && payAppData.get("FILE_NO") != null)
            fileNoAr[0] = payAppData.get("FILE_NO").toString();

        params.put("fileNoAr", fileNoAr);

        params.put("payAppSn", payAppData.get("PAY_APP_SN"));
        List<Map<String,Object>> fileList = payAppRepository.getPayAppFileList(params);

        int fileCnt = 1;

        for(Map<String, Object> fileMap : fileList){
            fileMap.put("INTRFC_ID", params.get("INTRFC_ID"));
            fileMap.put("TRNSC_ID", params.get("TRNSC_ID"));
            fileMap.put("FILE_SN", fileCnt);
            fileMap.put("FILE_ID", params.get("FILE_ID"));
            fileMap.put("CNTC_ORG_FILE_NM",  fileMap.get("FILE_ID") + "_" + fileMap.get("file_org_name").toString().replaceAll("'", "") + "." + fileMap.get("file_ext").toString());
            fileMap.put("CNTC_FILE_NM", params.get("TRNSC_ID") + "-" + fileMap.get("CNTC_ORG_FILE_NM").toString());

            fileMap.put("CNTC_CREAT_DT", params.get("CNTC_CREAT_DT"));

            fileCp(fileMap);
            kukgohRepository.insIntrfcFile(fileMap);
            fileCnt++;
        }

        params.put("fileList", fileList);

        Map<String, Object> csvMap = makeCSVFile(params);

        if(csvMap.containsKey("REQ_ISS") && csvMap.get("REQ_ISS") != null){
            params.put("REQ_ISS", csvMap.get("REQ_ISS").toString());
            params.put("REQ_STAT", csvMap.get("REQ_STAT").toString());
        }

        Map<String, Object> csvAttachMap = makeCSVAttachFile(params);

        if(csvAttachMap.containsKey("REQ_ISS") && csvAttachMap.get("REQ_ISS") != null){
            params.put("REQ_ISS", csvAttachMap.get("REQ_ISS").toString());
            params.put("REQ_STAT", csvAttachMap.get("REQ_STAT").toString());
        }

        if(params.get("REQ_STAT") != "N" || !"N".equals(params.get("REQ_STAT"))){
            try {
                File myFile = new File("/fs_data/kukgoh/" + params.get("INTRFC_ID") + "/" + params.get("TRNSC_ID") + "/" + params.get("TRNSC_ID") + ".eof");
                if (myFile.createNewFile()){
                    System.out.println("File is created!");
                }else{
                    System.out.println("File already exists.");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            String message = SFTPFileMove(params, csvMap.get("fileName").toString(), csvAttachMap.get("fileName").toString());

            if(message != ""){
                params.put("REQ_ISS", message);
                params.put("REQ_STAT", "N");
            }
        }

        if(!params.get("sendType").equals("C")){
            kukgohRepository.insEnaraData(params);
        } else {
            kukgohRepository.insEnaraTaxReq(params);
        }
        kukgohRepository.insEnaraSendTemp(params);

        return params;
    }

    public List<Map<String, Object>> getEnaraTempList() {
        return kukgohRepository.getEnaraTempList();
    }

    private void fileCp(Map<String, Object> fileMap) {
        directoryConfirmAndMake("/fs_data/kukgoh/" + fileMap.get("INTRFC_ID") + "/" + fileMap.get("TRNSC_ID") + "/attach/");

        Path source = Paths.get("/home" + fileMap.get("file_path").toString().replaceAll("http://218.158.231.184", "") + "/" + fileMap.get("file_uuid").toString());
        Path destination = Paths.get("/fs_data/kukgoh/" + fileMap.get("INTRFC_ID") + "/" + fileMap.get("TRNSC_ID") + "/attach/" + fileMap.get("CNTC_FILE_NM").toString());

        try {
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied successfully");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error occurred while copying file: " + e.getMessage());
        }
    }

    private String SFTPFileRemove(Map<String, Object> params) {
        String message = "";

        String remoteHost = "218.158.231.92";
        int remotePort =20022;
        String username = "root";
        String password = "Camtic13!#";
        String toDirectory = "/home/hk/mtDir/snd/" + params.get("INTRFC_ID") + "/";

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, remoteHost, remotePort);
            session.setConfig("StrictHostKeyChecking", "no");
            session.setPassword(password);
            session.connect();

            ChannelExec channel = (ChannelExec) session.openChannel("exec");

            channel.setCommand("rm -rf " + toDirectory + params.get("TRNSC_ID"));
            channel.setErrStream(System.err);

            // Execute the command
            channel.connect();

            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
            message = "SFTP file remove failed.";
        }

        return message;
    }

    private String SFTPFileMove(Map<String, Object> params, String csvFile, String csvAttachFile) {
        String message = "";

        String remoteHost = "218.158.231.92";
        int remotePort =20022;
        String username = "root";
        String password = "Camtic13!#";
        String fromDirectory = "/fs_data/kukgoh/" + params.get("INTRFC_ID") + "/" + params.get("TRNSC_ID");
        String toDirectory = "/home/hk/mtDir/snd/" + params.get("INTRFC_ID") + "/";

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, remoteHost, remotePort);
            session.setConfig("StrictHostKeyChecking", "no");
            session.setPassword(password);
            session.connect();

            ChannelExec channel = (ChannelExec) session.openChannel("exec");

            String command = "cp -r " + fromDirectory + " " + toDirectory;
            String command2 = "chmod -R 777 " + toDirectory + "/*";
            channel.setCommand(command + ";" + command2);

            channel.setErrStream(System.err);
            // Execute the command
            channel.connect();

            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
            message = "SFTP file movement failed.";
        }

        return message;
    }

    private Map<String, Object> makeCSVAttachFile(Map<String, Object> params) {
        String fileName = "";
        String filepath = "/fs_data/kukgoh/" + params.get("INTRFC_ID") + "/" + params.get("TRNSC_ID");

        Map<String, Object> map = new HashMap<>();

        try {
            if (directoryConfirmAndMake(filepath)) { // 로컬경로 폴더 없으면 생성 ( 로컬에 csv파일 생성 로직 )
                fileName = filepath + "/" + params.get("TRNSC_ID") + "-attach.csv";
                BufferedWriter fw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "EUC-KR"));
                Map<String, Object> map2 = new HashMap<String, Object>();
                int i = 0;

                fw.write("\"[TABLE_NAME: T_IF_INTRFC_FILE ]\"");
                fw.newLine();

                List<Map<String, Object>> intrfcFileList = kukgohRepository.getIntrfcFileList(params);

                int cnt = 0;
                for (Map<String, Object> dom : intrfcFileList) {
                    if (cnt == 0) {

                        for (int j = 0; j < (CSVKeyUtil.T_IF_INTRFC_FILE.length) ; j++) {

                            fw.write("\"" + (String) CSVKeyUtil.T_IF_INTRFC_FILE[j].toString() + "\"");
                            if (!(j == (CSVKeyUtil.T_IF_INTRFC_FILE.length - 1))) {
                                fw.write(",");
                            }
                        }
                        fw.newLine();
                    }

                    for (int j = 0; j < (dom.size()); j++) {
                        fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IF_INTRFC_FILE[j]).toString() + "\"");
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
            map.put("REQ_ISS", "csv file(attach) creation error.");
            map.put("REQ_STAT", "N");
        }

        map.put("fileName", fileName);
        map.put("REQ_STAT", "Y");

        return map;
    }

    public String getTransactionId(String interfaceId){
        String mangGubunCode = "E"; // I : 행정망, E : 인터넷망
        String systemCode = "CTI"; // 시스템 코드중 앞 3자리 CTIC

        String agentNumber = "01"; // Agent 일련번호
        String intrfcId = interfaceId;
        String threadNumber = "T00001";

        long timestamp = Instant.now().toEpochMilli();

        String timeStampNow = String.format("%013d", timestamp);

        String trnscId = mangGubunCode + systemCode + agentNumber + "_" + intrfcId + "_" + threadNumber + "_" + timeStampNow;

        return trnscId;
    }

    private Map<String, Object> makeCSVFile(Map<String, Object> params) {
        String fileName = "";
        String filepath = "/fs_data/kukgoh/" + params.get("INTRFC_ID") + "/" + params.get("TRNSC_ID");
        Map<String, Object> map = new HashMap<>();
        try {
            if (directoryConfirmAndMake(filepath)) { // 로컬경로 폴더 없으면 생성 ( 로컬에 csv파일 생성 로직 )
                fileName = filepath + "/" + params.get("TRNSC_ID") + "-data.csv";
                BufferedWriter fw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "EUC-KR"));
                Map<String, Object> map2 = new HashMap<String, Object>();
                int i = 0;

                fw.write("\"[TABLE_NAME: T_IFR_EXCUT_REQUST_ERP ]\"");
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

                fw.write("\"[TABLE_NAME: T_IFR_EXCUT_EXPITM_ERP ]\"");
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

                fw.write("\"[TABLE_NAME: T_IFR_EXCUT_FNRSC_ERP ]\"");
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
            map.put("REQ_ISS", "csv file creation error.");
            map.put("REQ_STAT", "N");

        }

        map.put("REQ_STAT", "Y");
        map.put("fileName", fileName);
        return map;
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

    @Override
    public void insDjErpSend(Map<String, Object> resutMap) {
        kukgohRepository.insDjErpSend(resutMap);
    }

    @Override
    public void delErpSendTrscId(Map<String, Object> resutMap) {
        kukgohRepository.delErpSendTrscId(resutMap);
    }

    @Override
    public Map<String, Object> getErpSendTrscId(Map<String, Object> resutMap) {
        return kukgohRepository.getErpSendTrscId(resutMap);
    }

    @Override
    public Map<String, Object> getEtaxInfo(Map<String, Object> params) {
        return kukgohRepository.getEtaxInfo(params);
    }

    @Override
    public Map<String, Object> sendEtaxData(Map<String, Object> params) {
        Map<String, Object> parameters = new HashMap<>();

        parameters.put("CNTC_JOB_PROCESS_CODE", "C");
        parameters.put("INTRFC_ID", "IF-EXE-EFR-0071");
        parameters.put("TRNSC_ID", getTransactionId("IF-EXE-EFR-0071"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String formattedDate = LocalDateTime.now().format(formatter);
        parameters.put("CNTC_CREAT_DT", formattedDate);
        parameters.put("CNTC_TRGET_SYS_CODE", "CTIC");
        parameters.put("BSNSYEAR", params.get("BSNSYEAR"));
        parameters.put("DDTLBZ_ID", params.get("DDTLBZ_ID"));
        parameters.put("EXC_INSTT_ID", params.get("EXC_INSTT_ID"));
        parameters.put("ETXBL_CONFM_NO", params.get("issNo"));
        parameters.put("payAppDetSn", params.get("payAppDetSn"));

        kukgohRepository.insEtaxData(parameters);
        kukgohRepository.insEnaraSendTemp(parameters);

        String fileName = makeEtaxCsvFile(parameters);

        try {
            File myFile = new File("/fs_data/kukgoh/" + parameters.get("INTRFC_ID") + "/" + parameters.get("TRNSC_ID") + "/" + parameters.get("TRNSC_ID") + ".eof");
            if (myFile.createNewFile()){
                System.out.println("File is created!");
            }else{
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }


        SFTPFileMove(parameters, fileName, "");
        return parameters;
    }

    @Override
    public Map<String, Object> sendResultEtaxData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> reqEtxblData = kukgohRepository.sendResultEtaxData(params);

        if(reqEtxblData == null){
            result.put("msg", "전송가능");
            result.put("etaxStat", "Y");
        } else {
            Map<String, Object> resEtxblData = kukgohRepository.getResEtsblData(params);

            if(resEtxblData == null){
                result.put("msg", "전송진행중");
                result.put("etaxStat", "Y");
            } else {
                if(resEtxblData.get("PROCESS_RESULT_CODE").equals("000")){
                    result.put("msg", "정상");
                    result.put("etaxStat", "N");
                } else {
                    result.put("msg", "전송실패");
                    result.put("etaxStat", "Y");
                }
            }
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getInterfaceList(Map<String, Object> params) {
        return kukgohRepository.getInterfaceList(params);
    }

    @Override
    public List<Map<String, Object>> getCardPuchasRecptnList(Map<String, Object> params) {
        return kukgohRepository.getCardPuchasRecptnList(params);
    }

    /**
     * 전자세금계산서 CSV 파일 생성
     * @param params
     */
    private String makeEtaxCsvFile(Map<String, Object> params) {
        String fileName = "";
        String filepath = "/fs_data/kukgoh/" + params.get("INTRFC_ID") + "/" + params.get("TRNSC_ID");

        Map<String, Object> map = new HashMap<>();

        try {
            if (directoryConfirmAndMake(filepath)) { // 로컬경로 폴더 없으면 생성 ( 로컬에 csv파일 생성 로직 )
                fileName = filepath + "/" + params.get("TRNSC_ID") + "-data.csv";
                BufferedWriter fw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "EUC-KR"));
                Map<String, Object> map2 = new HashMap<String, Object>();
                int i = 0;

                fw.write("\"[TABLE_NAME: T_IFR_ETXBL_REQUST_ERP ]\"");
                fw.newLine();

                List<Map<String, Object>> etaxList = kukgohRepository.getEtaxList(params);

                int cnt = 0;
                for (Map<String, Object> dom : etaxList) {
                    if (cnt == 0) {

                        for (int j = 0; j < (CSVKeyUtil.T_IFR_ETXBL_REQUEST_ERP.length) ; j++) {

                            fw.write("\"" + (String) CSVKeyUtil.T_IFR_ETXBL_REQUEST_ERP[j].toString() + "\"");
                            if (!(j == (CSVKeyUtil.T_IFR_ETXBL_REQUEST_ERP.length - 1))) {
                                fw.write(",");
                            }
                        }
                        fw.newLine();
                    }

                    for (int j = 0; j < (dom.size()); j++) {
                        fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_ETXBL_REQUEST_ERP[j]).toString() + "\"");
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

    public void EnaraCall(Map<String, Object> params) {
        HttpClient httpClient = new HttpClient();

        try {
            int wasNum = 1;
            String systemCode = "CTIC";
            String interfaceId = params.get("INTRFC_ID").toString();

            // 개발 포트 45000, 운영 포트 41000
            String url = "http://218.158.231.92:41000/esb/HttpListenerServlet";

            int timeout = 0;

            // 송신 메시지 생성
            Map<String, Object> dataStream = makeMessage(interfaceId, systemCode, wasNum, params);
            String dataStreamStr = EsbUtils.map2Json(dataStream);
            String result = call(url, timeout, dataStreamStr, httpClient);
            System.out.println("result: " + result);

            if(result != null && !"".equals(result)){
                Map<String, Object> resutMap = EsbUtils.json2Map(result);
                // log
                System.out.println("result data: " + resutMap);
                resutMap.put("excutCntcId", params.get("EXCUT_CNTC_ID"));

                Map<String, Object> tempMap = kukgohRepository.getErpSendTrscId(resutMap);
                System.out.println("tempMap : " + tempMap);
                System.out.println("params : " + params);
                if(tempMap != null){
                    kukgohRepository.delErpSendTrscId(tempMap);
                }
//
                kukgohRepository.insDjErpSend(resutMap);
                if ("SUCC".equals(resutMap.get("rspCd"))) { // 연계 성공
                    // 연계 성공시 실행할 로직 작성
                } else { // 연계 실패공공/민간기관 ERP 연계 개발가이드
                    // 실패 업무 로직 추가
                }

                kukgohRepository.delEnaraTempData(params);
            }
        } catch(ConnectException e){
            System.out.println("Connection ERROR : " + e.getMessage());
        } catch (SocketTimeoutException e){
            System.out.println("SocketTimeout ERROR : " + e.getMessage());
        } catch (Exception e){
            System.out.println("ERROR : " + e.getMessage());
        }
    }

    private String call(String url, int timeout, String dataStream, HttpClient httpClient) throws Exception {
        String result = "";
        PostMethod post = null;


        try{
            post = new PostMethod(url);
            post.getParams().setParameter("http.protocol.version", HttpVersion.HTTP_1_1);
            post.getParams().setParameter("http.protocol.content-charset", "UTF-8");
            post.getParams().setParameter("http.socket.timeout", timeout);
            post.addParameter("dataStream", dataStream);
            int status = httpClient.executeMethod(post);
            if (status == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(post.getResponseBodyAsStream(), post.getResponseCharSet()));
                StringBuffer response = new StringBuffer();
                String line = "";
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                result = response.toString();
                reader.close();
            } else {
                // http 호출 실패
                System.out.println("http status code = " + status);
            }
        } catch (Exception e){
            throw e;
        } finally {
            try{
                post.releaseConnection();
            } catch (Exception e){

                throw e;
            }
        }

        return result;
    }

    private Map<String, Object> makeMessage(String interfaceId, String systemCode, int wasNum, Map<String, Object> params) {
        Map<String, Object> dataStream = new HashMap<String, Object>();

        dataStream.put("intfId", interfaceId);
        dataStream.put("intfTrscId", params.get("TRNSC_ID"));

        return dataStream;
    }
}
