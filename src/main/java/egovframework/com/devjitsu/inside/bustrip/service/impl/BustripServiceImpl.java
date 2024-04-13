package egovframework.com.devjitsu.inside.bustrip.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
import egovframework.com.devjitsu.inside.code.repository.InsideCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BustripServiceImpl implements BustripService {

    @Autowired
    private BustripRepository bustripRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private PayAppRepository payAppRepository;

    @Autowired
    private InsideCodeRepository insideCodeRepository;

    @Override
    public List<Map<String, Object>> getBustripList(Map<String, Object> params) {
        return bustripRepository.getBustripList(params);
    }

    @Override
    public void setBustripReq(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        Gson gson = new Gson();
        List<Map<String, Object>> externalArr = gson.fromJson((String) params.get("externalArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(params.containsKey("hrBizReqId")){
            bustripRepository.updBustripReq(params);
            bustripRepository.delBustripCompanion(params);

            bustripRepository.delBustripExternal(params);
        } else {
            bustripRepository.insBustripReq(params);
        }

        String compEmpSeq = "";
        String[] compEmpSeqArr;
        if(params.get("compEmpSeq") != null && !params.get("compEmpSeq").equals("")){
            compEmpSeq = params.get("compEmpSeq").toString();

            compEmpSeqArr = compEmpSeq.split(",");

            for(String str : compEmpSeqArr){
                params.put("compEmpSeq", str);
                params.put("empSeq", params.get("compEmpSeq"));
                Map<String, Object> map = userRepository.getUserInfo(params);
                params.put("compEmpName", map.get("EMP_NAME_KR"));
                params.put("compDeptName", map.get("DEPT_NAME"));
                params.put("compDeptSeq", map.get("DEPT_SEQ"));
                params.put("compDutyName", map.get("DUTY_NAME"));
                params.put("compPositionName", map.get("POSITION_NAME"));

                bustripRepository.insBustripCompanion(params);
            }
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("hrBizReqId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        for(Map<String, Object> extMap : externalArr){
            extMap.put("hrBizReqId", params.get("hrBizReqId"));
            bustripRepository.insBustripExternal(extMap);
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public Map<String, Object> getBustripReqInfo(Map<String, Object> params) {
        params.put("fileCd", "bustripReq");
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> infoMap = bustripRepository.getBustripReqInfo(params);
        result.put("rs", infoMap);
        result.put("list", bustripRepository.getBustripCompanionInfo(params));
        result.put("resList", bustripRepository.getBustripResCompanionInfo(params));
        result.put("map", bustripRepository.getBustripExnpInfo(params));
        result.put("rsRes", bustripRepository.getBustripResultInfo(params));
        result.put("fileInfo", bustripRepository.getBustripReqFileInfoR(params));        // 출장신청서 첨부파일
        result.put("fileInfo2", bustripRepository.getAbroadBustripReqFileInfo(params)); // 해외출장 사전정산 첨부파일
        result.put("fileInfo3", ""); // 오류방지
        result.put("extData", bustripRepository.getExtData(params));

        return result;
    }

    @Override
    public List<Map<String, Object>> getExtData(Map<String, Object> params) {
        return bustripRepository.getExtData(params);
    }

    @Override
    public Map<String, Object> getBustripResReqInfo(Map<String, Object> params) {
        params.put("fileCd", "bustripResReq");
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> infoMap = bustripRepository.getBustripReqInfo(params);
        result.put("rs", infoMap);
        result.put("list", bustripRepository.getBustripCompanionInfo(params));
        result.put("resList", bustripRepository.getBustripResCompanionInfo(params));
        result.put("map", bustripRepository.getBustripExnpInfo(params));
        result.put("rsRes", bustripRepository.getBustripResultInfo(params));
        result.put("extData", bustripRepository.getExtData(params));

        if(infoMap != null && infoMap.get("DOC_ID") != null){
            params.put("docId", infoMap.get("DOC_ID"));
            params.put("hrBizReqId", infoMap.get("HR_BIZ_REQ_ID"));
            result.put("fileInfo", bustripRepository.getBustripReqFileInfoR(params));       // 출장 결과보고 첨부파일
            result.put("fileInfo2", bustripRepository.getBustripReqFileInfo(params));       // 출장신청서 첨부파일
            result.put("fileInfo3", bustripRepository.getAbroadBustripReqFileInfo(params)); // 해외출장 사전정산 첨부파일
            result.put("fileInfo4", "");    // 출장신청서 상신 첨부파일
        } else {
            Map<String, Object> bustripId = bustripRepository.getBustripId(params);

            Map<String, Object> map = new HashMap<>();
            map.put("docId", bustripId.get("docId"));
            map.put("hrBizReqId", bustripId.get("hrBizReqId"));
            result.put("fileInfo", "");       // 출장 결과보고 첨부파일
            result.put("fileInfo2", "");       // 출장신청서 첨부파일
            result.put("fileInfo3", bustripRepository.getAbroadBustripReqFileInfo(map)); // 해외출장 사전정산 첨부파일
            result.put("fileInfo4", "");    // 출장신청서 상신 첨부파일
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getBustripReqFileInfo(Map<String, Object> params) {
        return bustripRepository.getBustripReqFileInfo(params);
    }

    @Override
    public List<Map<String, Object>> getBustripReqFileInfoR(Map<String, Object> params) {
        return bustripRepository.getBustripReqFileInfoR(params);
    }

    @Override
    public List<Map<String, Object>> getAbroadBustripReqFileInfo(Map<String, Object> params) {
        return bustripRepository.getAbroadBustripReqFileInfo(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessExnpInfo(Map<String, Object> params) {
        return bustripRepository.getBusinessExnpInfo(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessOverExnpInfo(Map<String, Object> params) {
        return bustripRepository.getBusinessOverExnpInfo(params);
    }

    @Override
    public List<Map<String, Object>> getBustripExnpInfo(Map<String, Object> params) {
        return bustripRepository.getBustripExnpInfo(params);
    }

    @Override
    public List<Map<String, Object>> getExnpFile(Map<String, Object> params) {
        return bustripRepository.getExnpFile(params);
    }

    @Override
    public List<Map<String, Object>> getExnpFileNum(Map<String, Object> params) {
        return bustripRepository.getExnpFileNum(params);
    }
    @Override
    public List<Map<String, Object>> getBustripDocFile(Map<String, Object> params) {
        Map<String, Object> bustripId = bustripRepository.getBustripId(params);

        Map<String, Object> map = new HashMap<>();
        map.put("docId", bustripId.get("docId"));

        List<Map<String, Object>> resultList = bustripRepository.getBustripDocFile(map);

        params.put("hrBizReqId", bustripId.get("hrBizReqId").toString());
        List<Map<String, Object>> resFileList = bustripRepository.getBustripReqFileInfoR(params);  // 출장신청서&출장결과보고 첨부파일

        if(resFileList != null){
            for(Map<String, Object> resFile : resFileList){
                resultList.add(resFile);
            }
        }
        return resultList;
    }

    @Override
    public List<Map<String, Object>> getBustripReqDocFile(Map<String, Object> params) {
        Map<String, Object> bustripInfo = bustripRepository.getBustripReqInfo(params);

        Map<String, Object> map = new HashMap<>();
        map.put("docId", bustripInfo.get("DOC_ID"));

        return bustripRepository.getBustripDocFile(map);
    }

    @Override
    public Map<String, Object> getBustripOne(Map<String, Object> params) {
        return bustripRepository.getBustripResultInfoR(params);
    }

    @Override
    public Map<String, Object> getBusinessOne(Map<String, Object> params) {
        return bustripRepository.getBustripReqInfo(params);
    }

    @Override
    public void delBustripReq(Map<String, Object> params) {
        Map<String, Object> bustripMap = bustripRepository.getBustripReqInfo(params);
        params.put("carReqSn", bustripMap.get("CAR_REQ_SN"));
        insideCodeRepository.setCarRequestDelete(params);

        bustripRepository.delBustripReq(params);
    }

    @Override
    public List<Map<String, Object>> getBustripReqCheck(Map<String, Object> params) {
        return bustripRepository.getBustripReqCheck(params);
    }

    @Override
    public List<Map<String, Object>> getBustripTotInfo(Map<String, Object> params) {
        return bustripRepository.getBustripTotInfo(params);
    }

    @Override
    public List<Map<String, Object>> getBustripResTotInfo(Map<String, Object> params) {
        return bustripRepository.getBustripResTotInfo(params);
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("hrBizReqId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            bustripRepository.updateApprStat(params);
        }else if("20".equals(docSts)) { // 결재
            bustripRepository.updateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            bustripRepository.updateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            bustripRepository.updateFinalApprStat(params);

        }
    }

    @Override
    public void updateResDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("hrBizReqResultId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        Map<String, Object> histMap = bustripRepository.getBustripResultInfoR(params);
        params.put("hrBizReqId", histMap.get("HR_BIZ_REQ_ID").toString());
        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            bustripRepository.updateResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            bustripRepository.updateResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            bustripRepository.updateResFinalApprStat(params);
            crmRepository.insCrmBustHist(histMap);
        }

        if("10".equals(docSts)){
            List<Map<String, Object>> list = bustripRepository.getExnpFileNum(params);
            if(list.size() > 0){
                for(Map<String, Object> data : list){
                    data.put("docId", params.get("docId"));
                    bustripRepository.setBustripFileNum(params);
                }
            }

            List<Map<String, Object>> list2 = bustripRepository.getCardList(params);
            if(list.size() > 0){
                for(int i=0; i<list.size(); i++){
                    if(list.get(i).get("FILE_NO") != null){
                        bustripRepository.setBustripFileNum(list.get(i));
                    }
                }
            }
        }
    }

    @Override
    public void saveBustripResult(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {

        Gson gson = new Gson();
        List<Map<String, Object>> externalArr = gson.fromJson((String) params.get("externalArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        String compEmpSeq = "";
        String[] compEmpSeqArr;

        bustripRepository.delBustripExternal(params);

        if(params.containsKey("hrBizReqResultId")){
            bustripRepository.updBustripResult(params);

            if("Y".equals(params.get("companionChangeCheck"))) {
                if(params.get("compEmpSeq") != null && !params.get("compEmpSeq").equals("")){
                    compEmpSeq = params.get("compEmpSeq").toString();

                    compEmpSeqArr = compEmpSeq.split(",");

                    for(String str : compEmpSeqArr){
                        params.put("compEmpSeq", str);
                        params.put("empSeq", params.get("compEmpSeq"));
                        Map<String, Object> map = userRepository.getUserInfo(params);
                        params.put("compEmpName", map.get("EMP_NAME_KR"));
                        params.put("compDeptName", map.get("DEPT_NAME"));
                        params.put("compDeptSeq", map.get("DEPT_SEQ"));
                        params.put("compDutyName", map.get("DUTY_NAME"));
                        params.put("compPositionName", map.get("POSITION_NAME"));

                        bustripRepository.insBustripResCompanion(params);
                    }
                }
            }

        }else{
            bustripRepository.saveBustripResult(params);

            if("Y".equals(params.get("companionChangeCheck"))) {
                if(params.get("compEmpSeq") != null && !params.get("compEmpSeq").equals("")){
                    compEmpSeq = params.get("compEmpSeq").toString();

                    compEmpSeqArr = compEmpSeq.split(",");

                    for(String str : compEmpSeqArr){
                        params.put("compEmpSeq", str);
                        params.put("empSeq", params.get("compEmpSeq"));
                        Map<String, Object> map = userRepository.getUserInfo(params);
                        params.put("compEmpName", map.get("EMP_NAME_KR"));
                        params.put("compDeptName", map.get("DEPT_NAME"));
                        params.put("compDeptSeq", map.get("DEPT_SEQ"));
                        params.put("compDutyName", map.get("DUTY_NAME"));
                        params.put("compPositionName", map.get("POSITION_NAME"));

                        bustripRepository.insBustripResCompanion(params);
                    }
                }
            }else{
                bustripRepository.updBustripResCompanion(params);
            }
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("hrBizReqResultId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        for(Map<String, Object> extMap : externalArr){
            extMap.put("hrBizReqId", params.get("hrBizReqId"));
            bustripRepository.insBustripExternal(extMap);
        }

    }

    @Override
    public void saveBustripExnpPop(Map<String, Object> params) {
        if(!"upd".equals(params.get("type"))){
            bustripRepository.saveBustripExnpPop(params);
        } else {
            bustripRepository.updateBustripExnpPop(params);
        }
        if(params.containsKey("driverEmpSeq")){
            bustripRepository.updBustripReqDriver(params);
        }
    }

    @Override
    public void saveBustripOverExnpPop(Map<String, Object> params) {
        if(!"upd".equals(params.get("type"))){
            bustripRepository.saveBustripOutExnpPop(params);
        } else {
            bustripRepository.updateBustripOutExnpPop(params);
        }
    }

    @Override
    public void insBustripExnpResult(Map<String, Object> params) {
         bustripRepository.insBustripExnpResult(params);
    }

    @Override
    public Map<String, Object> getBustripMaxDayCost(Map<String, Object> params) {
        return bustripRepository.getBustripMaxDayCost(params);
    }

    @Override
    public List<Map<String, Object>> getBustripCostList(Map<String, Object> params) {
        return bustripRepository.getBustripCostList(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessCostList(Map<String, Object> params) {
        return bustripRepository.getBusinessCostList(params);
    }

    @Override
    public List<Map<String, Object>> nationCodeList(Map<String, Object> params) {
        return bustripRepository.nationCodeList(params);
    }

    @Override
    public List<Map<String, Object>> nationSmCodeList(Map<String, Object> params) {
        return bustripRepository.nationSmCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getNationCode(Map<String, Object> params) {
        return bustripRepository.getNationCode(params);
    }

    @Override
    public Map<String, Object> getNationCodeInfo(Map<String, Object> params) {
        return bustripRepository.getNationCodeInfo(params);
    }

    @Override
    public void setBustripCostInsert(Map<String, Object> params) {
        if(params.containsKey("hrCostInfoSn")){
            bustripRepository.setBustripCostUpdate(params);
        } else {
            bustripRepository.setBustripCostInsert(params);
        }
    }

    @Override
    public void setBusinessCostInsert(Map<String, Object> params) {
        bustripRepository.setBusinessCostInsert(params);
    }

    @Override
    public Map<String, Object> getBusinessCostOne(Map<String, Object> params) {
        return bustripRepository.getBusinessCostOne(params);
    }

    @Override
    public void insNationCode(Map<String, Object> params) {
        bustripRepository.insNationCode(params);
    }

    @Override
    public void setBustripFuelCostInsert(Map<String, Object> params) {
        if(params.containsKey("hrFuelCostInfoSn")){
            bustripRepository.setBustripFuelCostInfoUpdate(params);
        } else {
            bustripRepository.setBustripFuelCostUpdate(params);
            bustripRepository.setBustripFuelCostInsert(params);
        }
    }

    @Override
    public void setFuelCostDelete(Map<String, Object> params) {
        bustripRepository.setFuelCostDelete(params);
    }

    @Override
    public void setExchangeRateUpdate(Map<String, Object> params) {
        bustripRepository.setExchangeRateUpdate(params);
    }

    @Override
    public List<Map<String, Object>> getWaypointCostList(Map<String, Object> params) {
        return bustripRepository.getWaypointCostList(params);
    }

    @Override
    public void setWaypointCostInsert(Map<String, Object> params) {
        if(params.containsKey("hrWaypointInfoSn")){
            bustripRepository.setWaypointCostUpdate(params);
        } else {
            bustripRepository.setWaypointCostInsert(params);
        }
    }

    @Override
    public Map<String, Object> getWaypointCostOne(Map<String, Object> params) {
        return bustripRepository.getWaypointCostOne(params);
    }

    @Override
    public void setWaypointCostDelete(Map<String, Object> params) {
        bustripRepository.setWaypointCostDelete(params);
    }

    @Override
    public void setReqCert(Map<String, Object> params) {
        bustripRepository.setReqCert(params);
    }

    @Override
    public void setBusiCert(Map<String, Object> params) {
        bustripRepository.setBusiCert(params);
    }

    @Override
    public List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params) {
        return bustripRepository.getBustripFuelCostList(params);
    }

    @Override
    public Map<String, Object> getBustripFuelCostOne(Map<String, Object> params) {
        return bustripRepository.getBustripFuelCostOne(params);
    }

    @Override
    public Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params) {
        return bustripRepository.getBustripFuelCostInfo(params);
    }

    @Override
    public Map<String, Object> getRegFuelCost(Map<String, Object> params) {
        return bustripRepository.getRegFuelCost(params);
    }

    @Override
    public Map<String, Object> getExchangeInfo(Map<String, Object> params) {
        return bustripRepository.getExchangeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getPopBustripList(Map<String, Object> params) {
        return bustripRepository.getPopBustripList(params);
    }

    @Override
    public List<Map<String, Object>> getBustripSettleList(Map<String, Object> params) {
        return bustripRepository.getBustripSettleList(params);
    }

    @Override
    public void setExnpFile(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("hrBizReqResultId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getBustripExnpSum(Map<String, Object> params) {
        return bustripRepository.getBustripExnpSum(params);
    }

    @Override
    public void delBustripCost(Map<String, Object> params) {
        bustripRepository.delBustripCost(params);
    }

    @Override
    public List<Map<String, Object>> getProjectBustList(Map<String, Object> params) {
        return bustripRepository.getProjectBustList(params);
    }

    @Override
    public List<Map<String, Object>> getProjectBustMetList(Map<String, Object> params) {
        return bustripRepository.getProjectBustMetList(params);
    }

    @Override
    public void setCardHist(Map<String, Object> params) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("HR_BIZ_REQ_RESULT_ID", params.get("hrBizReqResultId"));

        if(params.containsKey("cardArr")){
            bustripRepository.delCardHist(params);
            payAppRepository.delBustripUseCardInfo(paramMap);

            Gson gson = new Gson();
            List<Map<String, Object>> list = gson.fromJson((String) params.get("cardArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            for(Map<String, Object> data : list){
                data.put("hrBizReqResultId", params.get("hrBizReqResultId"));
                bustripRepository.insCardHist(data);

                // DJ_USE_CARD_INFO INSERT
                if(!"".equals(data.get("authNo")) && !"".equals(data.get("authHh")) && !"".equals(data.get("authDd")) && !"".equals(data.get("cardNo")) && !"".equals(data.get("buySts"))){
                    paramMap.put("AUTH_NO", data.get("authNum"));
                    paramMap.put("AUTH_HH", data.get("authTime"));
                    paramMap.put("AUTH_DD", data.get("authDate"));
                    paramMap.put("CARD_NO", data.get("cardNo"));
                    paramMap.put("BUY_STS", data.get("buySts"));
                    payAppRepository.insUseCardInfo(paramMap);
                }
            }
        }else{
            bustripRepository.delCardHist(params);
            payAppRepository.delBustripUseCardInfo(paramMap);
        }
    }

    @Override
    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return bustripRepository.getCardList(params);
    }

    @Override
    public void setBusiCardHist(Map<String, Object> params) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("HR_BIZ_REQ_ID", params.get("hrBizReqId"));

        if(params.containsKey("cardArr")){
            bustripRepository.delBusiCardHist(params);
            payAppRepository.delBusiUseCardInfo(paramMap);

            Gson gson = new Gson();
            List<Map<String, Object>> list = gson.fromJson((String) params.get("cardArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            for(Map<String, Object> data : list){
                data.put("hrBizReqId", params.get("hrBizReqId"));
                bustripRepository.insCardHist(data);

                // DJ_USE_CARD_INFO INSERT
                if(!"".equals(data.get("authNo")) && !"".equals(data.get("authHh")) && !"".equals(data.get("authDd")) && !"".equals(data.get("cardNo")) && !"".equals(data.get("buySts"))){
                    paramMap.put("AUTH_NO", data.get("authNum"));
                    paramMap.put("AUTH_HH", data.get("authTime"));
                    paramMap.put("AUTH_DD", data.get("authDate"));
                    paramMap.put("CARD_NO", data.get("cardNo"));
                    paramMap.put("BUY_STS", data.get("buySts"));
                    payAppRepository.insUseCardInfo(paramMap);
                }
            }
        }else{
            bustripRepository.delBusiCardHist(params);
            payAppRepository.delBusiUseCardInfo(paramMap);
        }
    }

    @Override
    public List<Map<String, Object>> getPersonalExnpData(Map<String, Object> params) {
        if(params.containsKey("hrBizReqResultId")){
            return bustripRepository.getPersonalExnpData(params);
        }else{
            return bustripRepository.getPersonalBusiExnpData(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCorpExnpData(Map<String, Object> params) {
        return bustripRepository.getCorpExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessOverExnpData(Map<String, Object> params) {
        return bustripRepository.getBusinessOverExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessCorpOverExnpData(Map<String, Object> params) {
        return bustripRepository.getBusinessCorpOverExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpHistFileList(Map<String, Object> params) {
        return bustripRepository.getExnpHistFileList(params);
    }
    @Override
    public Map<String, Object> getExnpHistOne(Map<String, Object> params) {
        Map<String, Object> histMap = bustripRepository.getExnpHistOne(params);

        /*if(histMap.get("FILE_NO") != null){
            histMap.putAll(bustripRepository.getExnpHistFileOne(histMap));
        }*/

        return histMap;
    }

    @Override
    public Map<String, Object> getCorpCarExnpData(Map<String, Object> params) {
        return bustripRepository.getCorpCarExnpData(params);
    }

    @Override
    public void setBustripPdfFile(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("hrBizReqResultId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getBustripPopList(Map<String, Object> params) {
        return bustripRepository.getBustripPopList(params);
    }
}
