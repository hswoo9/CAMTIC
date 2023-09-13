package egovframework.com.devjitsu.inside.bustrip.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
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


    @Override
    public List<Map<String, Object>> getBustripList(Map<String, Object> params) {
        return bustripRepository.getBustripList(params);
    }

    @Override
    public void setBustripReq(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {

        if(params.containsKey("hrBizReqId")){
            bustripRepository.updBustripReq(params);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
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
        result.put("rs", bustripRepository.getBustripReqInfo(params));
        result.put("list", bustripRepository.getBustripCompanionInfo(params));
        result.put("resList", bustripRepository.getBustripResCompanionInfo(params));
        result.put("map", bustripRepository.getBustripExnpInfo(params));
        result.put("rsRes", bustripRepository.getBustripResultInfo(params));
        result.put("fileInfo", bustripRepository.getBustripReqFileInfo(params));
        return result;
    }

    @Override
    public List<Map<String, Object>> getBustripExnpInfo(Map<String, Object> params) {
        return bustripRepository.getBustripExnpInfo(params);
    }

    @Override
    public Map<String, Object> getBustripOne(Map<String, Object> params) {
        return bustripRepository.getBustripResultInfoR(params);
    }

    @Override
    public void delBustripReq(Map<String, Object> params) {
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
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

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            bustripRepository.updateResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            bustripRepository.updateResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            bustripRepository.updateResFinalApprStat(params);

            Map<String, Object> histMap = bustripRepository.getBustripResultInfoR(params);
            crmRepository.insCrmHist(histMap);
        }
    }

    @Override
    public void saveBustripResult(Map<String, Object> params) {
        if(params.containsKey("hrBizReqResultId")){
            bustripRepository.updBustripResult(params);
        } else {
            bustripRepository.saveBustripResult(params);
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

                bustripRepository.insBustripResCompanion(params);
            }
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
    public void setBustripCostInsert(Map<String, Object> params) {
        bustripRepository.setBustripCostInsert(params);
    }

    @Override
    public void setBustripFuelCostInsert(Map<String, Object> params) {
        bustripRepository.setBustripFuelCostUpdate(params);
        bustripRepository.setBustripFuelCostInsert(params);
    }

    @Override
    public List<Map<String, Object>> getWaypointCostList(Map<String, Object> params) {
        return bustripRepository.getWaypointCostList(params);
    }

    @Override
    public void setWaypointCostInsert(Map<String, Object> params) {
        bustripRepository.setWaypointCostInsert(params);
    }

    @Override
    public void setReqCert(Map<String, Object> params) {
        bustripRepository.setReqCert(params);
    }

    @Override
    public List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params) {
        return bustripRepository.getBustripFuelCostList(params);
    }

    @Override
    public Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params) {
        return bustripRepository.getBustripFuelCostInfo(params);
    }

    @Override
    public List<Map<String, Object>> getPopBustripList(Map<String, Object> params) {
        return bustripRepository.getPopBustripList(params);
    }

    @Override
    public List<Map<String, Object>> getBustripSettleList(Map<String, Object> params) {
        return bustripRepository.getBustripSettleList(params);
    }
}
